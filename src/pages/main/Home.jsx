import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Eye, Play, Sparkles, TrendingUp, Star, ArrowRight, Zap, ChevronLeft, ChevronRight, MessageCircle, Users } from 'lucide-react'
import './Home.css'

// 샘플 프롬프트 데이터
const featuredPrompts = [
  { id: 1, title: '사이버펑크 네온 캐릭터', creator: 'creative_kim', price: 0, likes: 234, views: 1520, model: 'Midjourney', category: '캐릭터', image: 'https://picsum.photos/seed/cyber1/400/400' },
  { id: 2, title: '미니멀 로고 디자인', creator: 'design_master', price: 500, likes: 189, views: 980, model: 'DALL-E 3', category: '로고', image: 'https://picsum.photos/seed/logo2/400/400' },
  { id: 3, title: '판타지 풍경 일러스트', creator: 'art_lover', price: 800, likes: 456, views: 2340, model: 'Stable Diffusion', category: '풍경', image: 'https://picsum.photos/seed/fantasy3/400/400' },
  { id: 4, title: '포토리얼 인물 사진', creator: 'photo_pro', price: 1200, likes: 321, views: 1890, model: 'Midjourney', category: '인물', image: 'https://picsum.photos/seed/portrait4/400/400' },
  { id: 5, title: '아이소메트릭 아이콘', creator: 'icon_maker', price: 0, likes: 567, views: 3210, model: 'DALL-E 3', category: '아이콘', image: 'https://picsum.photos/seed/icon5/400/400' },
  { id: 6, title: '빈티지 포스터 스타일', creator: 'retro_design', price: 600, likes: 234, views: 1450, model: 'Stable Diffusion', category: '포스터', image: 'https://picsum.photos/seed/vintage6/400/400' },
  { id: 7, title: '3D 캐릭터 모델링', creator: 'model_expert', price: 1500, likes: 412, views: 2100, model: 'Midjourney', category: '3D', image: 'https://picsum.photos/seed/3d7/400/400' },
  { id: 8, title: '애니메이션 배경', creator: 'anime_art', price: 0, likes: 678, views: 4500, model: 'Stable Diffusion', category: '배경', image: 'https://picsum.photos/seed/anime8/400/400' },
]

// 캐러셀용 이미지 데이터
const carouselImages = [
  { id: 1, image: 'https://picsum.photos/seed/hero1/600/800', title: '사이버펑크 네온', creator: 'creative_kim' },
  { id: 2, image: 'https://picsum.photos/seed/hero2/600/800', title: '판타지 풍경', creator: 'art_lover' },
  { id: 3, image: 'https://picsum.photos/seed/hero3/600/800', title: '미니멀 로고', creator: 'design_master' },
  { id: 4, image: 'https://picsum.photos/seed/hero4/600/800', title: '포토리얼 인물', creator: 'photo_pro' },
  { id: 5, image: 'https://picsum.photos/seed/hero5/600/800', title: '3D 캐릭터', creator: 'model_expert' },
]

const categories = ['전체', '캐릭터', '풍경', '로고', '인물', '아이콘', '포스터', '3D', '배경', '패턴']

function PromptCard({ prompt, index }) {
  const [isLiked, setIsLiked] = useState(false)
  const isFree = prompt.price === 0

  return (
    <Link 
      to={`/prompt/${prompt.id}`} 
      className="prompt-card"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="card-image">
        <img src={prompt.image} alt={prompt.title} loading="lazy" />
        <div className="card-overlay">
          <button className="overlay-btn play" aria-label="실행">
            <Play size={18} />
          </button>
          <button 
            className={`overlay-btn like ${isLiked ? 'liked' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
            }}
            aria-label="좋아요"
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>
        {isFree ? (
          <span className="price-badge free">FREE</span>
        ) : (
          <span className="price-badge paid">{prompt.price.toLocaleString()}C</span>
        )}
        <span className="model-badge">{prompt.model}</span>
      </div>
      <div className="card-content">
        <h3 className="card-title">{prompt.title}</h3>
        <div className="card-creator">
          <img 
            src={`https://picsum.photos/seed/${prompt.creator}/24/24`} 
            alt={prompt.creator}
            className="creator-avatar"
          />
          <span>@{prompt.creator}</span>
        </div>
        <div className="card-stats">
          <span className="stat">
            <Heart size={14} />
            {prompt.likes.toLocaleString()}
          </span>
          <span className="stat">
            <Eye size={14} />
            {prompt.views.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  )
}

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(2) // 중앙 이미지 시작
  
  const goToPrev = () => {
    setCurrentIndex(prev => prev === 0 ? carouselImages.length - 1 : prev - 1)
  }
  
  const goToNext = () => {
    setCurrentIndex(prev => prev === carouselImages.length - 1 ? 0 : prev + 1)
  }
  
  // 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [])
  
  const getVisibleImages = () => {
    const result = []
    const total = carouselImages.length
    
    for (let i = -2; i <= 2; i++) {
      let index = (currentIndex + i + total) % total
      result.push({
        ...carouselImages[index],
        position: i
      })
    }
    return result
  }

  return (
    <div className="carousel-section">
      <div className="carousel-container">
        <div className="carousel-track">
          {getVisibleImages().map((item, idx) => (
            <div 
              key={`${item.id}-${idx}`}
              className={`carousel-item position-${item.position}`}
            >
              <img src={item.image} alt={item.title} />
              {item.position === 0 && (
                <div className="carousel-info">
                  <h3>{item.title}</h3>
                  <span>@{item.creator}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <button className="carousel-btn prev" onClick={goToPrev}>
          <ChevronLeft size={24} />
        </button>
        <button className="carousel-btn next" onClick={goToNext}>
          <ChevronRight size={24} />
        </button>
        
        <div className="carousel-dots">
          {carouselImages.map((_, idx) => (
            <button 
              key={idx}
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('전체')

  const filteredPrompts = selectedCategory === '전체' 
    ? featuredPrompts 
    : featuredPrompts.filter(p => p.category === selectedCategory)

  return (
    <div className="home-page">
      {/* Hero Section with Carousel */}
      <section className="hero-section">
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-icon">
              <Zap />
            </span>
            AI 크리에이티브의 새로운 기준
          </div>
          
          {/* Title */}
          <h1 className="hero-title">
            <span className="gradient-text">프롬프트</span>로 만드는
            <br />무한한 가능성
          </h1>
          
          {/* Subtitle */}
          <p className="hero-subtitle">
            전 세계 크리에이터들의 검증된 프롬프트를 만나보세요.
            당신의 아이디어를 현실로 만들어 드립니다.
          </p>
          
          {/* Stats */}
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-icon">
                <Sparkles />
              </div>
              <div className="hero-stat-content">
                <span className="stat-value">12,345+</span>
                <span className="stat-label">프롬프트</span>
              </div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-icon">
                <TrendingUp />
              </div>
              <div className="hero-stat-content">
                <span className="stat-value">5,678+</span>
                <span className="stat-label">크리에이터</span>
              </div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-icon">
                <Star />
              </div>
              <div className="hero-stat-content">
                <span className="stat-value">98%</span>
                <span className="stat-label">만족도</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image Carousel */}
        <ImageCarousel />
      </section>

      {/* Community Banner */}
      <section className="community-banner">
        <div className="banner-content">
          <div className="banner-icon">
            <MessageCircle size={28} />
          </div>
          <div className="banner-text">
            <h3>커뮤니티에서 소통하세요</h3>
            <p>프롬프트 관련 정보 공유, 질문, 결과물 자랑까지!</p>
          </div>
          <div className="banner-stats">
            <div className="banner-stat">
              <Users size={18} />
              <span>5,234 멤버</span>
            </div>
            <div className="banner-stat">
              <MessageCircle size={18} />
              <span>12,567 게시글</span>
            </div>
          </div>
          <Link to="/community" className="banner-btn">
            커뮤니티 가기
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <div className="section-header">
          <div className="section-title-group">
            <span className="section-eyebrow">Discover</span>
            <h2 className="section-title">
              인기 프롬프트
            </h2>
            <p className="section-subtitle">
              지금 가장 주목받는 프롬프트를 만나보세요
            </p>
          </div>
          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="prompts-grid">
          {filteredPrompts.map((prompt, index) => (
            <PromptCard key={prompt.id} prompt={prompt} index={index} />
          ))}
        </div>

        <div className="section-footer">
          <Link to="/free" className="view-more-btn">
            더 많은 프롬프트 보기
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>당신도 크리에이터가 될 수 있어요</h2>
          <p>프롬프트를 공유하고, 수익을 창출하세요. 지금 바로 시작해보세요.</p>
          <Link to="/creator" className="cta-btn">
            크리에이터 시작하기
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
