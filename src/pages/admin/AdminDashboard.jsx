import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Users,
  TrendingUp,
  ArrowRight,
  AlertCircle,
  FileText
} from 'lucide-react'
import './AdminDashboard.css'

// 샘플 데이터
const pendingReviews = [
  { 
    id: 1, 
    title: '사이버펑크 네온 캐릭터', 
    creator: 'creative_kim',
    createdAt: '10분 전',
    model: 'Midjourney v6',
    thumbnail: 'https://picsum.photos/seed/cyber1/80/80'
  },
  { 
    id: 2, 
    title: '미니멀 로고 디자인', 
    creator: 'design_master',
    createdAt: '25분 전',
    model: 'DALL-E 3',
    thumbnail: 'https://picsum.photos/seed/logo2/80/80'
  },
  { 
    id: 3, 
    title: '판타지 풍경 일러스트', 
    creator: 'art_lover',
    createdAt: '1시간 전',
    model: 'Stable Diffusion XL',
    thumbnail: 'https://picsum.photos/seed/fantasy3/80/80'
  },
  { 
    id: 4, 
    title: '포토리얼 인물 사진', 
    creator: 'photo_pro',
    createdAt: '2시간 전',
    model: 'Midjourney v6',
    thumbnail: 'https://picsum.photos/seed/photo4/80/80'
  },
]

const recentActivity = [
  { id: 1, type: 'approved', title: '3D 캐릭터 모델링', creator: 'model_expert', time: '5분 전' },
  { id: 2, type: 'rejected', title: '추상 아트 패턴', creator: 'abstract_art', time: '15분 전' },
  { id: 3, type: 'approved', title: '빈티지 포스터', creator: 'retro_design', time: '30분 전' },
  { id: 4, type: 'approved', title: '아이소메트릭 아이콘', creator: 'icon_maker', time: '1시간 전' },
]

function StatCard({ icon: Icon, title, value, change, color }) {
  return (
    <div className={`admin-stat-card ${color}`}>
      <div className="stat-icon-wrapper">
        <Icon size={20} />
      </div>
      <div className="stat-content">
        <span className="stat-value">{value}</span>
        <span className="stat-title">{title}</span>
      </div>
      {change && (
        <div className="stat-change">
          <TrendingUp size={12} />
          <span>{change}</span>
        </div>
      )}
    </div>
  )
}

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      {/* Stats Row */}
      <div className="stats-row">
        <StatCard 
          icon={Clock} 
          title="심사 대기" 
          value="24" 
          color="warning"
        />
        <StatCard 
          icon={CheckCircle} 
          title="오늘 승인" 
          value="18" 
          change="+12%"
          color="success"
        />
        <StatCard 
          icon={XCircle} 
          title="오늘 반려" 
          value="3" 
          color="error"
        />
        <StatCard 
          icon={Users} 
          title="활성 크리에이터" 
          value="156" 
          change="+5%"
          color="info"
        />
      </div>

      {/* Main Content */}
      <div className="dashboard-grid">
        {/* Pending Reviews */}
        <div className="dashboard-card pending-reviews">
          <div className="card-header">
            <div className="header-left">
              <AlertCircle size={18} className="header-icon warning" />
              <h2>심사 대기 목록</h2>
              <span className="count-badge">24</span>
            </div>
            <Link to="/admin/reviews" className="view-all-link">
              전체 보기 <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="pending-list">
            {pendingReviews.map((item) => (
              <Link to="/admin/reviews" key={item.id} className="pending-item">
                <img src={item.thumbnail} alt={item.title} className="item-thumbnail" />
                <div className="item-info">
                  <span className="item-title">{item.title}</span>
                  <span className="item-meta">
                    <span className="creator">@{item.creator}</span>
                    <span className="dot">·</span>
                    <span className="model">{item.model}</span>
                  </span>
                </div>
                <span className="item-time">{item.createdAt}</span>
              </Link>
            ))}
          </div>
          
          <Link to="/admin/reviews" className="card-action-btn">
            심사 시작하기
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card recent-activity">
          <div className="card-header">
            <div className="header-left">
              <FileText size={18} className="header-icon" />
              <h2>최근 활동</h2>
            </div>
          </div>
          
          <div className="activity-list">
            {recentActivity.map((item) => (
              <div key={item.id} className="activity-item">
                <div className={`activity-icon ${item.type}`}>
                  {item.type === 'approved' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                </div>
                <div className="activity-info">
                  <span className="activity-title">{item.title}</span>
                  <span className="activity-creator">@{item.creator}</span>
                </div>
                <span className="activity-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="dashboard-card quick-stats">
          <div className="card-header">
            <h2>이번 주 통계</h2>
          </div>
          
          <div className="stats-list">
            <div className="stat-row">
              <span className="stat-label">총 심사 건수</span>
              <span className="stat-number">142</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">승인률</span>
              <span className="stat-number highlight">87%</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">평균 심사 시간</span>
              <span className="stat-number">4.2분</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">신규 크리에이터</span>
              <span className="stat-number">12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
