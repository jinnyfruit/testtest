import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Bell, Search, ChevronRight, Home, X } from 'lucide-react'
import './Header.css'

const pageTitles = {
  '/creator/performance': '나의 성과',
  '/creator/upload': '컨텐츠 업로드',
  '/creator/management': '컨텐츠 관리',
  '/creator/review': '컨텐츠 심사 이력',
  '/creator/revenue': '수익 및 출금 내역',
  '/creator/inquiry': '문의',
}

// 샘플 알림 데이터
const notifications = [
  { id: 1, type: 'sale', message: '새로운 판매가 발생했습니다! "사이버펑크 네온 캐릭터"', time: '5분 전', read: false },
  { id: 2, type: 'review', message: '컨텐츠 심사가 완료되었습니다. 승인됨', time: '1시간 전', read: false },
  { id: 3, type: 'system', message: '새로운 기능이 추가되었습니다. 확인해보세요!', time: '3시간 전', read: true },
]

function Header() {
  const location = useLocation()
  const currentTitle = pageTitles[location.pathname] || '대시보드'
  const [showNotifications, setShowNotifications] = useState(false)
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="header">
      <div className="header-left">
        <nav className="breadcrumb">
          <span className="breadcrumb-item">크리에이터</span>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-item active">{currentTitle}</span>
        </nav>
        <h1 className="header-title">{currentTitle}</h1>
      </div>

      <div className="header-right">
        <div className="header-search">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="검색..." 
            className="search-input"
          />
        </div>

        {/* 홈으로 돌아가기 버튼 */}
        <Link to="/" className="back-home-btn">
          <Home size={18} />
          <span>홈으로</span>
        </Link>

        {/* 알림 버튼 */}
        <div className="notification-wrapper">
          <button 
            className="header-notification"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {/* 알림 드롭다운 */}
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>알림</h3>
                <button 
                  className="notification-close"
                  onClick={() => setShowNotifications(false)}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="notification-list">
                {notifications.length === 0 ? (
                  <div className="notification-empty">
                    알림이 없습니다
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${notification.read ? 'read' : ''}`}
                    >
                      <div className={`notification-dot ${notification.type}`} />
                      <div className="notification-content">
                        <p className="notification-message">{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="notification-footer">
                <button className="mark-all-read">모두 읽음으로 표시</button>
              </div>
            </div>
          )}
        </div>

        <div className="header-user">
          <div className="user-avatar">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=creator" 
              alt="Profile" 
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
