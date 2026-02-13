import { useState } from 'react'
import { 
  Search, 
  Plus, 
  MessageCircle, 
  Heart,
  Eye,
  Clock,
  TrendingUp,
  X,
  Send,
  Image as ImageIcon,
  Bookmark,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react'
import './Community.css'

// 샘플 게시글 데이터
const postsData = [
  {
    id: 1,
    title: 'Midjourney v6 팁 공유합니다!',
    content: '최근 Midjourney v6가 업데이트되면서 많은 분들이 헷갈려하시는 것 같아서 제가 사용하면서 알게 된 팁들을 공유합니다. 특히 --stylize 파라미터 활용법이 많이 바뀌었어요.',
    author: 'mj_master',
    authorAvatar: 'https://picsum.photos/seed/mj_master/100/100',
    createdAt: '30분 전',
    likes: 45,
    comments: 12,
    views: 234,
    category: 'Q&A',
    thumbnail: 'https://picsum.photos/seed/post1/400/300',
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 2,
    title: '이번에 만든 프롬프트 결과물 공유해요',
    content: '사이버펑크 스타일 캐릭터 프롬프트로 생성한 결과물입니다. 여러분의 피드백 부탁드려요!',
    author: 'creative_kim',
    authorAvatar: 'https://picsum.photos/seed/creative_kim/100/100',
    createdAt: '2시간 전',
    likes: 89,
    comments: 23,
    views: 567,
    category: '자랑',
    thumbnail: 'https://picsum.photos/seed/post2/400/300',
    isLiked: true,
    isBookmarked: false
  },
  {
    id: 3,
    title: 'DALL-E 3 vs Midjourney 비교 분석',
    content: '같은 프롬프트로 두 모델의 결과물을 비교해봤습니다. 각 모델의 장단점을 정리했으니 참고하세요.',
    author: 'ai_researcher',
    authorAvatar: 'https://picsum.photos/seed/ai_researcher/100/100',
    createdAt: '5시간 전',
    likes: 156,
    comments: 45,
    views: 1234,
    category: '정보',
    thumbnail: 'https://picsum.photos/seed/post3/400/300',
    isLiked: false,
    isBookmarked: true
  },
  {
    id: 4,
    title: '초보자를 위한 프롬프트 작성 가이드',
    content: 'AI 이미지 생성을 처음 시작하시는 분들을 위한 기초 가이드입니다. 프롬프트 구조부터 차근차근 설명드릴게요.',
    author: 'prompt_teacher',
    authorAvatar: 'https://picsum.photos/seed/prompt_teacher/100/100',
    createdAt: '1일 전',
    likes: 234,
    comments: 67,
    views: 2345,
    category: '정보',
    thumbnail: null,
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 5,
    title: '로고 디자인 프롬프트 질문이요',
    content: '미니멀한 로고를 만들고 싶은데 자꾸 너무 복잡하게 나와요. 어떤 키워드를 추가해야 할까요?',
    author: 'design_newbie',
    authorAvatar: 'https://picsum.photos/seed/design_newbie/100/100',
    createdAt: '1일 전',
    likes: 12,
    comments: 8,
    views: 189,
    category: 'Q&A',
    thumbnail: null,
    isLiked: false,
    isBookmarked: false
  },
]

const categories = ['전체', 'Q&A', '정보', '자랑', '토론']

const categoryColors = {
  'Q&A': 'cat-qa',
  '정보': 'cat-info',
  '자랑': 'cat-showcase',
  '토론': 'cat-discuss'
}

function PostCard({ post, onClick }) {
  const [liked, setLiked] = useState(post.isLiked)
  const [bookmarked, setBookmarked] = useState(post.isBookmarked)
  const [likeCount, setLikeCount] = useState(post.likes)
  
  const handleLike = (e) => {
    e.stopPropagation()
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }
  
  const handleBookmark = (e) => {
    e.stopPropagation()
    setBookmarked(!bookmarked)
  }

  return (
    <article className="post-card" onClick={onClick}>
      <div className="post-main">
        <header className="post-head">
          <span className={`post-cat ${categoryColors[post.category] || ''}`}>{post.category}</span>
          <span className="post-date">{post.createdAt}</span>
        </header>
        
        <h3 className="post-title">{post.title}</h3>
        <p className="post-excerpt">{post.content}</p>
        
        <footer className="post-foot">
          <div className="post-author" onClick={(e) => e.stopPropagation()}>
            <img src={post.authorAvatar} alt="" />
            <span>@{post.author}</span>
          </div>
          
          <div className="post-actions">
            <button 
              className={`action-btn ${liked ? 'active' : ''}`}
              onClick={handleLike}
            >
              <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
              <span>{likeCount}</span>
            </button>
            <button className="action-btn">
              <MessageCircle size={16} />
              <span>{post.comments}</span>
            </button>
            <button 
              className={`action-btn bookmark ${bookmarked ? 'active' : ''}`}
              onClick={handleBookmark}
            >
              <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </footer>
      </div>
      
      {post.thumbnail && (
        <div className="post-thumb">
          <img src={post.thumbnail} alt="" />
        </div>
      )}
    </article>
  )
}

function WriteModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <header className="modal-head">
          <h2>새 글 작성</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </header>
        
        <div className="modal-content">
          <div className="form-field">
            <label>카테고리</label>
            <div className="cat-select">
              {categories.slice(1).map(cat => (
                <button key={cat} className="cat-option">
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="form-field">
            <label>제목</label>
            <input type="text" placeholder="제목을 입력하세요" className="field-input" />
          </div>
          
          <div className="form-field">
            <label>내용</label>
            <textarea 
              placeholder="내용을 입력하세요" 
              className="field-textarea"
              rows={6}
            />
          </div>
          
          <div className="form-field">
            <label>이미지 첨부</label>
            <div className="img-upload">
              <ImageIcon size={24} />
              <span>클릭하여 이미지 업로드</span>
            </div>
          </div>
        </div>
        
        <footer className="modal-foot">
          <button className="btn-cancel" onClick={onClose}>취소</button>
          <button className="btn-submit">등록하기</button>
        </footer>
      </div>
    </div>
  )
}

function DetailModal({ post, onClose }) {
  const [liked, setLiked] = useState(post.isLiked)
  const [likeCount, setLikeCount] = useState(post.likes)
  
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="detail-box" onClick={e => e.stopPropagation()}>
        <header className="detail-head">
          <span className={`post-cat ${categoryColors[post.category] || ''}`}>{post.category}</span>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </header>
        
        <div className="detail-content">
          <h2 className="detail-title">{post.title}</h2>
          
          <div className="detail-author">
            <img src={post.authorAvatar} alt="" />
            <div className="author-info">
              <span className="author-name">@{post.author}</span>
              <span className="post-date">{post.createdAt}</span>
            </div>
            <button className="follow-btn">팔로우</button>
          </div>
          
          {post.thumbnail && (
            <div className="detail-image">
              <img src={post.thumbnail} alt="" />
            </div>
          )}
          
          <p className="detail-text">{post.content}</p>
          
          <div className="detail-actions">
            <button 
              className={`action-btn large ${liked ? 'active' : ''}`}
              onClick={() => {
                setLiked(!liked)
                setLikeCount(liked ? likeCount - 1 : likeCount + 1)
              }}
            >
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              <span>{likeCount}</span>
            </button>
            <span className="view-count">
              <Eye size={18} />
              {post.views}
            </span>
          </div>
          
          <div className="comments-section">
            <h4>댓글 {post.comments}개</h4>
            
            <div className="comments-list">
              <div className="comment-item">
                <img src="https://picsum.photos/seed/comment1/100/100" alt="" />
                <div className="comment-body">
                  <div className="comment-head">
                    <span className="comment-author">@user_1</span>
                    <span className="comment-time">1시간 전</span>
                  </div>
                  <p>좋은 정보 감사합니다! 많은 도움이 됐어요.</p>
                </div>
              </div>
              <div className="comment-item">
                <img src="https://picsum.photos/seed/comment2/100/100" alt="" />
                <div className="comment-body">
                  <div className="comment-head">
                    <span className="comment-author">@user_2</span>
                    <span className="comment-time">3시간 전</span>
                  </div>
                  <p>저도 이 방법 사용해봤는데 정말 효과적이에요!</p>
                </div>
              </div>
            </div>
            
            <div className="comment-input">
              <input type="text" placeholder="댓글을 입력하세요" />
              <button className="send-btn">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Community() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [sortBy, setSortBy] = useState('latest')
  const [showWriteModal, setShowWriteModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(null)

  const filteredPosts = postsData.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="community-page">
      <div className="community-wrapper">
        {/* Header */}
        <header className="page-header">
          <div className="header-content">
            <h1>커뮤니티</h1>
            <p>프롬프트 관련 정보를 공유하고 소통하세요</p>
          </div>
          <button className="write-btn" onClick={() => setShowWriteModal(true)}>
            <Plus size={18} />
            글쓰기
          </button>
        </header>

        {/* Controls */}
        <div className="controls-bar">
          <div className="search-field">
            <Search size={18} />
            <input 
              type="text"
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="sort-group">
            <button 
              className={`sort-btn ${sortBy === 'latest' ? 'active' : ''}`}
              onClick={() => setSortBy('latest')}
            >
              <Clock size={14} />
              최신순
            </button>
            <button 
              className={`sort-btn ${sortBy === 'popular' ? 'active' : ''}`}
              onClick={() => setSortBy('popular')}
            >
              <TrendingUp size={14} />
              인기순
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="cat-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="posts-list">
          {filteredPosts.map(post => (
            <PostCard 
              key={post.id} 
              post={post}
              onClick={() => setShowDetailModal(post)}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="empty-state">
            <MessageCircle size={48} />
            <p>게시글이 없습니다</p>
          </div>
        )}
      </div>

      {showWriteModal && <WriteModal onClose={() => setShowWriteModal(false)} />}
      {showDetailModal && <DetailModal post={showDetailModal} onClose={() => setShowDetailModal(null)} />}
    </div>
  )
}

export default Community
