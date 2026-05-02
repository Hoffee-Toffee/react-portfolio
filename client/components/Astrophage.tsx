import { useRef, useEffect } from 'react'

// ── Tunable constants ─────────────────────────────────────────────────────────
// Coordinate system: world origin = vanishing point at (W/2, H/3).
//   Focal length F = canvas.width / 2
//   At depth z, world point (ox, oy) → screen (W/2 + ox*F/z, H/3 + oy*F/z)
//   Projected radius = PHYS_RADIUS * F / z
//   "Screen-normalised" distance: 1 unit = canvas half-width at z = 1
// ─────────────────────────────────────────────────────────────────────────────
const POOL = 20000      // total astrophage in cycle
const PHYS_RADIUS = 0.04   // world-space radius
const Z_SPEED = 0.5     // world units / second
const FLASH_ON_MS = 500     // on  duration (ms)
const FLASH_OFF_MS = 2000    // off duration (ms)
const FLASH_PERIOD_MS = FLASH_ON_MS + FLASH_OFF_MS
const FADE_MS = 250          // fade-in and fade-out duration (ms)
const RETIRE_PX = 1    // retire at subpixel (point LOD takes over below POINT_PX)
const POINT_PX = 4       // below this projR → render as a point dot
const MAX_SPAWN_PX = 100      // cap projected radius at spawn
const OD_MAX = 50     // max screen-normalised origin distance from centre
const FRONT_THRESHOLD = 4    // origins closer than this → front layer
const DETAIL_PX = 14             // min projR to draw squiggly outline + spots
const WOBBLE_N = 12             // number of radial wobble samples
const WOBBLE_AMP = 0.09           // max fractional radial perturbation
const BODY_COLOR = 'rgba(255, 200, 200, 0.15)'

const LENS_FLARE_CHANCE = 1   // fraction of cell-LOD particles that lens-flash
const LENS_ON_MS = 350    // duration of each lens flare burst
const LENS_FADE_MS = 80     // fade in/out within the burst
const LENS_PERIOD_MIN = 3000   // min cycle between flares
const LENS_PERIOD_MAX = 9000   // max cycle between flares

// ── Types ─────────────────────────────────────────────────────────────────────
interface Spot { nx: number; ny: number; rw: number; rh: number; rot: number }

interface Particle {
  ox: number         // fixed world-space x origin
  oy: number         // fixed world-space y origin
  dist: number       // screen-normalised origin distance from centre
  z: number          // current depth (increases over time)
  flashPhase: number // ms phase offset within flash period
  axisB: number      // minor-axis ratio relative to projR (major = 1.0)
  tilt: number       // oval rotation (radians)
  layer: 'front' | 'back'
  wobble: number[]   // WOBBLE_N radial perturbations [-1, 1] for squiggly outline
  spots: Spot[]      // 0–3 inner dark organelle spots
  lensFlare: boolean // whether this cell occasionally lens-flashes
  lensPhase: number  // ms phase offset for the lens flare cycle
  lensPeriod: number // full cycle length (ms) for this cell
  lensTails: number[] // rotation of each tail (3–5, each independently angled)
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const rnd = (a: number, b: number) => a + Math.random() * (b - a)

function computeZSpawn(ox: number, oy: number, ar: number, F: number): number {
  // z at which the astrophage's edge just enters the viewport
  const zFromX = Math.max(Math.abs(ox) - PHYS_RADIUS, 0)
  const zFromY = Math.max((Math.abs(oy) - PHYS_RADIUS) * ar, 0)
  const zFromEdge = Math.max(zFromX, zFromY)
  const zFromSize = (PHYS_RADIUS * F) / MAX_SPAWN_PX
  return Math.max(zFromEdge, zFromSize)
}

function spawnParticle(W: number, H: number, spreadZ = false): Particle {
  const ar = W / H
  const F = W / 2
  const angle = rnd(0, Math.PI * 2)
  // Power bias < 1 pushes distribution toward OD_MAX; 0.6 is a gentle nudge outward
  const dist = 0.05 + (OD_MAX - 0.05) * Math.pow(Math.random(), 0.8)
  // Scale oy by 1/ar so equal dist in screen space means equal angular coverage
  const ox = dist * Math.cos(angle)
  const oy = dist * Math.sin(angle) / ar

  const zSpawn = computeZSpawn(ox, oy, ar, F)
  const zRetire = (PHYS_RADIUS * F) / RETIRE_PX
  const z = spreadZ ? rnd(zSpawn, zRetire * 0.85) : zSpawn

  const wobble = Array.from({ length: WOBBLE_N }, () => rnd(-1, 1))
  const spotCount = Math.random() < 0.6 ? Math.floor(rnd(1, 4)) : 0
  const spots: Spot[] = Array.from({ length: spotCount }, () => {
    const sa = rnd(0, Math.PI * 2)
    const sd = rnd(0, 0.6)
    return { nx: sd * Math.cos(sa), ny: sd * Math.sin(sa), rw: rnd(0.15, 0.38), rh: rnd(0.09, 0.24), rot: rnd(0, Math.PI) }
  })

  return {
    ox, oy, dist, z,
    flashPhase: rnd(0, FLASH_PERIOD_MS),
    axisB: rnd(0.72, 0.98),
    tilt: rnd(0, Math.PI),
    layer: dist < FRONT_THRESHOLD ? 'front' : 'back',
    wobble,
    spots,
    lensFlare: Math.random() < LENS_FLARE_CHANCE,
    lensPhase: rnd(0, LENS_PERIOD_MAX),
    lensPeriod: rnd(LENS_PERIOD_MIN, LENS_PERIOD_MAX),
    lensTails: Array.from({ length: Math.floor(rnd(3, 6)) }, () => rnd(0, Math.PI)),
  }
}

// ── Drawing helpers ──────────────────────────────────────────────────────────
function buildWobblyPath(ctx: CanvasRenderingContext2D, projR: number, axisB: number, wobble: number[]) {
  const N = wobble.length
  const pts: [number, number][] = []
  for (let i = 0; i < N; i++) {
    const angle = (i / N) * Math.PI * 2
    const r = 1 + wobble[i] * WOBBLE_AMP
    pts.push([r * projR * Math.cos(angle), r * projR * axisB * Math.sin(angle)])
  }
  const mx = (a: [number, number], b: [number, number]) => (a[0] + b[0]) / 2
  const my = (a: [number, number], b: [number, number]) => (a[1] + b[1]) / 2
  ctx.beginPath()
  ctx.moveTo(mx(pts[N - 1], pts[0]), my(pts[N - 1], pts[0]))
  for (let i = 0; i < N; i++) {
    const next = pts[(i + 1) % N]
    ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx(pts[i], next), my(pts[i], next))
  }
  ctx.closePath()
}

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const c = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2)
  ctx.beginPath()
  ctx.moveTo(x + c, y)
  ctx.arcTo(x + w, y, x + w, y + h, c)
  ctx.arcTo(x + w, y + h, x, y + h, c)
  ctx.arcTo(x, y + h, x, y, c)
  ctx.arcTo(x, y, x + w, y, c)
  ctx.closePath()
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Astrophage({ active }: { active: boolean }) {
  const backRef = useRef<HTMLCanvasElement>(null)
  const frontRef = useRef<HTMLCanvasElement>(null)
  const activeRef = useRef(active)
  const stateRef = useRef<{
    particles: Particle[]
    lastMs: number
    raf: number
  }>({ particles: [], lastMs: 0, raf: 0 })

  // Keep activeRef in sync without re-running the main effect
  useEffect(() => { activeRef.current = active }, [active])

  useEffect(() => {
    const back = backRef.current!
    const front = frontRef.current!
    const ctxB = back.getContext('2d')!
    const ctxF = front.getContext('2d')!
    const state = stateRef.current

    const noiseCanvas = document.createElement('canvas')

    function generateNoise(W: number, H: number) {
      noiseCanvas.width = W
      noiseCanvas.height = H
      const nctx = noiseCanvas.getContext('2d')!
      const img = nctx.createImageData(W, H)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255 | 0
        d[i] = d[i + 1] = d[i + 2] = v
        d[i + 3] = 30
      }
      nctx.putImageData(img, 0, 0)
    }

    function resize() {
      const el = back.parentElement!
      const W = el.clientWidth
      const H = el.clientHeight
      if (!W || !H) return
      back.width = W; back.height = H
      front.width = W; front.height = H
      generateNoise(W, H)
      if (state.particles.length === 0) {
        // Initial fill: spread z so the field is already populated on first show
        state.particles = Array.from({ length: POOL }, () =>
          spawnParticle(W, H, /* spreadZ */ true),
        )
      }
    }

    const ro = new ResizeObserver(resize)
    ro.observe(back.parentElement!)
    resize()

    function frame(now: number) {
      state.raf = requestAnimationFrame(frame)

      const W = back.width
      const H = back.height
      // Guard until canvas and particles are properly initialised
      if (!W || !H || state.particles.length === 0) return

      const dt = Math.min((now - state.lastMs) / 1000, 0.05)
      state.lastMs = now

      ctxB.clearRect(0, 0, W, H)
      ctxF.clearRect(0, 0, W, H)

      const F = W / 2
      const ar = W / H
      const zRetire = (PHYS_RADIUS * F) / RETIRE_PX
      const isActive = activeRef.current

      for (let i = 0; i < state.particles.length; i++) {
        const p = state.particles[i]
        p.z += Z_SPEED * dt

        const projR = (PHYS_RADIUS * F) / p.z
        const tInPeriod = ((now - p.flashPhase) % FLASH_PERIOD_MS + FLASH_PERIOD_MS) % FLASH_PERIOD_MS
        let alpha: number
        if (tInPeriod < FADE_MS) {
          alpha = tInPeriod / FADE_MS
        } else if (tInPeriod < FLASH_ON_MS - FADE_MS) {
          alpha = 1
        } else if (tInPeriod < FLASH_ON_MS) {
          alpha = (FLASH_ON_MS - tInPeriod) / FADE_MS
        } else {
          alpha = 0
        }

        // Retire: fully off and too small, or far past retire depth (backstop)
        if ((alpha === 0 && projR < RETIRE_PX) || p.z > zRetire * 2.5) {
          state.particles[i] = spawnParticle(W, H)
          continue
        }

        if (!isActive || alpha === 0) continue

        const sx = W / 2 + (p.ox * F) / p.z
        const sy = H / 2 + (p.oy * F) / p.z

        // Skip if completely outside canvas (shouldn't normally happen)
        if (sx + projR < 0 || sx - projR > W || sy + projR < 0 || sy - projR > H) continue

        const ctx = p.layer === 'front' ? ctxF : ctxB

        if (projR < POINT_PX) {
          // Near-center particles never use the point LOD — retire and respawn
          if (p.dist < FRONT_THRESHOLD) {
            state.particles[i] = spawnParticle(W, H)
            continue
          }
          // ── Point LOD: tiny dot for very distant astrophage ─────────────────
          ctx.save()
          ctx.globalAlpha = alpha
          ctx.fillStyle = 'rgba(255, 150, 150, 0.5)'
          ctx.beginPath()
          ctx.arc(sx, sy, Math.max(0.5, projR), 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        } else {
          // ── Oval / Cell LOD ─────────────────────────────────────────────────
          // Smooth radial glow using a gradient ellipse
          const glowR = projR * 6
          ctx.save()
          ctx.globalAlpha = alpha
          ctx.translate(sx, sy)
          ctx.rotate(p.tilt)
          ctx.scale(1, p.axisB)
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, glowR)
          grad.addColorStop(0, 'rgba(255, 230, 230, 0.55)')
          grad.addColorStop(0.25, 'rgba(255, 160, 160, 0.25)')
          grad.addColorStop(0.6, 'rgba(220,  60,  40, 0.08)')
          grad.addColorStop(1, 'rgba(200,  40,  20, 0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(0, 0, glowR, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()

          // Body + detail (squiggly outline and inner spots for close cells)
          ctx.save()
          ctx.globalAlpha = alpha
          ctx.translate(sx, sy)
          ctx.rotate(p.tilt)
          if (projR >= DETAIL_PX) {
            buildWobblyPath(ctx, projR, p.axisB, p.wobble)
          } else {
            ctx.beginPath()
            ctx.ellipse(0, 0, projR, projR * p.axisB, 0, 0, Math.PI * 2)
          }
          ctx.fillStyle = BODY_COLOR
          ctx.fill()
          if (projR >= DETAIL_PX && p.spots.length > 0) {
            buildWobblyPath(ctx, projR, p.axisB, p.wobble)
            ctx.save()
            ctx.clip()
            ctx.fillStyle = 'rgba(30, 0, 0, 0.1)'
            for (const s of p.spots) {
              ctx.save()
              ctx.translate(s.nx * projR, s.ny * projR * p.axisB)
              ctx.rotate(s.rot)
              roundRectPath(ctx, -s.rw * projR, -s.rh * projR * p.axisB, s.rw * projR * 2, s.rh * projR * p.axisB * 2, s.rh * projR * p.axisB * 0.5)
              ctx.fill()
              ctx.restore()
            }
            ctx.restore()
          }
          ctx.restore()

          // ── Lens flare (10% of cells, independent slow cycle) ────────────────
          if (p.lensFlare && projR >= DETAIL_PX) {
            const lensT = ((now - p.lensPhase) % p.lensPeriod + p.lensPeriod) % p.lensPeriod
            let lensA = 0
            if (lensT < LENS_FADE_MS) {
              lensA = lensT / LENS_FADE_MS
            } else if (lensT < LENS_ON_MS - LENS_FADE_MS) {
              lensA = 1
            } else if (lensT < LENS_ON_MS) {
              lensA = (LENS_ON_MS - lensT) / LENS_FADE_MS
            }
            if (lensA > 0) {
              ctx.save()
              ctx.globalCompositeOperation = 'lighter'
              ctx.globalAlpha = alpha * lensA * 0.15
              ctx.translate(sx, sy)

              // Central bright bloom
              const bloomR = projR * 4
              const bloom = ctx.createRadialGradient(0, 0, 0, 0, 0, bloomR)
              bloom.addColorStop(0, 'rgba(255, 255, 255, 0.80)')
              bloom.addColorStop(0.12, 'rgba(255, 245, 230, 0.40)')
              bloom.addColorStop(0.45, 'rgba(255, 210, 190, 0.08)')
              bloom.addColorStop(1, 'rgba(255, 190, 170, 0)')
              ctx.fillStyle = bloom
              ctx.beginPath()
              ctx.arc(0, 0, bloomR, 0, Math.PI * 2)
              ctx.fill()

              // Asymmetric tails (3–5, each rotated independently)
              const streakLen = projR * 7
              const streakW = projR * 0.20
              for (const tailAngle of p.lensTails) {
                ctx.save()
                ctx.rotate(tailAngle)
                const sg = ctx.createLinearGradient(-streakLen, 0, streakLen, 0)
                sg.addColorStop(0, 'rgba(255, 255, 255, 0)')
                sg.addColorStop(0.38, 'rgba(255, 245, 220, 0.18)')
                sg.addColorStop(0.5, 'rgba(255, 255, 255, 0.60)')
                sg.addColorStop(0.62, 'rgba(255, 245, 220, 0.18)')
                sg.addColorStop(1, 'rgba(255, 255, 255, 0)')
                ctx.fillStyle = sg
                ctx.fillRect(-streakLen, -streakW, streakLen * 2, streakW * 2)
                ctx.restore()
              }

              ctx.restore()
            }
          }
        }
      }

      // Noise overlay clipped to painted content only
      if (noiseCanvas.width > 0) {
        for (const c of [ctxB, ctxF]) {
          c.save()
          c.globalCompositeOperation = 'source-atop'
          c.globalAlpha = 1
          c.drawImage(noiseCanvas, 0, 0)
          c.restore()
        }
      }
    }

    state.raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(state.raf)
      ro.disconnect()
    }
  }, [])

  return (
    <>
      <canvas ref={backRef} id="astrophage-back" />
      <canvas ref={frontRef} id="astrophage-front" />
    </>
  )
}
