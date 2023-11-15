import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header>
        <h1>HEADER STUFF HERE</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Copyright &copy; 2023</footer>
    </>
  )
}
