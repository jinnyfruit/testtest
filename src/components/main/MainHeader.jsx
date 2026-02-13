import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Bell, User, Menu, X, ChevronDown, Sparkles, CheckCircle, MessageCircle, ShoppingBag } from 'lucide-react'
import './MainHeader.css'

// 케이크 아이콘 컴포넌트
const CakeIcon = ({ size = 16 }) => (
  <img 
    src="/cake-icon.png" 
    alt="케이크" 
    style={{ width: size, height: size, objectFit: 'contain' }}
  />
)

const navItems = [
  { path: '/', label: '메인 홈', exact: true },
  { path: '/free', label: '무료' },
  { path: '/paid', label: '유료' },
  { path: '/request', label: '프롬프트 요청' },
  { path: '/community', label: '커뮤니티' },
  { path: '/run', label: '실행' },
]

// 샘플 알림 데이터
const notificationsData = [
  { id: 1, type: 'purchase', message: '프롬프트 "사이버펑크 네온 캐릭터"가 판매되었습니다.', time: '10분 전', read: false },
  { id: 2, type: 'comment', message: '내 게시글에 새 댓글이 달렸습니다.', time: '1시간 전', read: false },
  { id: 3, type: 'system', message: '프롬프트 심사가 완료되었습니다.', time: '3시간 전', read: true },
]

function MainHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const navigate = useNavigate()
  
  // 임시 로그인 상태 (실제로는 auth context 사용)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const userCredits = 500
  
  const unreadCount = notificationsData.filter(n => !n.read).length

  return (
    <header className="main-header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <span className="logo-text">PROMMI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          {navItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Section */}
        <div className="header-right">
          {isLoggedIn ? (
            <>
              {/* Notifications */}
              <div className="notification-wrapper">
                <button 
                  className="header-icon-btn"
                  onClick={() => setNotificationOpen(!notificationOpen)}
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </button>
                
                {notificationOpen && (
                  <div className="notification-dropdown">
                    <div className="notification-header">
                      <h3>알림</h3>
                      <button className="mark-all-read">모두 읽음</button>
                    </div>
                    <div className="notification-list">
                      {notificationsData.length > 0 ? (
                        notificationsData.map(notif => (
                          <div 
                            key={notif.id} 
                            className={`notification-item ${!notif.read ? 'unread' : ''}`}
                          >
                            <div className="notif-icon">
                              {notif.type === 'purchase' && <ShoppingBag size={16} />}
                              {notif.type === 'comment' && <MessageCircle size={16} />}
                              {notif.type === 'system' && <CheckCircle size={16} />}
                            </div>
                            <div className="notif-content">
                              <p className="notif-message">{notif.message}</p>
                              <span className="notif-time">{notif.time}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="notification-empty">
                          <Bell size={24} />
                          <p>새로운 알림이 없습니다</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Credits (케이크) */}
              <Link to="/credits" className="credits-btn">
                <CakeIcon size={18} />
                <span>{userCredits}</span>
              </Link>

              {/* Creator Button */}
              <Link to="/creator" className="creator-btn">
                크리에이터
              </Link>

              {/* User Menu */}
              <div className="user-menu-wrapper">
                <button 
                  className="user-avatar-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <img 
                    src="https://picsum.photos/seed/user/40/40" 
                    alt="프로필" 
                    className="user-avatar"
                  />
                </button>
                
                {userMenuOpen && (
                  <div className="user-dropdown">
                    <Link to="/profile/me" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <User size={16} />
                      마이페이지
                    </Link>
                    <Link to="/credits" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <CakeIcon size={16} />
                      케이크 충전
                    </Link>
                    <hr className="dropdown-divider" />
                    <button className="dropdown-item" onClick={() => setIsLoggedIn(false)}>
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={() => setIsLoggedIn(true)}>
                로그인
              </button>
              <button className="signup-btn">
                회원가입
              </button>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <NavLink 
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default MainHeader
