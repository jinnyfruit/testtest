import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Search, 
  Plus, 
  MessageCircle, 
  Sparkles,
  Eye
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

function RequestCard({ request }) {
  const navigate = useNavigate()
  const status = statusConfig[request.status]
  
  return (
    <article className="request-card" onClick={() => navigate(`/request/${request.id}`)}>
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

function PromptRequest() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

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
          <button className="create-btn" onClick={() => navigate('/request/write')}>
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

    </div>
  )
}

export default PromptRequest
