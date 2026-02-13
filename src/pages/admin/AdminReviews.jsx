import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  XCircle,
  Play,
  Eye,
  ChevronRight,
  X,
  Loader2,
  Sparkles,
  DollarSign,
  Tag,
  User,
  Calendar,
  AlertTriangle,
  Check
} from 'lucide-react'
import './AdminReviews.css'

// 샘플 데이터
const reviewsData = [
  { 
    id: 1, 
    title: '사이버펑크 네온 캐릭터', 
    creator: 'creative_kim',
    creatorAvatar: 'https://picsum.photos/seed/user1/40/40',
    createdAt: '2024-01-15 14:30',
    model: 'Midjourney v6',
    price: 15000,
    status: 'pending',
    thumbnail: 'https://picsum.photos/seed/cyber1/400/400',
    images: [
      'https://picsum.photos/seed/cyber1/400/400',
      'https://picsum.photos/seed/cyber2/400/400',
      'https://picsum.photos/seed/cyber3/400/400',
    ],
    prompt: 'cyberpunk neon character, glowing eyes, futuristic city background, highly detailed, 8k resolution, cinematic lighting --ar 1:1 --v 6',
    description: '사이버펑크 스타일의 네온 캐릭터입니다. 미래 도시를 배경으로 한 강렬한 네온 색감이 특징이며, 게임 캐릭터나 NFT 아트에 적합합니다.',
    tags: ['사이버펑크', '네온', '캐릭터', 'SF']
  },
  { 
    id: 2, 
    title: '미니멀 로고 디자인 프롬프트', 
    creator: 'design_master',
    creatorAvatar: 'https://picsum.photos/seed/user2/40/40',
    createdAt: '2024-01-15 13:15',
    model: 'DALL-E 3',
    price: 8000,
    status: 'pending',
    thumbnail: 'https://picsum.photos/seed/logo1/400/400',
    images: [
      'https://picsum.photos/seed/logo1/400/400',
      'https://picsum.photos/seed/logo2/400/400',
    ],
    prompt: 'minimal logo design, clean lines, geometric shapes, professional, vector style, white background',
    description: '미니멀한 로고 디자인을 위한 프롬프트입니다. 깔끔한 라인과 기하학적 형태가 특징이며, 스타트업이나 브랜드 로고에 활용할 수 있습니다.',
    tags: ['로고', '미니멀', '브랜딩']
  },
  { 
    id: 3, 
    title: '판타지 풍경 일러스트', 
    creator: 'art_lover',
    creatorAvatar: 'https://picsum.photos/seed/user3/40/40',
    createdAt: '2024-01-15 11:00',
    model: 'Stable Diffusion XL',
    price: 25000,
    status: 'pending',
    thumbnail: 'https://picsum.photos/seed/fantasy1/400/400',
    images: [
      'https://picsum.photos/seed/fantasy1/400/400',
      'https://picsum.photos/seed/fantasy2/400/400',
      'https://picsum.photos/seed/fantasy3/400/400',
      'https://picsum.photos/seed/fantasy4/400/400',
    ],
    prompt: 'fantasy landscape, magical forest, glowing mushrooms, ethereal atmosphere, digital painting style, vibrant colors, mystical creatures',
    description: '환상적인 판타지 풍경 일러스트 프롬프트입니다. 마법의 숲과 신비로운 분위기를 연출하며, 게임 배경이나 일러스트레이션에 적합합니다.',
    tags: ['판타지', '풍경', '일러스트', '마법']
  },
  { 
    id: 4, 
    title: '포토리얼 인물 사진', 
    creator: 'photo_pro',
    creatorAvatar: 'https://picsum.photos/seed/user4/40/40',
    createdAt: '2024-01-15 09:45',
    model: 'Midjourney v6',
    price: 12000,
    status: 'approved',
    thumbnail: 'https://picsum.photos/seed/portrait1/400/400',
    images: [
      'https://picsum.photos/seed/portrait1/400/400',
    ],
    prompt: 'photorealistic portrait, natural lighting, shallow depth of field, professional photography, 85mm lens',
    description: '포토리얼리스틱한 인물 사진 프롬프트입니다. 자연스러운 조명과 얕은 심도가 특징입니다.',
    tags: ['인물', '포토리얼', '사진']
  },
  { 
    id: 5, 
    title: '추상 아트 패턴', 
    creator: 'abstract_art',
    creatorAvatar: 'https://picsum.photos/seed/user5/40/40',
    createdAt: '2024-01-14 16:20',
    model: 'DALL-E 3',
    price: 5000,
    status: 'rejected',
    rejectReason: '이미지 품질이 기준에 미달합니다. 더 높은 해상도의 결과물이 필요합니다.',
    thumbnail: 'https://picsum.photos/seed/abstract1/400/400',
    images: [
      'https://picsum.photos/seed/abstract1/400/400',
    ],
    prompt: 'abstract art pattern, flowing shapes, vibrant colors',
    description: '추상 아트 패턴입니다.',
    tags: ['추상', '패턴']
  },
]

function AdminReviews() {
  const [filter, setFilter] = useState('pending')
  const [selectedReview, setSelectedReview] = useState(null)
  const [isTestRunning, setIsTestRunning] = useState(false)
  const [testResult, setTestResult] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  const [showRejectModal, setShowRejectModal] = useState(false)

  const filteredReviews = reviewsData.filter(review => {
    if (filter === 'all') return true
    return review.status === filter
  })

  const handleRunTest = () => {
    setIsTestRunning(true)
    setTestResult(null)
    
    // 시뮬레이션: 3초 후 결과 표시
    setTimeout(() => {
      setIsTestRunning(false)
      setTestResult({
        success: true,
        image: `https://picsum.photos/seed/test${Date.now()}/400/400`,
        generationTime: '4.2초'
      })
    }, 3000)
  }

  const handleApprove = () => {
    alert(`"${selectedReview.title}" 프롬프트가 승인되었습니다.`)
    setSelectedReview(null)
    setTestResult(null)
  }

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('반려 사유를 입력해주세요.')
      return
    }
    alert(`"${selectedReview.title}" 프롬프트가 반려되었습니다.\n사유: ${rejectReason}`)
    setShowRejectModal(false)
    setRejectReason('')
    setSelectedReview(null)
    setTestResult(null)
  }

  return (
    <div className="admin-reviews">
      {/* Left Panel - List */}
      <div className="reviews-list-panel">
        {/* Toolbar */}
        <div className="list-toolbar">
          <div className="search-box">
            <Search size={16} />
            <input type="text" placeholder="프롬프트 또는 크리에이터 검색..." />
          </div>
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              <Clock size={14} />
              대기
              <span className="tab-count">3</span>
            </button>
            <button 
              className={`filter-tab ${filter === 'approved' ? 'active' : ''}`}
              onClick={() => setFilter('approved')}
            >
              <CheckCircle size={14} />
              승인
            </button>
            <button 
              className={`filter-tab ${filter === 'rejected' ? 'active' : ''}`}
              onClick={() => setFilter('rejected')}
            >
              <XCircle size={14} />
              반려
            </button>
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              전체
            </button>
          </div>
        </div>

        {/* List */}
        <div className="reviews-list">
          {filteredReviews.map((review) => (
            <div 
              key={review.id} 
              className={`review-list-item ${selectedReview?.id === review.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedReview(review)
                setTestResult(null)
              }}
            >
              <img src={review.thumbnail} alt={review.title} className="item-thumb" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">{review.title}</span>
                  <span className={`status-dot ${review.status}`}></span>
                </div>
                <div className="item-meta">
                  <span className="creator">@{review.creator}</span>
                  <span className="model">{review.model}</span>
                </div>
                <div className="item-footer">
                  <span className="price">₩{review.price.toLocaleString()}</span>
                  <span className="date">{review.createdAt}</span>
                </div>
              </div>
              <ChevronRight size={16} className="item-arrow" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Detail */}
      <div className="review-detail-panel">
        {selectedReview ? (
          <>
            {/* Detail Header */}
            <div className="detail-header">
              <div className="detail-title-section">
                <h2>{selectedReview.title}</h2>
                <span className={`status-badge ${selectedReview.status}`}>
                  {selectedReview.status === 'pending' && '심사 대기'}
                  {selectedReview.status === 'approved' && '승인됨'}
                  {selectedReview.status === 'rejected' && '반려됨'}
                </span>
              </div>
              <button className="close-btn" onClick={() => setSelectedReview(null)}>
                <X size={20} />
              </button>
            </div>

            {/* Detail Content */}
            <div className="detail-content">
              {/* Images */}
              <div className="detail-section">
                <h3>결과 이미지</h3>
                <div className="image-grid">
                  {selectedReview.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`결과 ${idx + 1}`} className="result-image" />
                  ))}
                </div>
              </div>

              {/* Creator Info */}
              <div className="detail-section">
                <h3>크리에이터 정보</h3>
                <div className="creator-info">
                  <img src={selectedReview.creatorAvatar} alt={selectedReview.creator} className="creator-avatar" />
                  <div className="creator-details">
                    <span className="creator-name">@{selectedReview.creator}</span>
                    <span className="creator-stats">총 42개 프롬프트 · 승인률 92%</span>
                  </div>
                </div>
              </div>

              {/* Prompt */}
              <div className="detail-section">
                <h3>
                  <Sparkles size={16} />
                  프롬프트
                </h3>
                <div className="prompt-box">
                  <code>{selectedReview.prompt}</code>
                </div>
              </div>

              {/* Description */}
              <div className="detail-section">
                <h3>상품 설명</h3>
                <p className="description-text">{selectedReview.description}</p>
              </div>

              {/* Meta Info */}
              <div className="detail-section">
                <div className="meta-grid">
                  <div className="meta-item">
                    <Tag size={14} />
                    <span className="meta-label">모델</span>
                    <span className="meta-value">{selectedReview.model}</span>
                  </div>
                  <div className="meta-item">
                    <DollarSign size={14} />
                    <span className="meta-label">가격</span>
                    <span className="meta-value">₩{selectedReview.price.toLocaleString()}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span className="meta-label">등록일</span>
                    <span className="meta-value">{selectedReview.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="detail-section">
                <h3>태그</h3>
                <div className="tags-list">
                  {selectedReview.tags.map((tag, idx) => (
                    <span key={idx} className="tag">#{tag}</span>
                  ))}
                </div>
              </div>

              {/* Reject Reason (if rejected) */}
              {selectedReview.status === 'rejected' && selectedReview.rejectReason && (
                <div className="detail-section">
                  <div className="reject-notice">
                    <AlertTriangle size={16} />
                    <div>
                      <strong>반려 사유</strong>
                      <p>{selectedReview.rejectReason}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Test Section */}
              {selectedReview.status === 'pending' && (
                <div className="detail-section test-section">
                  <h3>
                    <Play size={16} />
                    프롬프트 테스트
                  </h3>
                  <div className="test-area">
                    {!testResult && !isTestRunning && (
                      <button className="test-btn" onClick={handleRunTest}>
                        <Play size={18} />
                        프롬프트 실행하기
                      </button>
                    )}
                    
                    {isTestRunning && (
                      <div className="test-loading">
                        <Loader2 size={24} className="spinner" />
                        <span>이미지 생성 중...</span>
                        <p>API를 통해 프롬프트를 실행하고 있습니다.</p>
                      </div>
                    )}
                    
                    {testResult && (
                      <div className="test-result">
                        <img src={testResult.image} alt="테스트 결과" className="test-image" />
                        <div className="test-info">
                          <span className="test-success">
                            <CheckCircle size={14} />
                            생성 완료
                          </span>
                          <span className="test-time">생성 시간: {testResult.generationTime}</span>
                        </div>
                        <button className="test-btn secondary" onClick={handleRunTest}>
                          다시 실행
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {selectedReview.status === 'pending' && (
              <div className="detail-actions">
                <button className="action-btn reject" onClick={() => setShowRejectModal(true)}>
                  <XCircle size={18} />
                  반려
                </button>
                <button className="action-btn approve" onClick={handleApprove}>
                  <Check size={18} />
                  승인
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-detail">
            <Eye size={48} />
            <h3>프롬프트를 선택하세요</h3>
            <p>왼쪽 목록에서 심사할 프롬프트를 선택하면<br />상세 정보를 확인할 수 있습니다.</p>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="modal-overlay" onClick={() => setShowRejectModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>반려 사유 입력</h3>
              <button className="modal-close" onClick={() => setShowRejectModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-desc">크리에이터에게 전달될 반려 사유를 입력해주세요.</p>
              <textarea 
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="반려 사유를 상세히 작성해주세요..."
                rows={4}
              />
            </div>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowRejectModal(false)}>
                취소
              </button>
              <button className="modal-btn confirm" onClick={handleReject}>
                반려 처리
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminReviews
