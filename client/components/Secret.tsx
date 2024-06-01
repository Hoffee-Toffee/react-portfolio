import { useEffect } from 'react'
import '../styles/secret.scss'
import { guessSecret } from '../apis/secrets.ts'

export default function SecretPage() {
  useEffect(() => {
    document.title = 'Tristan Bulmer | ???'
    if (document?.body?.parentElement)
      document.body.parentElement.id = 'secretPage'
    setup()
  }, [])

  function setup() {
    const input = document.getElementsByTagName('input')[0]

    input.addEventListener('keydown', async (e) => {
      const char = e.key.toUpperCase()
      if (!new RegExp(/^[A-Z0-9 ]+$/).test(char)) {
        e.preventDefault()
        const current = document.getElementsByClassName('caret')[0]
        current.classList.add('shake')

        setTimeout(() => {
          current.classList.remove('shake')
        }, 1000)
      }
      if (input.value.length == input.selectionStart && e.key == 'ArrowRight') {
        input.value += ' '
      }
    })

    input.addEventListener('keyup', async (e) => {
      if (e.key.startsWith('Arrow')) inputFunc()
    })

    input.addEventListener('input', () => inputFunc())
    input.addEventListener('paste', (e) => e.preventDefault())
    input.addEventListener('cut', (e) => e.preventDefault())
    input.addEventListener('mousemove', (e) => e.preventDefault())
    input.addEventListener('select', (e) => e.preventDefault())
    inputFunc()

    const spans =
      document.getElementsByTagName('header')[0].children[0].children
    Array.from(spans).forEach((span, i) => {
      span.addEventListener('click', () => {
        input.focus()
        input.selectionStart = i - 1
        input.selectionEnd = i - 1
        inputFunc()
      })
    })
  }

  async function inputFunc() {
    const input = document.getElementsByTagName('input')[0]
    const spans =
      document.getElementsByTagName('header')[0].children[0].children

    Array.from(spans).forEach((span, i) => {
      span.innerHTML = input.value[i - 1] || ''
      if (span.classList.contains('caret')) span.classList.remove('caret')

      if (input.selectionStart == i - 1) {
        span.classList.add('caret')
      }
    })

    if (input.value.length == 7) {
      input.readOnly = true

      const result = await check(input.value.toUpperCase())

      input?.parentElement?.parentElement?.classList.add(
        result ? 'green' : 'shake',
      )
      setTimeout(() => {
        if (result) {
          // If a redirect, then follow it
          if (result.location) window.location.href = result.location
          // If a snippet of css, then apply it
          if (result.styles) {
            const style = document.createElement('style')
            style.innerHTML = result.styles
            document.head.appendChild(style)
          }
        }

        input?.parentElement?.parentElement?.classList.remove(
          result ? 'green' : 'shake',
        )
      }, 1000)

      // Remove a letter every 0.25 seconds, then set readOnly to false
      // input.value = ''
      // input.readOnly = false

      input.value.split('').forEach((_, i) => {
        setTimeout(
          () => {
            input.value = input.value.slice(0, i)
            inputFunc()
            if (!i) {
              input.readOnly = false
            }
          },
          (7 - i) * ((result ? 10 : 5) * (8 - i)) + 750 + (result ? 1000 : 0),
        )
      })
    }
  }

  async function check(text = String()) {
    if (text.startsWith(' ') || text.endsWith(' ') || text.includes('  '))
      return null

    return guessSecret(text)
  }

  return (
    <>
      <header>
        <div>
          <input type="text" maxLength={7} />
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
    </>
  )
}
