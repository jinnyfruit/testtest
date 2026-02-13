import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  Users,
  Settings,
  Shield,
  LogOut
} from 'lucide-react'
import './AdminSidebar.css'

const navItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: '대시보드' },
  { path: '/admin/reviews', icon: ClipboardCheck, label: '심사 관리' },
  { path: '/admin/creators', icon: Users, label: '크리에이터 관리' },
]

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <div className="admin-logo-icon">
          <Shield size={20} />
        </div>
        <div className="admin-logo-text">
          <span className="logo-main">PROMMI</span>
          <span className="logo-sub">Admin</span>
        </div>
      </div>

      <nav className="admin-sidebar-nav">
        <ul className="admin-nav-list">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
              >
                <item.icon size={18} className="nav-icon" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="admin-sidebar-footer">
        <NavLink to="/" className="admin-nav-link creator-link">
          <LogOut size={18} className="nav-icon" />
          <span>크리에이터 대시보드</span>
        </NavLink>
      </div>
    </aside>
  )
}

export default AdminSidebar
