import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Grid, 
  List, 
  Search, 
  Filter,
  Star,
  Eye,
  Edit2,
  Trash2,
  MoreVertical,
  ShoppingCart,
  Calendar,
  DollarSign
} from 'lucide-react'
import './ContentManagement.css'

// 샘플 데이터
const sampleContents = [
  {
    id: 1,
    title: '사이버펑크 네온 캐릭터',
    thumbnail: 'https://picsum.photos/seed/cyber1/400/400',
    price: 15000,
    sales: 234,
    rating: 4.8,
    reviews: 45,
    lastModified: '2024-02-05',
    status: 'active'
  },
  {
    id: 2,
    title: '미니멀 로고 디자인 프롬프트',
    thumbnail: 'https://picsum.photos/seed/logo2/400/400',
    price: 8000,
    sales: 156,
    rating: 4.5,
    reviews: 32,
    lastModified: '2024-02-03',
    status: 'active'
  },
  {
    id: 3,
    title: '판타지 풍경 일러스트',
    thumbnail: 'https://picsum.photos/seed/fantasy3/400/400',
    price: 25000,
    sales: 89,
    rating: 4.9,
    reviews: 28,
    lastModified: '2024-02-01',
    status: 'active'
  },
  {
    id: 4,
    title: '포토리얼 인물 사진',
    thumbnail: 'https://picsum.photos/seed/photo4/400/400',
    price: 12000,
    sales: 312,
    rating: 4.7,
    reviews: 67,
    lastModified: '2024-01-28',
    status: 'active'
  },
  {
    id: 5,
    title: '아이소메트릭 아이콘 세트',
    thumbnail: 'https://picsum.photos/seed/iso5/400/400',
    price: 0,
    sales: 567,
    rating: 4.3,
    reviews: 89,
    lastModified: '2024-01-25',
    status: 'active'
  },
  {
    id: 6,
    title: '빈티지 포스터 스타일',
    thumbnail: 'https://picsum.photos/seed/vintage6/400/400',
    price: 18000,
    sales: 145,
    rating: 4.6,
    reviews: 41,
    lastModified: '2024-01-20',
    status: 'active'
  },
  {
    id: 7,
    title: '3D 캐릭터 모델링 프롬프트',
    thumbnail: 'https://picsum.photos/seed/3d7/400/400',
    price: 35000,
    sales: 78,
    rating: 4.9,
    reviews: 23,
    lastModified: '2024-01-15',
    status: 'active'
  },
  {
    id: 8,
    title: '애니메이션 배경 아트',
    thumbnail: 'https://picsum.photos/seed/anime8/400/400',
    price: 22000,
    sales: 201,
    rating: 4.8,
    reviews: 56,
    lastModified: '2024-01-10',
    status: 'active'
  },
]

function ContentCard({ content, index }) {
  const [showMenu, setShowMenu] = useState(false)
  
  return (
    <motion.div 
      className="content-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="card-thumbnail">
        <img src={content.thumbnail} alt={content.title} />
        <div className="card-overlay">
          <button className="overlay-btn">
            <Eye size={18} />
          </button>
          <button className="overlay-btn">
            <Edit2 size={18} />
          </button>
        </div>
        {content.price === 0 && <span className="free-badge">FREE</span>}
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{content.title}</h3>
        
        <div className="card-meta">
          <div className="meta-item">
            <DollarSign size={14} />
            <span>{content.price > 0 ? `₩${content.price.toLocaleString()}` : '무료'}</span>
          </div>
          <div className="meta-item">
            <Calendar size={14} />
            <span>{content.lastModified}</span>
          </div>
          <div className="meta-item">
            <ShoppingCart size={14} />
            <span>{content.sales}</span>
          </div>
        </div>
        
        <div className="card-footer">
          <div className="rating">
            <Star size={14} className="star-icon" />
            <span className="rating-value">{content.rating}</span>
            <span className="review-count">({content.reviews})</span>
          </div>
          
          <div className="card-actions">
            <button 
              className="action-btn"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical size={18} />
            </button>
            
            {showMenu && (
              <motion.div 
                className="action-menu"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <button className="menu-item">
                  <Edit2 size={14} />
                  수정하기
                </button>
                <button className="menu-item danger">
                  <Trash2 size={14} />
                  삭제하기
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ContentManagement() {
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContent, setSelectedContent] = useState(null)

  const filteredContents = sampleContents.filter(content =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="management-page">
      {/* Toolbar */}
      <motion.div 
        className="toolbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text"
              placeholder="컨텐츠 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button className="filter-btn">
            <Filter size={18} />
            필터
          </button>
        </div>
        
        <div className="toolbar-right">
          <span className="content-count">
            총 <strong>{filteredContents.length}</strong>개
          </span>
          
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className={`content-grid ${viewMode}`}>
        {filteredContents.map((content, index) => (
          <ContentCard 
            key={content.id} 
            content={content} 
            index={index}
          />
        ))}
      </div>

      {filteredContents.length === 0 && (
        <motion.div 
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>검색 결과가 없습니다</p>
        </motion.div>
      )}

      {/* Detail Panel Placeholder */}
      <div className="detail-hint">
        세부페이지 필요함
      </div>
    </div>
  )
}

export default ContentManagement
