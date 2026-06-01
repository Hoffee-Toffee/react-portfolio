import { useEffect, useRef } from 'react'

// ── Grid dimensions ──────────────────────────────────────────────────────────
const COLS = 100
const ROWS = 50
const CELL_SIZE = 9
const CELL_GAP = 0

type Grid = boolean[][]

function emptyGrid(): Grid {
  return Array.from({ length: ROWS }, () => new Array<boolean>(COLS).fill(false))
}

// ── 5×5 pixel font ───────────────────────────────────────────────────────────
const GLYPHS: Record<string, number[][]> = {
  '4': [
    [1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
  ],
  '0': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  'N': [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  'O': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  'T': [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  'F': [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  'U': [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  'D': [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
}

// ── Seed ─────────────────────────────────────────────────────────────────────
// Change SEED_LINES (or GLYPHS) here to experiment with different patterns.
const SEED_LINES: string[][] = [
  ['4', '0', '4'],
  ['N', 'O', 'T'],
  ['F', 'O', 'U', 'N', 'D'],
]
const GLYPH_W = 5
const GLYPH_H = 5
const CHAR_GAP = 1
const LINE_GAP = 2
const TITLE_GAP = 1 // extra gap after the first (404) line

function makeSeedGrid(): Grid {
  const grid = emptyGrid()
  const maxLineW = Math.max(...SEED_LINES.map(l => l.length * GLYPH_W + (l.length - 1) * CHAR_GAP))
  const totalH = SEED_LINES.length * GLYPH_H + (SEED_LINES.length - 1) * LINE_GAP + TITLE_GAP
  const r0 = Math.floor((ROWS - totalH) / 2)
  SEED_LINES.forEach((line, li) => {
    const lineW = line.length * GLYPH_W + (line.length - 1) * CHAR_GAP
    const c0 = Math.floor((COLS - maxLineW) / 2) + Math.floor((maxLineW - lineW) / 2)
    const rLine = r0 + li * (GLYPH_H + LINE_GAP) + (li >= 1 ? TITLE_GAP : 0)
    line.forEach((ch, ci) => {
      const glyph = GLYPHS[ch]
      if (!glyph) return
      glyph.forEach((row, ri) => {
        row.forEach((val, cj) => {
          if (val) grid[rLine + ri][c0 + ci * (GLYPH_W + CHAR_GAP) + cj] = true
        })
      })
    })
  })
  return grid
}

// ── Conway's Game of Life ────────────────────────────────────────────────────
function nextGen(grid: Grid): Grid {
  const next = emptyGrid()
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let n = 0
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue
          const nr = r + dr, nc = c + dc
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc]) n++
        }
      }
      next[r][c] = grid[r][c] ? n === 2 || n === 3 : n === 3
    }
  }
  return next
}

function gridsEqual(a: Grid, b: Grid): boolean {
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (a[r][c] !== b[r][c]) return false
  return true
}

function allDead(grid: Grid): boolean {
  return grid.every(row => row.every(cell => !cell))
}

// ── Canvas renderer ──────────────────────────────────────────────────────────
function paint(canvas: HTMLCanvasElement | null, grid: Grid): void {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'white'
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c]) {
        ctx.fillRect(
          c * (CELL_SIZE + CELL_GAP),
          r * (CELL_SIZE + CELL_GAP),
          CELL_SIZE,
          CELL_SIZE,
        )
      }
    }
  }
}

// ── Component ────────────────────────────────────────────────────────────────
export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Canonical history of unique states (never mutated in place; only push)
  const historyRef = useRef<Grid[]>([makeSeedGrid()])
  // Current display position within history
  const idxRef = useRef(0)
  // Oscillation phase (0 = last state, 1 = second-to-last) — only used when looped
  const phaseRef = useRef(0)
  // Flags
  const loopedRef = useRef(false)  // 2-cycle detected
  const stoppedRef = useRef(false)  // all-dead or 1-cycle (stable)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopTimer = (): void => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // Draw initial seed once the canvas is mounted
  useEffect(() => {
    paint(canvasRef.current, historyRef.current[0])
    return stopTimer
  }, [])

  // ── Hover → play forward at 250 ms ─────────────────────────────────────
  const handleMouseEnter = (): void => {
    stopTimer()
    timerRef.current = setInterval(() => {
      const h = historyRef.current
      const idx = idxRef.current

      // Replay existing history before computing anything new
      if (idx < h.length - 1) {
        idxRef.current = idx + 1
        phaseRef.current = 0
        paint(canvasRef.current, h[idx + 1])
        return
      }

      // All cells died or stable — nothing left to show
      if (stoppedRef.current) return

      // 2-cycle loop — oscillate between last two recorded states in-place
      if (loopedRef.current) {
        phaseRef.current ^= 1
        paint(canvasRef.current, h[h.length - 1 - phaseRef.current])
        return
      }

      // Compute next generation
      const next = nextGen(h[idx])

      // Termination: extinction
      if (allDead(next)) {
        stoppedRef.current = true
        return
      }

      // Termination: 1-cycle (stable pattern)
      if (gridsEqual(next, h[idx])) {
        stoppedRef.current = true
        return
      }

      // Termination: 2-cycle (period-2 oscillator)
      // Don't record the looping state — history stops here
      if (idx >= 1 && gridsEqual(next, h[idx - 1])) {
        loopedRef.current = true
        phaseRef.current = 0
        return
      }

      // Normal step — record and advance
      h.push(next)
      idxRef.current = idx + 1
      paint(canvasRef.current, next)
    }, 50)
  }

  // ── Hover end → reverse to seed at 100 ms ──────────────────────────────
  const handleMouseLeave = (): void => {
    stopTimer()
    phaseRef.current = 0
    timerRef.current = setInterval(() => {
      const idx = idxRef.current
      if (idx <= 0) {
        stopTimer()
        idxRef.current = 0
        paint(canvasRef.current, historyRef.current[0])
        return
      }
      idxRef.current = idx - 1
      paint(canvasRef.current, historyRef.current[idx - 1])
    }, 10)
  }

  const canvasW = COLS * (CELL_SIZE + CELL_GAP) - CELL_GAP
  const canvasH = ROWS * (CELL_SIZE + CELL_GAP) - CELL_GAP

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasW}
        height={canvasH}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'block', cursor: 'default' }}
      />
    </div>
  )
}
