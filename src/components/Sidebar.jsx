import { NavLink, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Upload, 
  FolderOpen, 
  ClipboardCheck, 
  Wallet, 
  MessageCircle,
  Sparkles
} from 'lucide-react'
import './Sidebar.css'

const menuItems = [
  { path: '/creator/performance', label: '나의 성과', icon: BarChart3 },
  { path: '/creator/upload', label: '컨텐츠 업로드', icon: Upload },
  { path: '/creator/management', label: '컨텐츠 관리', icon: FolderOpen },
  { path: '/creator/review', label: '컨텐츠 심사 이력', icon: ClipboardCheck },
  { path: '/creator/revenue', label: '수익 및 출금 내역', icon: Wallet },
  { path: '/creator/inquiry', label: '문의', icon: MessageCircle },
]

function Sidebar() {
  const location = useLocation()

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Sparkles size={24} />
        </div>
        <span className="logo-text">PROMMI</span>
        <span className="logo-badge">Creator</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <motion.li 
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NavLink 
                  to={item.path} 
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-icon">
                    <Icon size={20} />
                  </span>
                  <span className="nav-label">{item.label}</span>
                  {isActive && (
                    <motion.div 
                      className="nav-indicator"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </NavLink>
              </motion.li>
            )
          })}
        </ul>
      </nav>

      {/* Footer - Credits */}
      <div className="sidebar-footer">
        <div className="sidebar-credits">
          <span className="credits-label">보유 케이크</span>
          <span className="credits-value">🍰 500</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
