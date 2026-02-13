import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Heart, 
  Eye, 
  Share2, 
  ShoppingCart, 
  Play, 
  ChevronLeft, 
  ChevronRight,
  User,
  Tag,
  Sparkles,
  X,
  Check,
  Copy,
  Star,
  Download,
  Bookmark
} from 'lucide-react'
import './PromptDetail.css'

// 샘플 데이터
const promptData = {
  id: 1,
  title: '사이버펑크 네온 캐릭터',
  creator: {
    username: 'creative_kim',
    avatar: 'https://picsum.photos/seed/creator1/80/80',
    followers: 1234,
    promptCount: 42,
    verified: true
  },
  price: 800,
  likes: 234,
  views: 1520,
  downloads: 89,
  rating: 4.8,
  reviewCount: 45,
  model: 'Midjourney v6',
  category: '캐릭터',
  tags: ['사이버펑크', '네온', '캐릭터', 'SF', '미래'],
  images: [
    'https://picsum.photos/seed/detail1/800/800',
    'https://picsum.photos/seed/detail2/800/800',
    'https://picsum.photos/seed/detail3/800/800',
    'https://picsum.photos/seed/detail4/800/800',
  ],
  prompt: 'cyberpunk neon character, glowing eyes, futuristic city background, highly detailed, 8k resolution, cinematic lighting --ar 1:1 --v 6',
  description: `사이버펑크 스타일의 네온 캐릭터 프롬프트입니다.

이 프롬프트를 사용하면 미래 도시를 배경으로 한 강렬한 네온 색감의 캐릭터를 생성할 수 있습니다. 게임 캐릭터, NFT 아트, 일러스트레이션 등 다양한 용도로 활용 가능합니다.

주요 특징:
• 강렬한 네온 색감
• 미래적인 사이버펑크 분위기
• 고해상도 출력 최적화
• 다양한 변형 가능`,
  usageGuide: `1. 프롬프트를 복사하여 Midjourney에 붙여넣기
2. --ar 비율을 원하는 대로 수정 가능 (1:1, 16:9, 9:16 등)
3. 캐릭터 특성을 추가하여 커스터마이징
4. --stylize 값을 조절하여 스타일 강도 조절`,
  purchased: false,
  reviews: [
    { id: 1, user: 'user_123', avatar: 'https://picsum.photos/seed/rev1/40/40', rating: 5, text: '정말 퀄리티가 좋아요! 기대 이상입니다.', date: '2일 전' },
    { id: 2, user: 'designer_pro', avatar: 'https://picsum.photos/seed/rev2/40/40', rating: 4, text: '사용하기 쉽고 결과물도 훌륭합니다.', date: '5일 전' },
  ]
}

function PromptDetail() {
  const { id } = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [isPurchased, setIsPurchased] = useState(promptData.purchased)
  const [activeTab, setActiveTab] = useState('description')
  const [copySuccess, setCopySuccess] = useState(false)

  const prompt = promptData

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % prompt.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + prompt.images.length) % prompt.images.length)
  }

  const handlePurchase = () => {
    setShowPurchaseModal(false)
    setIsPurchased(true)
  }

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt.prompt)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  return (
    <div className="prompt-detail-page">
      <div className="detail-layout">
        {/* Left: Gallery */}
        <div className="detail-gallery">
          <div className="gallery-main" onClick={() => setShowImageModal(true)}>
            <img src={prompt.images[currentImageIndex]} alt={prompt.title} />
            {prompt.images.length > 1 && (
              <>
                <button className="gallery-nav prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                  <ChevronLeft size={24} />
                </button>
                <button className="gallery-nav next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                  <ChevronRight size={24} />
                </button>
                <div className="gallery-counter">
                  {currentImageIndex + 1} / {prompt.images.length}
                </div>
              </>
            )}
          </div>
          
          {prompt.images.length > 1 && (
            <div className="gallery-thumbs">
              {prompt.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumb-btn ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <img src={img} alt={`썸네일 ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="detail-info">
          {/* Badges */}
          <div className="info-badges">
            <span className="badge model">{prompt.model}</span>
            <span className="badge category">{prompt.category}</span>
          </div>

          {/* Title */}
          <h1 className="info-title">{prompt.title}</h1>

          {/* Stats */}
          <div className="info-stats">
            <div className="stat-item">
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
              <span className="stat-value">{prompt.rating}</span>
              <span className="stat-label">({prompt.reviewCount})</span>
            </div>
            <div className="stat-item">
              <Heart size={16} />
              <span className="stat-value">{prompt.likes}</span>
            </div>
            <div className="stat-item">
              <Eye size={16} />
              <span className="stat-value">{prompt.views.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <Download size={16} />
              <span className="stat-value">{prompt.downloads}</span>
            </div>
          </div>

          {/* Creator */}
          <Link to={`/profile/${prompt.creator.username}`} className="creator-card">
            <img src={prompt.creator.avatar} alt="" className="creator-avatar" />
            <div className="creator-details">
              <div className="creator-name-row">
                <span className="creator-name">@{prompt.creator.username}</span>
                {prompt.creator.verified && (
                  <span className="verified-badge">
                    <Check size={12} />
                  </span>
                )}
              </div>
              <span className="creator-meta">
                팔로워 {prompt.creator.followers.toLocaleString()} · 프롬프트 {prompt.creator.promptCount}개
              </span>
            </div>
            <button className="follow-btn">팔로우</button>
          </Link>

          {/* Prompt Preview - 상단으로 이동 */}
          <div className="prompt-card">
            <div className="prompt-header">
              <Sparkles size={18} />
              <span>프롬프트</span>
            </div>
            {isPurchased ? (
              <div className="prompt-content">
                <code>{prompt.prompt}</code>
                <button className="copy-btn" onClick={copyPrompt}>
                  {copySuccess ? <Check size={16} /> : <Copy size={16} />}
                  {copySuccess ? '복사됨!' : '복사'}
                </button>
              </div>
            ) : (
              <div className="prompt-locked">
                <div className="locked-overlay">
                  <Sparkles size={24} />
                  <p>구매 후 프롬프트를 확인할 수 있습니다</p>
                </div>
                <div className="prompt-blur">
                  cyberpunk neon character, glowing eyes...
                </div>
              </div>
            )}
          </div>

          {/* Tabs - 상단으로 이동 */}
          <div className="detail-tabs">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              상세 설명
            </button>
            <button 
              className={`tab-btn ${activeTab === 'guide' ? 'active' : ''}`}
              onClick={() => setActiveTab('guide')}
            >
              사용 가이드
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              리뷰 ({prompt.reviewCount})
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-content">
                {prompt.description.split('\n').map((line, idx) => (
                  <p key={idx}>{line || <br />}</p>
                ))}
              </div>
            )}
            
            {activeTab === 'guide' && (
              <div className="guide-content">
                {prompt.usageGuide.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <div className="reviews-summary">
                  <div className="summary-rating">
                    <span className="rating-big">{prompt.rating}</span>
                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                          key={star} 
                          size={16} 
                          fill={star <= Math.round(prompt.rating) ? '#fbbf24' : 'none'}
                          color="#fbbf24"
                        />
                      ))}
                    </div>
                    <span className="rating-count">{prompt.reviewCount}개 리뷰</span>
                  </div>
                </div>
                
                <div className="reviews-list">
                  {prompt.reviews.map(review => (
                    <div key={review.id} className="review-item">
                      <img src={review.avatar} alt="" className="review-avatar" />
                      <div className="review-body">
                        <div className="review-header">
                          <span className="review-user">@{review.user}</span>
                          <div className="review-stars">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star 
                                key={star} 
                                size={12} 
                                fill={star <= review.rating ? '#fbbf24' : 'none'}
                                color="#fbbf24"
                              />
                            ))}
                          </div>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <p className="review-text">{review.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="info-tags">
            {prompt.tags.map((tag, idx) => (
              <Link key={idx} to={`/search?tag=${tag}`} className="tag-link">
                #{tag}
              </Link>
            ))}
          </div>

          {/* Price & Actions - 하단으로 이동 */}
          <div className="purchase-card">
            {isPurchased ? (
              <div className="purchased-state">
                <div className="purchased-badge">
                  <Check size={20} />
                  <span>구매 완료</span>
                </div>
              </div>
            ) : (
              <>
                <div className="price-row">
                  <div className="price-value">
                    {prompt.price === 0 ? (
                      <span className="price-free">무료</span>
                    ) : (
                      <>
                        <span className="price-icon">🍰</span>
                        <span className="price-amount">{prompt.price.toLocaleString()}</span>
                      </>
                    )}
                  </div>
                </div>
                <button className="buy-btn" onClick={() => setShowPurchaseModal(true)}>
                  <ShoppingCart size={18} />
                  구매하기
                </button>
              </>
            )}
            
            <Link to="/run" className="run-btn">
              <Play size={18} />
              바로 실행하기
            </Link>
            
            <div className="action-row-mini">
              <button 
                className={`action-btn-mini ${isLiked ? 'active' : ''}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              <button 
                className={`action-btn-mini ${isBookmarked ? 'active' : ''}`}
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
              <button className="action-btn-mini">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="image-modal" onClick={() => setShowImageModal(false)}>
          <button className="modal-close-btn">
            <X size={24} />
          </button>
          <img src={prompt.images[currentImageIndex]} alt={prompt.title} />
          {prompt.images.length > 1 && (
            <>
              <button className="modal-nav prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                <ChevronLeft size={32} />
              </button>
              <button className="modal-nav next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                <ChevronRight size={32} />
              </button>
            </>
          )}
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="purchase-modal-overlay" onClick={() => setShowPurchaseModal(false)}>
          <div className="purchase-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowPurchaseModal(false)}>
              <X size={20} />
            </button>
            
            <div className="modal-content">
              <div className="modal-icon">
                <ShoppingCart size={32} />
              </div>
              <h2>프롬프트 구매</h2>
              <p className="modal-desc">이 프롬프트를 구매하시겠습니까?</p>
              
              <div className="modal-item">
                <img src={prompt.images[0]} alt="" />
                <div className="item-info">
                  <span className="item-title">{prompt.title}</span>
                  <span className="item-creator">@{prompt.creator.username}</span>
                </div>
              </div>
              
              <div className="modal-price">
                <span className="price-label">결제 금액</span>
                <span className="price-value">{prompt.price.toLocaleString()} 케이크</span>
              </div>
              
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowPurchaseModal(false)}>
                  취소
                </button>
                <button className="confirm-btn" onClick={handlePurchase}>
                  구매하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PromptDetail
