import { Outlet } from 'react-router-dom'
import MainHeader from './MainHeader'
import './MainLayout.css'

function MainLayout() {
  return (
    <div className="main-layout">
      <MainHeader />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
