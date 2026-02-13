import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Heart, Eye, Play, ChevronDown, Grid, List } from 'lucide-react'
import './PromptList.css'

const categories = ['전체', '캐릭터', '풍경', '로고', '인물', '아이콘', '포스터', '3D', '배경', '패턴']
const sortOptions = ['최신순', '인기순', '좋아요순', '가격 낮은순', '가격 높은순']

const paidPrompts = [
  { id: 2, title: '미니멀 로고 디자인', creator: 'design_master', price: 500, likes: 189, views: 980, model: 'DALL-E 3', category: '로고', image: 'https://picsum.photos/seed/paid1/400/400', purchased: false },
  { id: 3, title: '판타지 풍경 일러스트', creator: 'art_lover', price: 800, likes: 456, views: 2340, model: 'Stable Diffusion', category: '풍경', image: 'https://picsum.photos/seed/paid2/400/400', purchased: true },
  { id: 4, title: '포토리얼 인물 사진', creator: 'photo_pro', price: 1200, likes: 321, views: 1890, model: 'Midjourney', category: '인물', image: 'https://picsum.photos/seed/paid3/400/400', purchased: false },
  { id: 6, title: '빈티지 포스터 스타일', creator: 'retro_design', price: 600, likes: 234, views: 1450, model: 'Stable Diffusion', category: '포스터', image: 'https://picsum.photos/seed/paid4/400/400', purchased: false },
  { id: 7, title: '3D 캐릭터 모델링', creator: 'model_expert', price: 1500, likes: 412, views: 2100, model: 'Midjourney', category: '3D', image: 'https://picsum.photos/seed/paid5/400/400', purchased: true },
  { id: 9, title: '제품 목업 디자인', creator: 'mockup_pro', price: 900, likes: 345, views: 1780, model: 'DALL-E 3', category: '목업', image: 'https://picsum.photos/seed/paid6/400/400', purchased: false },
  { id: 10, title: '추상 아트 패턴', creator: 'abstract_art', price: 400, likes: 289, views: 1340, model: 'Midjourney', category: '패턴', image: 'https://picsum.photos/seed/paid7/400/400', purchased: false },
  { id: 12, title: '우주 테마 일러스트', creator: 'space_artist', price: 700, likes: 534, views: 2890, model: 'Stable Diffusion', category: '일러스트', image: 'https://picsum.photos/seed/paid8/400/400', purchased: false },
]

function PromptCard({ prompt }) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Link to={`/prompt/${prompt.id}`} className="list-prompt-card">
      <div className="list-card-image">
        <img src={prompt.image} alt={prompt.title} />
        <div className="list-card-overlay">
          <button className="list-overlay-btn play">
            <Play size={18} />
          </button>
          <button 
            className={`list-overlay-btn like ${isLiked ? 'liked' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
            }}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>
        <span className="list-price-badge paid">{prompt.price}C</span>
        <span className="list-model-badge">{prompt.model}</span>
      </div>
      <div className="list-card-content">
        <div className="list-card-creator">
          <img 
            src={`https://picsum.photos/seed/${prompt.creator}/24/24`} 
            alt={prompt.creator}
          />
          <span>@{prompt.creator}</span>
        </div>
        <h3 className="list-card-title">{prompt.title}</h3>
        <div className="list-card-footer">
          <div className="list-card-stats">
            <span><Heart size={12} /> {prompt.likes}</span>
            <span><Eye size={12} /> {prompt.views}</span>
          </div>
          {prompt.purchased && <span className="purchased-badge">구매함</span>}
        </div>
      </div>
    </Link>
  )
}

function PaidPrompts() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [sortBy, setSortBy] = useState('최신순')
  const [viewMode, setViewMode] = useState('grid')

  const filteredPrompts = paidPrompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === '전체' || prompt.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="prompt-list-page">
      <div className="list-container">
        <div className="list-header">
          <div className="list-toolbar">
            <div className="search-box">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="키워드 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="toolbar-right">
              <div className="sort-dropdown">
                <span>정렬</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  {sortOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown size={16} />
              </div>
              <div className="view-toggle">
                <button 
                  className={viewMode === 'grid' ? 'active' : ''}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </button>
                <button 
                  className={viewMode === 'list' ? 'active' : ''}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="category-filter">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={`list-prompts-grid ${viewMode}`}>
          {filteredPrompts.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="empty-state">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaidPrompts
