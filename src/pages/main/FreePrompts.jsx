import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal, Heart, Eye, Play, ChevronDown, Grid, List } from 'lucide-react'
import './PromptList.css'

const categories = ['전체', '캐릭터', '풍경', '로고', '인물', '아이콘', '포스터', '3D', '배경', '패턴']
const sortOptions = ['최신순', '인기순', '좋아요순']

const freePrompts = [
  { id: 1, title: '사이버펑크 네온 캐릭터', creator: 'creative_kim', likes: 234, views: 1520, model: 'Midjourney', category: '캐릭터', image: 'https://picsum.photos/seed/free1/400/400', purchased: false },
  { id: 5, title: '아이소메트릭 아이콘', creator: 'icon_maker', likes: 567, views: 3210, model: 'DALL-E 3', category: '아이콘', image: 'https://picsum.photos/seed/free2/400/400', purchased: true },
  { id: 8, title: '애니메이션 배경', creator: 'anime_art', likes: 678, views: 4500, model: 'Stable Diffusion', category: '배경', image: 'https://picsum.photos/seed/free3/400/400', purchased: false },
  { id: 11, title: '귀여운 동물 캐릭터', creator: 'cute_creator', likes: 892, views: 5670, model: 'DALL-E 3', category: '캐릭터', image: 'https://picsum.photos/seed/free4/400/400', purchased: true },
  { id: 13, title: '미니멀 UI 아이콘', creator: 'ui_designer', likes: 345, views: 2100, model: 'Midjourney', category: '아이콘', image: 'https://picsum.photos/seed/free5/400/400', purchased: false },
  { id: 14, title: '자연 풍경 사진', creator: 'nature_lover', likes: 456, views: 2890, model: 'Stable Diffusion', category: '풍경', image: 'https://picsum.photos/seed/free6/400/400', purchased: false },
  { id: 15, title: '레트로 게임 캐릭터', creator: 'pixel_artist', likes: 234, views: 1450, model: 'DALL-E 3', category: '캐릭터', image: 'https://picsum.photos/seed/free7/400/400', purchased: false },
  { id: 16, title: '플랫 일러스트 스타일', creator: 'flat_design', likes: 567, views: 3400, model: 'Midjourney', category: '일러스트', image: 'https://picsum.photos/seed/free8/400/400', purchased: true },
]

function PromptCard({ prompt, isFree = true }) {
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
        <span className="list-price-badge free">FREE</span>
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

function FreePrompts() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [sortBy, setSortBy] = useState('최신순')
  const [viewMode, setViewMode] = useState('grid')

  const filteredPrompts = freePrompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === '전체' || prompt.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="prompt-list-page">
      <div className="list-container">
        <div className="list-header">
          
          {/* Search & Sort */}
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

          {/* Categories */}
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

        {/* Prompts Grid */}
        <div className={`list-prompts-grid ${viewMode}`}>
          {filteredPrompts.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} isFree={true} />
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

export default FreePrompts
