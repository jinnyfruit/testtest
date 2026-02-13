import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Filter,
  ChevronRight,
  Tag,
  DollarSign,
  Plus,
  Edit3,
  X,
  Save,
  Send
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './ReviewHistory.css'

const statusConfig = {
  approved: { label: '승인됨', color: '#10b981', icon: CheckCircle },
  pending: { label: '심사중', color: '#f59e0b', icon: Clock },
  rejected: { label: '반려됨', color: '#ef4444', icon: XCircle },
}

// 샘플 데이터
const initialReviews = [
  {
    id: 1,
    title: '사이버펑크 네온 캐릭터',
    prompt: 'A cyberpunk character with neon lights, futuristic cityscape background...',
    description: '미드저니를 활용한 사이버펑크 스타일의 캐릭터 생성 프롬프트입니다. 네온 조명과 미래적인 배경이 특징입니다.',
    thumbnail: 'https://picsum.photos/seed/review1/400/400',
    models: ['Midjourney', 'DALL-E 3'],
    price: 15000,
    status: 'approved',
    submittedAt: '2024-02-05',
    reviewedAt: '2024-02-06'
  },
  {
    id: 2,
    title: '미니멀 로고 디자인 프롬프트',
    prompt: 'Minimalist logo design, clean lines, modern aesthetic...',
    description: '심플하고 모던한 로고 디자인을 위한 프롬프트입니다. 다양한 브랜드에 활용 가능합니다.',
    thumbnail: 'https://picsum.photos/seed/review2/400/400',
    models: ['Stable Diffusion'],
    price: 8000,
    status: 'pending',
    submittedAt: '2024-02-07'
  },
  {
    id: 3,
    title: '판타지 풍경 일러스트',
    prompt: 'Epic fantasy landscape, magical atmosphere, detailed environment...',
    description: '웅장한 판타지 풍경을 생성하는 프롬프트입니다. 게임 아트나 일러스트에 적합합니다.',
    thumbnail: 'https://picsum.photos/seed/review3/400/400',
    models: ['Midjourney', 'Leonardo AI'],
    price: 25000,
    status: 'rejected',
    submittedAt: '2024-02-03',
    reviewedAt: '2024-02-04',
    rejectReason: '프롬프트 설명이 부족합니다. 더 상세한 사용 가이드를 추가해주세요.'
  },
  {
    id: 4,
    title: '포토리얼 인물 사진',
    prompt: 'Photorealistic portrait, professional lighting, studio quality...',
    description: '스튜디오 품질의 포토리얼 인물 사진을 생성합니다. 프로필 사진이나 광고에 활용 가능합니다.',
    thumbnail: 'https://picsum.photos/seed/review4/400/400',
    models: ['DALL-E 3', 'Adobe Firefly'],
    price: 12000,
    status: 'approved',
    submittedAt: '2024-01-28',
    reviewedAt: '2024-01-30'
  },
]

function EditModal({ review, onClose, onSave }) {
  const [editData, setEditData] = useState({
    title: review.title,
    prompt: review.prompt,
    description: review.description,
    price: review.price,
  })

  const handleSubmit = () => {
    onSave(review.id, editData)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div 
        className="edit-modal"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="modal-header">
          <h2>컨텐츠 수정</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="reject-notice">
            <XCircle size={18} />
            <div>
              <strong>반려 사유</strong>
              <p>{review.rejectReason}</p>
            </div>
          </div>

          <div className="form-group">
            <label>제목</label>
            <input 
              type="text"
              value={editData.title}
              onChange={e => setEditData({...editData, title: e.target.value})}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>프롬프트</label>
            <textarea 
              value={editData.prompt}
              onChange={e => setEditData({...editData, prompt: e.target.value})}
              className="form-textarea"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>상세설명 및 사용가이드</label>
            <textarea 
              value={editData.description}
              onChange={e => setEditData({...editData, description: e.target.value})}
              className="form-textarea"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>가격 (원)</label>
            <input 
              type="number"
              value={editData.price}
              onChange={e => setEditData({...editData, price: parseInt(e.target.value) || 0})}
              className="form-input"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            취소
          </button>
          <button className="btn-save" onClick={handleSubmit}>
            <Save size={16} />
            저장
          </button>
          <button className="btn-resubmit" onClick={handleSubmit}>
            <Send size={16} />
            재심사 요청
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function ReviewCard({ review, index, onEdit }) {
  const StatusIcon = statusConfig[review.status].icon
  
  return (
    <motion.div 
      className="review-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="review-thumbnail">
        <img src={review.thumbnail} alt={review.title} />
        <div className="thumbnail-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
      
      <div className="review-content">
        <div className="review-header">
          <h3 className="review-title">{review.title}</h3>
          <div 
            className="review-status"
            style={{ '--status-color': statusConfig[review.status].color }}
          >
            <StatusIcon size={14} />
            {statusConfig[review.status].label}
          </div>
        </div>
        
        <div className="review-prompt">
          <span className="prompt-label">프롬프트</span>
          <p className="prompt-text">{review.prompt}</p>
        </div>
        
        <div className="review-description">
          <span className="desc-label">상세설명 및 사용가이드</span>
          <p className="desc-text">{review.description}</p>
        </div>
        
        <div className="review-meta">
          <div className="model-tags">
            {review.models.map(model => (
              <span key={model} className="model-tag">
                <Tag size={12} />
                {model}
              </span>
            ))}
          </div>
          
          <div className="review-price">
            <DollarSign size={14} />
            {review.price > 0 ? `₩${review.price.toLocaleString()}` : '무료'}
          </div>
        </div>
        
        {review.status === 'rejected' && review.rejectReason && (
          <motion.div 
            className="reject-reason"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <div className="reject-reason-content">
              <XCircle size={16} />
              <p>{review.rejectReason}</p>
            </div>
            <button className="edit-btn" onClick={() => onEdit(review)}>
              <Edit3 size={14} />
              수정하기
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

function ReviewHistory() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [reviews, setReviews] = useState(initialReviews)
  const [editingReview, setEditingReview] = useState(null)

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.status === filter)

  const counts = {
    all: reviews.length,
    approved: reviews.filter(r => r.status === 'approved').length,
    pending: reviews.filter(r => r.status === 'pending').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
  }

  const handleSaveEdit = (id, editData) => {
    setReviews(prev => prev.map(r => 
      r.id === id 
        ? { ...r, ...editData, status: 'pending', rejectReason: null }
        : r
    ))
  }

  return (
    <div className="review-page">
      {/* Header with Register Button */}
      <div className="page-header">
        <div className="filter-tabs">
          {[
            { key: 'all', label: '전체' },
            { key: 'approved', label: '승인됨' },
            { key: 'pending', label: '심사중' },
            { key: 'rejected', label: '반려됨' },
          ].map(tab => (
            <button
              key={tab.key}
              className={`filter-tab ${filter === tab.key ? 'active' : ''}`}
              onClick={() => setFilter(tab.key)}
            >
              {tab.label}
              <span className="tab-count">{counts[tab.key]}</span>
            </button>
          ))}
        </div>
        
        <motion.button 
          className="register-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/creator/upload')}
        >
          <Plus size={18} />
          등록하기
        </motion.button>
      </div>

      {/* Review List */}
      <div className="review-list">
        <AnimatePresence mode="wait">
          {filteredReviews.map((review, index) => (
            <ReviewCard 
              key={review.id} 
              review={review} 
              index={index}
              onEdit={setEditingReview}
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredReviews.length === 0 && (
        <motion.div 
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>해당 상태의 컨텐츠가 없습니다</p>
        </motion.div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingReview && (
          <EditModal 
            review={editingReview}
            onClose={() => setEditingReview(null)}
            onSave={handleSaveEdit}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ReviewHistory
