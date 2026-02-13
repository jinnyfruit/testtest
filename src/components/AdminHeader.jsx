import { useLocation } from 'react-router-dom'
import { Search, Bell, ChevronDown } from 'lucide-react'
import './AdminHeader.css'

const pageTitles = {
  '/admin/dashboard': '대시보드',
  '/admin/reviews': '심사 관리',
  '/admin/creators': '크리에이터 관리',
}

function AdminHeader() {
  const location = useLocation()
  const title = pageTitles[location.pathname] || '관리자'

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <h1 className="admin-header-title">{title}</h1>
      </div>
      
      <div className="admin-header-right">
        <div className="admin-search">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="검색..." />
        </div>
        
        <button className="admin-notification">
          <Bell size={18} />
          <span className="notification-dot"></span>
        </button>
        
        <div className="admin-user">
          <div className="admin-avatar">
            <span>A</span>
          </div>
          <div className="admin-user-info">
            <span className="admin-name">관리자</span>
            <span className="admin-role">Super Admin</span>
          </div>
          <ChevronDown size={16} className="dropdown-icon" />
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
