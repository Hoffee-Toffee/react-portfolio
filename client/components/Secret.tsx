import { useEffect } from 'react'
import '../styles/secret.scss'
import { guessSecret } from '../apis/secrets.ts'

export default function SecretPage() {
  useEffect(() => {
    document.title = 'Tristan Bulmer | ???'
    document.body.parentElement.id = 'secretPage'
  }, [])

  window.onload = () => {
    const input = document.getElementsByTagName('input')[0]

    input.addEventListener('keydown', async (e) => {
      console.log(e)
      const char = e.key.toUpperCase()
      if (!new RegExp(/^[A-Z0-9 ]+$/).test(char)) {
        e.preventDefault()
        const current = document.getElementsByClassName('caret')[0]
        current.classList.add('shake')

        const test = setTimeout(() => {
          current.classList.remove('shake')
        }, 1000)
      }
      if (input.value.length == input.selectionStart && e.key == 'ArrowRight') {
        input.value += ' '
      }
    })

    input.addEventListener('keyup', async (e) => {
      if (e.key.startsWith('Arrow')) inputFunc(e)
    })

    input.addEventListener('input', (e) => inputFunc(e))
    input.addEventListener('paste', (e) => e.preventDefault())
    input.addEventListener('cut', (e) => e.preventDefault())
    input.addEventListener('mousemove', (e) => e.preventDefault())
    input.addEventListener('select', (e) => e.preventDefault())
    inputFunc()

    const spans =
      document.getElementsByTagName('header')[0].children[0].children
    Array.from(spans).forEach((span, i) => {
      span.addEventListener('click', (e) => {
        console.log('Running')
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
      span.classList = input.selectionStart == i - 1 ? 'caret' : ''
    })

    if (input.value.length == 7) {
      input.readOnly = true

      const result = await check(input.value.toUpperCase())

      input.parentElement.parentElement.classList.add(
        result ? 'green' : 'shake',
      )
      const test = setTimeout(() => {
        if (result) {
          window.location.href = result
        }

        input.parentElement.parentElement.classList.remove(
          result ? 'green' : 'shake',
        )
        input.value = null
        input.readOnly = false

        inputFunc()
      }, 1000)
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
          <input type="text" autoFocus maxLength="7" />
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
