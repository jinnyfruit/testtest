import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Plus, 
  MessageCircle, 
  Clock, 
  CheckCircle,
  User,
  X,
  Send,
  Image,
  Sparkles,
  Filter,
  ChevronDown,
  Eye,
  Heart,
  Award,
  Upload,
  Trash2
} from 'lucide-react'
import './PromptRequest.css'

// 샘플 요청 데이터 (캐시/예산 제거)
const requestsData = [
  {
    id: 1,
    title: '미니멀 로고 디자인 프롬프트 요청',
    description: '스타트업 로고에 사용할 미니멀한 스타일의 로고 프롬프트가 필요합니다. 심플하면서도 기억에 남는 디자인으로 부탁드립니다.',
    author: 'startup_founder',
    authorAvatar: 'https://picsum.photos/seed/startup/100/100',
    createdAt: '2시간 전',
    status: 'open',
    replies: 3,
    views: 128,
    category: '로고',
    preferredModel: 'Midjourney',
    referenceImages: ['https://picsum.photos/seed/ref1/200/200', 'https://picsum.photos/seed/ref2/200/200']
  },
  {
    id: 2,
    title: '게임 캐릭터 일러스트 프롬프트',
    description: '판타지 RPG 게임에 사용할 캐릭터 일러스트 프롬프트를 찾고 있습니다. 전사, 마법사, 궁수 등 다양한 직업군 캐릭터가 필요합니다.',
    author: 'game_developer',
    authorAvatar: 'https://picsum.photos/seed/gamedev/100/100',
    createdAt: '5시간 전',
    status: 'open',
    replies: 7,
    views: 342,
    category: '캐릭터',
    preferredModel: 'Stable Diffusion',
    referenceImages: ['https://picsum.photos/seed/game1/200/200', 'https://picsum.photos/seed/game2/200/200', 'https://picsum.photos/seed/game3/200/200']
  },
  {
    id: 3,
    title: '제품 목업 이미지 프롬프트',
    description: '화장품 브랜드 제품 목업 이미지를 생성할 수 있는 프롬프트가 필요합니다. 고급스러운 느낌으로 부탁드립니다.',
    author: 'beauty_brand',
    authorAvatar: 'https://picsum.photos/seed/beauty/100/100',
    createdAt: '1일 전',
    status: 'in_progress',
    replies: 5,
    views: 256,
    category: '목업',
    preferredModel: 'DALL-E 3',
    referenceImages: ['https://picsum.photos/seed/beauty1/200/200']
  },
  {
    id: 4,
    title: '인스타그램 피드 디자인 프롬프트',
    description: '일관된 인스타그램 피드 디자인을 위한 프롬프트를 요청합니다. 파스텔 톤의 감성적인 스타일로 부탁드립니다.',
    author: 'influencer_kim',
    authorAvatar: 'https://picsum.photos/seed/influencer/100/100',
    createdAt: '2일 전',
    status: 'completed',
    replies: 12,
    views: 489,
    category: '디자인',
    preferredModel: 'Midjourney',
    referenceImages: []
  },
]

const statusConfig = {
  open: { label: '모집중', className: 'status-open' },
  in_progress: { label: '진행중', className: 'status-progress' },
  completed: { label: '완료', className: 'status-completed' }
}

const modelOptions = ['전체', 'Midjourney', 'DALL-E 3', 'Stable Diffusion', 'Leonardo AI']
const categoryOptions = ['전체', '캐릭터', '로고', '풍경', '인물', '목업', '디자인', '기타']

function RequestCard({ request, onClick }) {
  const status = statusConfig[request.status]
  
  return (
    <article className="request-card" onClick={onClick}>
      <div className="card-top">
        <span className={`status-tag ${status.className}`}>{status.label}</span>
        <span className="card-time">{request.createdAt}</span>
      </div>
      
      <h3 className="card-title">{request.title}</h3>
      <p className="card-desc">{request.description}</p>
      
      {request.referenceImages.length > 0 && (
        <div className="card-refs">
          {request.referenceImages.slice(0, 3).map((img, idx) => (
            <div key={idx} className="ref-thumb">
              <img src={img} alt="" />
            </div>
          ))}
          {request.referenceImages.length > 3 && (
            <div className="ref-more">+{request.referenceImages.length - 3}</div>
          )}
        </div>
      )}
      
      <div className="card-meta">
        <div className="meta-left">
          <img src={request.authorAvatar} alt="" className="author-thumb" />
          <span className="author-name">@{request.author}</span>
        </div>
        <div className="meta-right">
          <span className="meta-item"><Eye size={14} />{request.views}</span>
          <span className="meta-item"><MessageCircle size={14} />{request.replies}</span>
        </div>
      </div>
      
      <div className="card-tags">
        <span className="tag">{request.category}</span>
        <span className="tag">{request.preferredModel}</span>
      </div>
    </article>
  )
}

function WriteModal({ onClose }) {
  const [referenceImages, setReferenceImages] = useState([])
  const [selectedModel, setSelectedModel] = useState('')
  
  const handleImageUpload = () => {
    // 실제로는 파일 업로드 로직
    const fakeImages = [
      `https://picsum.photos/seed/${Date.now()}/200/200`,
    ]
    setReferenceImages([...referenceImages, ...fakeImages])
  }
  
  const removeImage = (index) => {
    setReferenceImages(referenceImages.filter((_, i) => i !== index))
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <header className="modal-head">
          <h2>프롬프트 요청하기</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </header>
        
        <div className="modal-content">
          <div className="form-field">
            <label>제목</label>
            <input type="text" placeholder="어떤 프롬프트가 필요하신가요?" className="field-input" />
          </div>
          
          <div className="form-field">
            <label>카테고리</label>
            <select className="field-select">
              <option value="">선택하세요</option>
              {categoryOptions.slice(1).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="form-field">
            <label>선호 AI 모델</label>
            <div className="model-chips">
              {modelOptions.slice(1).map(model => (
                <button 
                  key={model}
                  className={`model-chip ${selectedModel === model ? 'selected' : ''}`}
                  onClick={() => setSelectedModel(model === selectedModel ? '' : model)}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>
          
          <div className="form-field">
            <label>레퍼런스 이미지</label>
            <p className="field-hint">원하는 스타일의 참고 이미지를 업로드해주세요</p>
            <div className="ref-upload-area">
              {referenceImages.map((img, idx) => (
                <div key={idx} className="ref-preview">
                  <img src={img} alt="" />
                  <button className="ref-remove" onClick={() => removeImage(idx)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button className="ref-add-btn" onClick={handleImageUpload}>
                <Upload size={20} />
                <span>이미지 추가</span>
              </button>
            </div>
          </div>
          
          <div className="form-field">
            <label>상세 설명</label>
            <textarea 
              className="field-textarea" 
              placeholder="원하시는 프롬프트의 스타일, 용도, 특징 등을 자세히 설명해주세요. 상세할수록 좋은 제안을 받으실 수 있습니다."
              rows={5}
            />
          </div>
        </div>
        
        <footer className="modal-foot">
          <button className="btn-cancel" onClick={onClose}>취소</button>
          <button className="btn-submit">요청 등록</button>
        </footer>
      </div>
    </div>
  )
}

function DetailModal({ request, onClose }) {
  const status = statusConfig[request.status]
  const [replyText, setReplyText] = useState('')
  const [previewImage, setPreviewImage] = useState(null)
  
  // 샘플 댓글 (크리에이터 제안)
  const replies = [
    {
      id: 1,
      author: 'pro_creator',
      avatar: 'https://picsum.photos/seed/creator1/100/100',
      isCreator: true,
      content: '안녕하세요! 요청하신 스타일의 프롬프트 제작 가능합니다. 아래 샘플 결과물 확인해주세요.',
      promptPreview: 'https://picsum.photos/seed/sample1/300/300',
      time: '1시간 전',
      likes: 5,
      isSelected: false
    },
    {
      id: 2,
      author: 'design_master',
      avatar: 'https://picsum.photos/seed/creator2/100/100',
      isCreator: true,
      content: '비슷한 스타일의 프롬프트를 보유하고 있습니다. 결과물 미리보기 첨부합니다!',
      promptPreview: 'https://picsum.photos/seed/sample2/300/300',
      time: '3시간 전',
      likes: 12,
      isSelected: true
    },
    {
      id: 3,
      author: 'art_lover',
      avatar: 'https://picsum.photos/seed/creator3/100/100',
      isCreator: true,
      content: '흥미로운 요청이네요. 제 포트폴리오 확인해보시고 연락주세요!',
      promptPreview: null,
      time: '5시간 전',
      likes: 3,
      isSelected: false
    }
  ]

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="detail-container" onClick={e => e.stopPropagation()}>
        <header className="detail-head">
          <div className="detail-tags">
            <span className={`status-tag ${status.className}`}>{status.label}</span>
            <span className="detail-time">{request.createdAt}</span>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </header>
        
        <div className="detail-body">
          <h2 className="detail-title">{request.title}</h2>
          
          <div className="detail-author">
            <img src={request.authorAvatar} alt="" />
            <div className="author-info">
              <span className="author-name">@{request.author}</span>
              <span className="post-time">{request.createdAt}</span>
            </div>
          </div>
          
          <p className="detail-desc">{request.description}</p>
          
          <div className="detail-info">
            <div className="info-item">
              <span className="info-label">선호 모델</span>
              <span className="info-value">{request.preferredModel}</span>
            </div>
            <div className="info-item">
              <span className="info-label">카테고리</span>
              <span className="info-value">{request.category}</span>
            </div>
          </div>
          
          {request.referenceImages.length > 0 && (
            <div className="detail-refs">
              <h4>레퍼런스 이미지</h4>
              <div className="refs-grid">
                {request.referenceImages.map((img, idx) => (
                  <button 
                    key={idx} 
                    className="ref-item"
                    onClick={() => setPreviewImage(img)}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="replies-section">
            <h4>크리에이터 제안 <span className="reply-count">{replies.length}</span></h4>
            
            <div className="replies-list">
              {replies.map(reply => (
                <div key={reply.id} className={`reply-card ${reply.isSelected ? 'selected' : ''}`}>
                  {reply.isSelected && (
                    <div className="selected-badge">
                      <Award size={14} />
                      채택됨
                    </div>
                  )}
                  <div className="reply-head">
                    <img src={reply.avatar} alt="" className="reply-avatar" />
                    <div className="reply-author">
                      <span className="reply-name">@{reply.author}</span>
                      {reply.isCreator && <span className="creator-badge">Creator</span>}
                    </div>
                    <span className="reply-time">{reply.time}</span>
                  </div>
                  <p className="reply-text">{reply.content}</p>
                  {reply.promptPreview && (
                    <button 
                      className="reply-preview"
                      onClick={() => setPreviewImage(reply.promptPreview)}
                    >
                      <img src={reply.promptPreview} alt="" />
                      <div className="preview-overlay">
                        <Eye size={20} />
                        <span>미리보기</span>
                      </div>
                    </button>
                  )}
                  <div className="reply-actions">
                    <button className="action-btn">
                      <Heart size={14} />
                      <span>{reply.likes}</span>
                    </button>
                    {!reply.isSelected && request.status === 'open' && (
                      <button className="action-btn accept">
                        <CheckCircle size={14} />
                        <span>채택하기</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="reply-input-wrap">
              <input 
                type="text" 
                placeholder="프롬프트를 제안하거나 댓글을 남겨보세요"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button className="reply-submit">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Preview Modal */}
      {previewImage && (
        <div className="preview-modal" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="" />
          <button className="preview-close">
            <X size={24} />
          </button>
        </div>
      )}
    </div>
  )
}

function PromptRequest() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showWriteModal, setShowWriteModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(null)

  const filteredRequests = requestsData.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="request-page">
      <div className="request-wrapper">
        {/* Header */}
        <header className="page-header">
          <div className="header-content">
            <h1>프롬프트 요청</h1>
            <p>원하는 프롬프트를 요청하고 크리에이터의 맞춤 제안을 받아보세요</p>
          </div>
          <button className="create-btn" onClick={() => setShowWriteModal(true)}>
            <Plus size={18} />
            요청하기
          </button>
        </header>

        {/* Filters */}
        <div className="filter-bar">
          <div className="search-field">
            <Search size={18} />
            <input 
              type="text"
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="filter-tabs">
            {[
              { key: 'all', label: '전체' },
              { key: 'open', label: '모집중' },
              { key: 'in_progress', label: '진행중' },
              { key: 'completed', label: '완료' }
            ].map(tab => (
              <button 
                key={tab.key}
                className={`filter-tab ${statusFilter === tab.key ? 'active' : ''}`}
                onClick={() => setStatusFilter(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="requests-grid">
          {filteredRequests.map(request => (
            <RequestCard 
              key={request.id} 
              request={request}
              onClick={() => setShowDetailModal(request)}
            />
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="empty-state">
            <Sparkles size={48} />
            <p>검색 결과가 없습니다</p>
          </div>
        )}
      </div>

      {showWriteModal && <WriteModal onClose={() => setShowWriteModal(false)} />}
      {showDetailModal && <DetailModal request={showDetailModal} onClose={() => setShowDetailModal(null)} />}
    </div>
  )
}

export default PromptRequest
