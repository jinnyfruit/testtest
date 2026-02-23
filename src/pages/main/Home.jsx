import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Eye, Play, ArrowRight, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import './Home.css'

// 샘플 프롬프트 데이터 - 실제 이미지 사용
const featuredPrompts = [
  { id: 1, title: '4K 플래시 라이트닝', creator: 'creative_kim', price: 0, likes: 234, views: 1520, model: 'Midjourney', category: '캐릭터', image: '/prompts/4k_flash.webp' },
  { id: 2, title: '90년대 레트로 스타일', creator: 'design_master', price: 500, likes: 189, views: 980, model: 'DALL-E 3', category: '포스터', image: '/prompts/90s.webp' },
  { id: 3, title: '레트로 빈티지 컬렉션', creator: 'art_lover', price: 800, likes: 456, views: 2340, model: 'Stable Diffusion', category: '포스터', image: '/prompts/90s(2).webp' },
  { id: 4, title: '포토리얼 뷰티', creator: 'photo_pro', price: 1200, likes: 321, views: 1890, model: 'Midjourney', category: '인물', image: '/prompts/realistic_beauty.webp' },
  { id: 5, title: '풍선 텍스쳐 아트', creator: 'icon_maker', price: 0, likes: 567, views: 3210, model: 'DALL-E 3', category: '아이콘', image: '/prompts/balloon_texture.webp' },
  { id: 6, title: '마인크래프트 음식', creator: 'retro_design', price: 600, likes: 234, views: 1450, model: 'Stable Diffusion', category: '3D', image: '/prompts/food_minecraft.webp' },
  { id: 7, title: '마인크래프트 배경', creator: 'model_expert', price: 1500, likes: 412, views: 2100, model: 'Midjourney', category: '배경', image: '/prompts/minecraft_background.webp' },
  { id: 8, title: '90s 네온 스타일', creator: 'anime_art', price: 0, likes: 678, views: 4500, model: 'Stable Diffusion', category: '포스터', image: '/prompts/90s(3).webp' },
]

// 캐러셀용 이미지 데이터 - 실제 이미지 사용
const carouselImages = [
  { id: 1, image: '/prompts/4k_flash.webp', title: '4K 플래시 라이트닝', creator: 'creative_kim' },
  { id: 2, image: '/prompts/realistic_beauty.webp', title: '포토리얼 뷰티', creator: 'photo_pro' },
  { id: 3, image: '/prompts/90s.webp', title: '90년대 레트로', creator: 'design_master' },
  { id: 4, image: '/prompts/balloon_texture.webp', title: '풍선 텍스쳐 아트', creator: 'art_lover' },
  { id: 5, image: '/prompts/minecraft_background.webp', title: '마인크래프트 배경', creator: 'model_expert' },
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
      {/* Hero Section - Minimal & Bold */}
      <section className="hero-section">
        <div className="hero-content">
          {/* Title */}
          <h1 className="hero-title">
            <span className="title-line">
              <span className="gradient-text">Prompt</span>
            </span>
            <span className="title-line">Marketplace</span>
          </h1>
          
          {/* Subtitle */}
          <p className="hero-subtitle">
            크리에이터들의 프리미엄 프롬프트를 발견하세요
          </p>
          
          {/* CTA Buttons */}
          <div className="hero-cta">
            <Link to="/free" className="hero-btn primary">
              <span>둘러보기</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/creator" className="hero-btn secondary">
              <span>크리에이터 되기</span>
            </Link>
          </div>
          
          {/* Stats - Minimal */}
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-value">12K+</span>
              <span className="stat-label">프롬프트</span>
            </div>
            <div className="stat-divider"></div>
            <div className="hero-stat">
              <span className="stat-value">5K+</span>
              <span className="stat-label">크리에이터</span>
            </div>
            <div className="stat-divider"></div>
            <div className="hero-stat">
              <span className="stat-value">98%</span>
              <span className="stat-label">만족도</span>
            </div>
          </div>
        </div>
        
        {/* Image Carousel */}
        <ImageCarousel />
      </section>

      {/* Community Banner - Hot & Interactive */}
      <section className="community-banner">
        <Link to="/community" className="banner-content">
          <div className="banner-bg"></div>
          <div className="banner-main">
            <div className="banner-text">
              <span className="banner-tag">COMMUNITY</span>
              <h3>크리에이터들과 소통하세요</h3>
              <p>프롬프트 팁, 결과물 공유, 피드백까지</p>
            </div>
            <div className="banner-stats">
              <div className="banner-stat">
                <span className="stat-num">5,234</span>
                <span className="stat-text">멤버</span>
              </div>
              <div className="banner-stat">
                <span className="stat-num">12,567</span>
                <span className="stat-text">게시글</span>
              </div>
            </div>
          </div>
          <div className="banner-arrow">
            <ArrowUpRight size={24} />
          </div>
        </Link>
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
