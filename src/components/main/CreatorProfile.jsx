import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  X, 
  Heart, 
  Eye, 
  Star, 
  Users, 
  Image as ImageIcon,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import './CreatorProfile.css'

// 샘플 크리에이터 데이터
const creatorsData = {
  'creative_kim': {
    id: 'creative_kim',
    name: 'Creative Kim',
    avatar: 'https://picsum.photos/seed/creative_kim/200/200',
    bio: '사이버펑크와 판타지 스타일 전문 크리에이터입니다. Midjourney, DALL-E 3 활용 경험 3년+',
    followers: 1234,
    totalLikes: 8765,
    totalViews: 45678,
    rating: 4.9,
    promptCount: 42,
    featuredPrompts: [
      { id: 1, title: '사이버펑크 네온 캐릭터', image: 'https://picsum.photos/seed/ck1/300/300', price: 500, likes: 234 },
      { id: 2, title: '미래도시 야경', image: 'https://picsum.photos/seed/ck2/300/300', price: 0, likes: 456 },
      { id: 3, title: '홀로그램 UI 디자인', image: 'https://picsum.photos/seed/ck3/300/300', price: 800, likes: 189 },
      { id: 4, title: '네온 포트레이트', image: 'https://picsum.photos/seed/ck4/300/300', price: 600, likes: 321 },
      { id: 5, title: '사이버 전사', image: 'https://picsum.photos/seed/ck5/300/300', price: 700, likes: 278 },
      { id: 6, title: '가상현실 공간', image: 'https://picsum.photos/seed/ck6/300/300', price: 0, likes: 567 },
    ],
    badges: ['Top Creator', 'Verified']
  },
  'design_master': {
    id: 'design_master',
    name: 'Design Master',
    avatar: 'https://picsum.photos/seed/design_master/200/200',
    bio: '미니멀 디자인과 로고 전문가. 브랜딩 프로젝트 100+ 경험',
    followers: 2345,
    totalLikes: 12345,
    totalViews: 67890,
    rating: 4.8,
    promptCount: 67,
    featuredPrompts: [
      { id: 1, title: '미니멀 로고 디자인', image: 'https://picsum.photos/seed/dm1/300/300', price: 500, likes: 189 },
      { id: 2, title: '모던 브랜드 아이덴티티', image: 'https://picsum.photos/seed/dm2/300/300', price: 800, likes: 345 },
      { id: 3, title: '심플 아이콘 세트', image: 'https://picsum.photos/seed/dm3/300/300', price: 0, likes: 567 },
      { id: 4, title: '타이포그래피 포스터', image: 'https://picsum.photos/seed/dm4/300/300', price: 400, likes: 234 },
    ],
    badges: ['Verified']
  }
}

// 기본 크리에이터 데이터
const defaultCreator = {
  id: 'unknown',
  name: 'Creator',
  avatar: 'https://picsum.photos/seed/default/200/200',
  bio: '크리에이터 소개가 없습니다.',
  followers: 0,
  totalLikes: 0,
  totalViews: 0,
  rating: 0,
  promptCount: 0,
  featuredPrompts: [],
  badges: []
}

function CreatorProfile({ creatorId, onClose }) {
  const creator = creatorsData[creatorId] || { ...defaultCreator, id: creatorId, name: creatorId }
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFollowing, setIsFollowing] = useState(false)
  
  const slidesPerView = 3
  const maxSlide = Math.max(0, creator.featuredPrompts.length - slidesPerView)
  
  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, maxSlide))
  }
  
  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0))
  }

  return (
    <div className="profile-backdrop" onClick={onClose}>
      <div className="profile-modal" onClick={e => e.stopPropagation()}>
        <button className="profile-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={creator.avatar} alt={creator.name} />
            {creator.badges.includes('Verified') && (
              <span className="verified-badge" title="Verified Creator">✓</span>
            )}
          </div>
          
          <div className="profile-info">
            <div className="profile-name-row">
              <h2>{creator.name}</h2>
              {creator.badges.includes('Top Creator') && (
                <span className="top-badge">Top Creator</span>
              )}
            </div>
            <span className="profile-handle">@{creator.id}</span>
            <p className="profile-bio">{creator.bio}</p>
          </div>
          
          <button 
            className={`follow-btn ${isFollowing ? 'following' : ''}`}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? '팔로잉' : '팔로우'}
          </button>
        </div>
        
        {/* Stats */}
        <div className="profile-stats">
          <div className="stat-item">
            <ImageIcon size={18} />
            <div className="stat-content">
              <span className="stat-value">{creator.promptCount}</span>
              <span className="stat-label">프롬프트</span>
            </div>
          </div>
          <div className="stat-item">
            <Users size={18} />
            <div className="stat-content">
              <span className="stat-value">{creator.followers.toLocaleString()}</span>
              <span className="stat-label">팔로워</span>
            </div>
          </div>
          <div className="stat-item">
            <Heart size={18} />
            <div className="stat-content">
              <span className="stat-value">{creator.totalLikes.toLocaleString()}</span>
              <span className="stat-label">좋아요</span>
            </div>
          </div>
          <div className="stat-item">
            <Star size={18} />
            <div className="stat-content">
              <span className="stat-value">{creator.rating}</span>
              <span className="stat-label">평점</span>
            </div>
          </div>
        </div>
        
        {/* Featured Prompts Gallery */}
        {creator.featuredPrompts.length > 0 && (
          <div className="featured-section">
            <div className="featured-header">
              <h3>대표 프롬프트</h3>
              <Link to={`/creator/${creator.id}`} className="view-all">
                전체보기 <ExternalLink size={14} />
              </Link>
            </div>
            
            <div className="gallery-container">
              {currentSlide > 0 && (
                <button className="gallery-nav prev" onClick={prevSlide}>
                  <ChevronLeft size={20} />
                </button>
              )}
              
              <div className="gallery-track" style={{ transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)` }}>
                {creator.featuredPrompts.map(prompt => (
                  <Link 
                    key={prompt.id} 
                    to={`/prompt/${prompt.id}`} 
                    className="gallery-item"
                    onClick={onClose}
                  >
                    <div className="gallery-image">
                      <img src={prompt.image} alt={prompt.title} />
                      <div className="gallery-overlay">
                        <span className="gallery-likes">
                          <Heart size={14} /> {prompt.likes}
                        </span>
                      </div>
                    </div>
                    <div className="gallery-info">
                      <span className="gallery-title">{prompt.title}</span>
                      <span className={`gallery-price ${prompt.price === 0 ? 'free' : ''}`}>
                        {prompt.price === 0 ? 'FREE' : `${prompt.price}C`}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              
              {currentSlide < maxSlide && (
                <button className="gallery-nav next" onClick={nextSlide}>
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="profile-actions">
          <Link to={`/creator/${creator.id}`} className="action-btn primary" onClick={onClose}>
            프로필 전체보기
          </Link>
          <button className="action-btn secondary">
            메시지 보내기
          </button>
        </div>
      </div>
    </div>
  )
}

// 간단한 프로필 카드 (호버 시 표시)
export function CreatorCard({ creatorId, position = 'bottom' }) {
  const creator = creatorsData[creatorId] || { ...defaultCreator, id: creatorId, name: creatorId }
  
  return (
    <div className={`creator-card ${position}`}>
      <div className="card-header">
        <img src={creator.avatar} alt={creator.name} className="card-avatar" />
        <div className="card-info">
          <span className="card-name">{creator.name}</span>
          <span className="card-handle">@{creator.id}</span>
        </div>
      </div>
      <p className="card-bio">{creator.bio}</p>
      <div className="card-stats">
        <span><ImageIcon size={12} /> {creator.promptCount}</span>
        <span><Users size={12} /> {creator.followers.toLocaleString()}</span>
        <span><Star size={12} /> {creator.rating}</span>
      </div>
      {creator.featuredPrompts.length > 0 && (
        <div className="card-preview">
          {creator.featuredPrompts.slice(0, 3).map(prompt => (
            <img key={prompt.id} src={prompt.image} alt="" />
          ))}
        </div>
      )}
    </div>
  )
}

export default CreatorProfile
