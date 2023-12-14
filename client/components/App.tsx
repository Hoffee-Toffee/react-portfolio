import { useSneezes } from '../hooks/useSneezes.ts'

function App() {
  const { data } = useSneezes()

  return (
    <>
      <div className="app">
        <h1>Fullstack Boilerplate - with Fruits!</h1>
        <ul>
          {data &&
            Object.entries(data.calendar).map(([key, value]) => {
              return (
                <li key={key}>
                  {key}:{' '}
                  {value.confirmed ? (
                    <b>{value.count}</b>
                  ) : (
                    <i>{value.count}</i>
                  )}
                </li>
              )
            })}
        </ul>
      </div>
    </>
  )
}

export default App
