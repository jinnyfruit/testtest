import { useState } from 'react'
import { 
  Search, 
  Filter,
  MoreVertical,
  Mail,
  Ban,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Package,
  DollarSign
} from 'lucide-react'
import './AdminCreators.css'

// 샘플 데이터
const creatorsData = [
  {
    id: 1,
    username: 'creative_kim',
    email: 'kim@email.com',
    avatar: 'https://picsum.photos/seed/creator1/80/80',
    joinDate: '2024-01-01',
    status: 'active',
    stats: {
      totalPrompts: 42,
      approvedPrompts: 38,
      pendingPrompts: 3,
      rejectedPrompts: 1,
      totalSales: 156,
      totalRevenue: 2340000,
      approvalRate: 92
    }
  },
  {
    id: 2,
    username: 'design_master',
    email: 'design@email.com',
    avatar: 'https://picsum.photos/seed/creator2/80/80',
    joinDate: '2024-01-05',
    status: 'active',
    stats: {
      totalPrompts: 28,
      approvedPrompts: 25,
      pendingPrompts: 2,
      rejectedPrompts: 1,
      totalSales: 89,
      totalRevenue: 1120000,
      approvalRate: 89
    }
  },
  {
    id: 3,
    username: 'art_lover',
    email: 'art@email.com',
    avatar: 'https://picsum.photos/seed/creator3/80/80',
    joinDate: '2024-01-10',
    status: 'active',
    stats: {
      totalPrompts: 15,
      approvedPrompts: 14,
      pendingPrompts: 1,
      rejectedPrompts: 0,
      totalSales: 67,
      totalRevenue: 890000,
      approvalRate: 93
    }
  },
  {
    id: 4,
    username: 'photo_pro',
    email: 'photo@email.com',
    avatar: 'https://picsum.photos/seed/creator4/80/80',
    joinDate: '2024-01-12',
    status: 'inactive',
    stats: {
      totalPrompts: 8,
      approvedPrompts: 6,
      pendingPrompts: 0,
      rejectedPrompts: 2,
      totalSales: 23,
      totalRevenue: 280000,
      approvalRate: 75
    }
  },
  {
    id: 5,
    username: 'abstract_art',
    email: 'abstract@email.com',
    avatar: 'https://picsum.photos/seed/creator5/80/80',
    joinDate: '2024-01-15',
    status: 'suspended',
    stats: {
      totalPrompts: 5,
      approvedPrompts: 2,
      pendingPrompts: 0,
      rejectedPrompts: 3,
      totalSales: 5,
      totalRevenue: 45000,
      approvalRate: 40
    }
  },
]

function AdminCreators() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedCreator, setSelectedCreator] = useState(null)
  const [showActionMenu, setShowActionMenu] = useState(null)

  const filteredCreators = creatorsData.filter(creator => {
    const matchesSearch = creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || creator.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="admin-creators">
      {/* Toolbar */}
      <div className="creators-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="크리에이터 검색..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="status-filters">
            <button 
              className={`status-filter ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              전체
            </button>
            <button 
              className={`status-filter ${statusFilter === 'active' ? 'active' : ''}`}
              onClick={() => setStatusFilter('active')}
            >
              활성
            </button>
            <button 
              className={`status-filter ${statusFilter === 'inactive' ? 'active' : ''}`}
              onClick={() => setStatusFilter('inactive')}
            >
              비활성
            </button>
            <button 
              className={`status-filter ${statusFilter === 'suspended' ? 'active' : ''}`}
              onClick={() => setStatusFilter('suspended')}
            >
              정지
            </button>
          </div>
        </div>
        <div className="toolbar-right">
          <span className="creator-count">총 <strong>{filteredCreators.length}</strong>명</span>
        </div>
      </div>

      {/* Creators Table */}
      <div className="creators-table-wrapper">
        <table className="creators-table">
          <thead>
            <tr>
              <th>크리에이터</th>
              <th>상태</th>
              <th>프롬프트</th>
              <th>승인률</th>
              <th>판매</th>
              <th>총 수익</th>
              <th>가입일</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredCreators.map((creator) => (
              <tr key={creator.id} className={selectedCreator?.id === creator.id ? 'selected' : ''}>
                <td>
                  <div className="creator-cell">
                    <img src={creator.avatar} alt={creator.username} className="creator-avatar" />
                    <div className="creator-info">
                      <span className="creator-name">@{creator.username}</span>
                      <span className="creator-email">{creator.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${creator.status}`}>
                    {creator.status === 'active' && '활성'}
                    {creator.status === 'inactive' && '비활성'}
                    {creator.status === 'suspended' && '정지'}
                  </span>
                </td>
                <td>
                  <div className="prompts-cell">
                    <span className="prompt-count">{creator.stats.totalPrompts}</span>
                    <div className="prompt-breakdown">
                      <span className="approved" title="승인">
                        <CheckCircle size={10} />
                        {creator.stats.approvedPrompts}
                      </span>
                      <span className="pending" title="대기">
                        <Clock size={10} />
                        {creator.stats.pendingPrompts}
                      </span>
                      <span className="rejected" title="반려">
                        <XCircle size={10} />
                        {creator.stats.rejectedPrompts}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="approval-cell">
                    <span className={`approval-rate ${creator.stats.approvalRate >= 80 ? 'high' : creator.stats.approvalRate >= 50 ? 'medium' : 'low'}`}>
                      {creator.stats.approvalRate}%
                    </span>
                    <div className="approval-bar">
                      <div className="approval-fill" style={{ width: `${creator.stats.approvalRate}%` }}></div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="sales-count">{creator.stats.totalSales}</span>
                </td>
                <td>
                  <span className="revenue">₩{creator.stats.totalRevenue.toLocaleString()}</span>
                </td>
                <td>
                  <span className="join-date">{creator.joinDate}</span>
                </td>
                <td>
                  <div className="action-cell">
                    <button 
                      className="action-trigger"
                      onClick={() => setShowActionMenu(showActionMenu === creator.id ? null : creator.id)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {showActionMenu === creator.id && (
                      <div className="action-menu">
                        <button className="menu-item" onClick={() => setSelectedCreator(creator)}>
                          <Eye size={14} />
                          상세 보기
                        </button>
                        <button className="menu-item">
                          <Mail size={14} />
                          메시지 보내기
                        </button>
                        <button className="menu-item danger">
                          <Ban size={14} />
                          계정 정지
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Creator Detail Modal */}
      {selectedCreator && (
        <div className="creator-modal-overlay" onClick={() => setSelectedCreator(null)}>
          <div className="creator-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-creator-info">
                <img src={selectedCreator.avatar} alt={selectedCreator.username} />
                <div>
                  <h2>@{selectedCreator.username}</h2>
                  <span>{selectedCreator.email}</span>
                </div>
              </div>
              <span className={`status-badge ${selectedCreator.status}`}>
                {selectedCreator.status === 'active' && '활성'}
                {selectedCreator.status === 'inactive' && '비활성'}
                {selectedCreator.status === 'suspended' && '정지'}
              </span>
            </div>

            <div className="modal-stats">
              <div className="stat-card">
                <Package size={20} />
                <div className="stat-info">
                  <span className="stat-value">{selectedCreator.stats.totalPrompts}</span>
                  <span className="stat-label">총 프롬프트</span>
                </div>
              </div>
              <div className="stat-card">
                <TrendingUp size={20} />
                <div className="stat-info">
                  <span className="stat-value">{selectedCreator.stats.approvalRate}%</span>
                  <span className="stat-label">승인률</span>
                </div>
              </div>
              <div className="stat-card">
                <DollarSign size={20} />
                <div className="stat-info">
                  <span className="stat-value">₩{(selectedCreator.stats.totalRevenue / 10000).toFixed(0)}만</span>
                  <span className="stat-label">총 수익</span>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <h3>프롬프트 현황</h3>
              <div className="prompt-stats">
                <div className="prompt-stat approved">
                  <CheckCircle size={16} />
                  <span className="label">승인</span>
                  <span className="value">{selectedCreator.stats.approvedPrompts}</span>
                </div>
                <div className="prompt-stat pending">
                  <Clock size={16} />
                  <span className="label">대기</span>
                  <span className="value">{selectedCreator.stats.pendingPrompts}</span>
                </div>
                <div className="prompt-stat rejected">
                  <XCircle size={16} />
                  <span className="label">반려</span>
                  <span className="value">{selectedCreator.stats.rejectedPrompts}</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="modal-btn secondary" onClick={() => setSelectedCreator(null)}>
                닫기
              </button>
              <button className="modal-btn primary">
                프롬프트 목록 보기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCreators
