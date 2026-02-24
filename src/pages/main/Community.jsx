import { useState, useRef } from 'react'
import { 
  Search, 
  Plus, 
  MessageCircle, 
  Eye,
  Clock,
  TrendingUp,
  X,
  Send,
  Image as ImageIcon,
  Bookmark,
  MoreHorizontal,
  ChevronRight,
  ArrowLeft,
  Share2,
  Flag,
  ThumbsUp,
  Upload,
  Trash2,
  Edit3,
  MoreVertical,
  Check
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
    isBookmarked: false,
    isMine: true
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
    isBookmarked: false,
    isMine: false
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
    isBookmarked: true,
    isMine: false
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
    isBookmarked: false,
    isMine: false
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
    isBookmarked: false,
    isMine: false
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
          
          <div className="post-stats">
            <button 
              className={`stat-btn like-btn ${liked ? 'active' : ''}`}
              onClick={handleLike}
            >
              <ThumbsUp size={15} fill={liked ? 'currentColor' : 'none'} />
              <span>{likeCount}</span>
            </button>
            <button className="stat-btn comment-btn">
              <MessageCircle size={15} />
              <span>{post.comments}</span>
            </button>
            <span className="stat-btn view-stat">
              <Eye size={15} />
              <span>{post.views}</span>
            </span>
            <button 
              className={`stat-btn bookmark-btn ${bookmarked ? 'active' : ''}`}
              onClick={handleBookmark}
            >
              <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} />
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

// ===== 전체화면 글쓰기 (프롬프트 요청 스타일) =====
function WritePage({ onBack, editPost }) {
  const [title, setTitle] = useState(editPost ? editPost.title : '')
  const [category, setCategory] = useState(editPost ? editPost.category : '')
  const [content, setContent] = useState(editPost ? editPost.content : '')
  const [images, setImages] = useState([])

  const handleImageUpload = () => {
    const fakeImages = [`https://picsum.photos/seed/${Date.now()}/200/200`]
    setImages([...images, ...fakeImages])
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(editPost ? '게시글이 수정되었습니다!' : '게시글이 등록되었습니다!')
    onBack()
  }

  return (
    <div className="comm-write-page">
      <div className="comm-write-wrapper">
        {/* Header */}
        <header className="comm-write-header">
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={20} />
            <span>목록으로</span>
          </button>
          <h1>{editPost ? '게시글 수정' : '새 글 작성'}</h1>
        </header>

        {/* Form */}
        <form className="comm-write-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-field">
              <label>카테고리 <span className="required">*</span></label>
              <div className="comm-cat-chips">
                {categories.slice(1).map(cat => (
                  <button
                    type="button"
                    key={cat}
                    className={`comm-cat-chip ${category === cat ? 'selected' : ''}`}
                    onClick={() => setCategory(cat === category ? '' : cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label>제목 <span className="required">*</span></label>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                className="field-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-field">
              <label>이미지 첨부</label>
              <p className="field-hint">게시글에 포함할 이미지를 업로드해주세요 (최대 5장)</p>
              <div className="comm-ref-upload-area">
                {images.map((img, idx) => (
                  <div key={idx} className="comm-ref-preview">
                    <img src={img} alt="" />
                    <button type="button" className="comm-ref-remove" onClick={() => removeImage(idx)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <button type="button" className="comm-ref-add-btn" onClick={handleImageUpload}>
                    <Upload size={24} />
                    <span>이미지 추가</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-field">
              <label>내용 <span className="required">*</span></label>
              <p className="field-hint">프롬프트 관련 팁, 질문, 결과물 등을 자유롭게 공유해주세요</p>
              <textarea
                className="field-textarea"
                placeholder="내용을 입력하세요..."
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="comm-write-footer">
            <button type="button" className="btn-cancel" onClick={onBack}>
              취소
            </button>
            <button type="submit" className="btn-submit">
              {editPost ? '수정 완료' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// 샘플 댓글 데이터
const initialComments = [
  {
    id: 1,
    parentId: null,
    author: 'user_1',
    avatar: 'https://picsum.photos/seed/comment1/100/100',
    content: '좋은 정보 감사합니다! 많은 도움이 됐어요.',
    createdAt: '1시간 전',
    likes: 5,
    isMine: true
  },
  {
    id: 2,
    parentId: 1,
    author: 'user_2',
    avatar: 'https://picsum.photos/seed/comment2/100/100',
    content: '@user_1 저도 이 방법 사용해봤는데 정말 효과적이에요!',
    createdAt: '3시간 전',
    likes: 3,
    isMine: false
  },
  {
    id: 5,
    parentId: 1,
    author: 'ai_fan_99',
    avatar: 'https://picsum.photos/seed/comment4/100/100',
    content: '@user_1 맞아요 진짜 유용한 정보네요!',
    createdAt: '2시간 전',
    likes: 1,
    isMine: true
  },
  {
    id: 3,
    parentId: null,
    author: 'prompt_lover',
    avatar: 'https://picsum.photos/seed/comment3/100/100',
    content: '혹시 이 프롬프트에서 네거티브 프롬프트도 사용하셨나요? 결과물이 정말 깔끔하네요.',
    createdAt: '5시간 전',
    likes: 8,
    isMine: false
  },
  {
    id: 4,
    parentId: null,
    author: 'ai_fan_99',
    avatar: 'https://picsum.photos/seed/comment4/100/100',
    content: '덕분에 좋은 결과물 뽑았습니다 ㅎㅎ 감사합니다!',
    createdAt: '8시간 전',
    likes: 2,
    isMine: true
  }
]

function CommentItem({
  comment, isReply, replyingTo, setReplyingTo, replyText, setReplyText,
  handleAddReply, editingCommentId, editCommentText, setEditCommentText,
  handleSaveEditComment, showCommentMenu, setShowCommentMenu,
  handleStartEditComment, handleDeleteComment
}) {
  return (
    <div className={`detail-comment ${isReply ? 'is-reply' : ''}`}>
      <img src={comment.avatar} alt="" className="comment-avatar" />
      <div className="comment-content">
        <div className="comment-top">
          <span className="comment-name">@{comment.author}</span>
          <span className="comment-date">{comment.createdAt}</span>
          {comment.isMine && (
            <div className="comment-menu-wrapper">
              <button 
                className="comment-menu-btn"
                onClick={() => setShowCommentMenu(showCommentMenu === comment.id ? null : comment.id)}
              >
                <MoreHorizontal size={14} />
              </button>
              {showCommentMenu === comment.id && (
                <div className="dropdown-menu comment-dropdown">
                  <button className="dropdown-item" onClick={() => handleStartEditComment(comment)}>
                    <Edit3 size={13} />
                    <span>수정</span>
                  </button>
                  <button className="dropdown-item danger" onClick={() => handleDeleteComment(comment.id)}>
                    <Trash2 size={13} />
                    <span>삭제</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {editingCommentId === comment.id ? (
          <div className="comment-edit-area">
            <input
              type="text"
              value={editCommentText}
              onChange={(e) => setEditCommentText(e.target.value)}
              className="comment-edit-input"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSaveEditComment(comment.id)
                }
              }}
            />
            <div className="comment-edit-actions">
              <button type="button" className="comment-edit-cancel" onClick={() => { setEditCommentText('') }}>
                취소
              </button>
              <button type="button" className="comment-edit-save" onClick={() => handleSaveEditComment(comment.id)}>
                <Check size={14} />
                저장
              </button>
            </div>
          </div>
        ) : (
          <p className="comment-text">{comment.content}</p>
        )}

        <div className="comment-actions">
          <button className="comment-like-btn">
            <ThumbsUp size={14} />
            <span>{comment.likes}</span>
          </button>
          <button 
            className={`comment-reply-btn ${replyingTo === comment.id ? 'active' : ''}`}
            onClick={() => {
              if (replyingTo === comment.id) {
                setReplyingTo(null)
                setReplyText('')
              } else {
                setReplyingTo(comment.id)
                setReplyText('')
              }
            }}
          >
            답글
          </button>
        </div>
        
        {/* Reply input */}
        {replyingTo === comment.id && (
          <div className="reply-input-area">
            <img src="https://picsum.photos/seed/myavatar/100/100" alt="" className="reply-avatar" />
            <div className="reply-input-wrap">
              <input 
                type="text" 
                placeholder={`@${comment.author}에게 답글...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddReply(comment)
                  }
                }}
                autoFocus
              />
              <div className="reply-input-actions">
                <button 
                  type="button"
                  className="reply-cancel-btn"
                  onClick={() => {
                    setReplyingTo(null)
                    setReplyText('')
                  }}
                >
                  취소
                </button>
                <button 
                  type="button"
                  className="reply-send-btn" 
                  disabled={!replyText.trim()}
                  onClick={() => handleAddReply(comment)}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function PostDetail({ post, onBack, onEdit, onDelete }) {
  const [liked, setLiked] = useState(post.isLiked)
  const [bookmarked, setBookmarked] = useState(post.isBookmarked)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [commentText, setCommentText] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [showPostMenu, setShowPostMenu] = useState(false)
  const [comments, setComments] = useState(initialComments)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editCommentText, setEditCommentText] = useState('')
  const [showCommentMenu, setShowCommentMenu] = useState(null)

  const handleAddReply = (parentComment) => {
    const text = replyText.trim()
    if (!text) return
    // parentId는 최상위 부모를 가리킴 (대대댓글도 같은 부모 아래 표시)
    const rootParentId = parentComment.parentId || parentComment.id
    const newReply = {
      id: Date.now(),
      parentId: rootParentId,
      author: 'me',
      avatar: 'https://picsum.photos/seed/myavatar/100/100',
      content: `@${parentComment.author} ${text}`,
      createdAt: '방금 전',
      likes: 0,
      isMine: true
    }
    setComments(prev => [...prev, newReply])
    setReplyingTo(null)
    setReplyText('')
  }

  const handleDeletePost = () => {
    if (window.confirm('이 게시글을 삭제하시겠습니까?')) {
      onDelete(post.id)
    }
    setShowPostMenu(false)
  }

  const handleEditPost = () => {
    onEdit(post)
    setShowPostMenu(false)
  }

  const handleDeleteComment = (commentId) => {
    if (window.confirm('이 댓글을 삭제하시겠습니까?')) {
      setComments(prev => prev.filter(c => c.id !== commentId))
    }
    setShowCommentMenu(null)
  }

  const handleStartEditComment = (comment) => {
    setEditingCommentId(comment.id)
    setEditCommentText(comment.content)
    setShowCommentMenu(null)
  }

  const handleSaveEditComment = (commentId) => {
    if (!editCommentText.trim()) return
    setComments(prev => prev.map(c => 
      c.id === commentId ? { ...c, content: editCommentText } : c
    ))
    setEditingCommentId(null)
    setEditCommentText('')
  }

  const handleAddComment = () => {
    const text = commentText.trim()
    if (!text) return
    const newComment = {
      id: Date.now(),
      parentId: null,
      author: 'me',
      avatar: 'https://picsum.photos/seed/myavatar/100/100',
      content: text,
      createdAt: '방금 전',
      likes: 0,
      isMine: true
    }
    setComments(prev => [newComment, ...prev])
    setCommentText('')
  }

  return (
    <div className="detail-page">
      {/* Top bar */}
      <div className="detail-topbar">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>목록으로</span>
        </button>
        <div className="topbar-actions">
          <button className="topbar-btn">
            <Share2 size={18} />
          </button>
          {post.isMine ? (
            <div className="post-menu-wrapper">
              <button className="topbar-btn" onClick={() => setShowPostMenu(!showPostMenu)}>
                <MoreVertical size={18} />
              </button>
              {showPostMenu && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={handleEditPost}>
                    <Edit3 size={14} />
                    <span>수정</span>
                  </button>
                  <button className="dropdown-item danger" onClick={handleDeletePost}>
                    <Trash2 size={14} />
                    <span>삭제</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="topbar-btn">
              <Flag size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="detail-layout">
        {/* Main content area */}
        <article className="detail-article">
          {/* Category & Date */}
          <div className="detail-meta">
            <span className={`post-cat ${categoryColors[post.category] || ''}`}>{post.category}</span>
            <span className="detail-date">{post.createdAt}</span>
          </div>

          {/* Title */}
          <h1 className="detail-title">{post.title}</h1>

          {/* Author row */}
          <div className="detail-author-row">
            <div className="detail-author-info">
              <img src={post.authorAvatar} alt="" className="detail-avatar" />
              <div>
                <span className="detail-author-name">@{post.author}</span>
                <span className="detail-author-sub">프롬프트 크리에이터</span>
              </div>
            </div>
            {!post.isMine && <button className="follow-btn">팔로우</button>}
          </div>

          {/* Image */}
          {post.thumbnail && (
            <div className="detail-image-wrap">
              <img src={post.thumbnail} alt="" />
            </div>
          )}

          {/* Body text */}
          <div className="detail-body">
            <p>{post.content}</p>
            <p>
              이 글에서는 다양한 프롬프트 기법들을 실제 예시와 함께 설명드리겠습니다. 
              각 기법의 장단점을 비교하고, 어떤 상황에서 어떤 프롬프트를 사용해야 하는지 
              자세히 알아보겠습니다.
            </p>
            <p>
              특히 초보자분들이 자주 실수하는 부분들을 집중적으로 다루고 있으니, 
              AI 이미지 생성을 시작하신 지 얼마 안 되신 분들에게 많은 도움이 될 거예요.
              궁금한 점이 있으면 댓글로 자유롭게 질문해주세요!
            </p>
          </div>

          {/* Action bar */}
          <div className="detail-action-bar">
            <div className="detail-action-left">
              <button 
                className={`detail-action-btn like ${liked ? 'active' : ''}`}
                onClick={() => {
                  setLiked(!liked)
                  setLikeCount(liked ? likeCount - 1 : likeCount + 1)
                }}
              >
                <ThumbsUp size={20} fill={liked ? 'currentColor' : 'none'} />
                <span>좋아요 {likeCount}</span>
              </button>
              <button className="detail-action-btn">
                <MessageCircle size={20} />
                <span>댓글 {comments.length}</span>
              </button>
              <button 
                className={`detail-action-btn bookmark ${bookmarked ? 'active' : ''}`}
                onClick={() => setBookmarked(!bookmarked)}
              >
                <Bookmark size={20} fill={bookmarked ? 'currentColor' : 'none'} />
                <span>저장</span>
              </button>
            </div>
            <span className="detail-views">
              <Eye size={16} />
              조회 {post.views.toLocaleString()}
            </span>
          </div>

          {/* Comments section */}
          <div className="detail-comments">
            <h3 className="comments-title">댓글 {comments.length}개</h3>
            
            {/* Comment input */}
            <div className="detail-comment-input">
              <img src="https://picsum.photos/seed/myavatar/100/100" alt="" />
              <div className="comment-input-wrap">
                <input 
                  type="text" 
                  placeholder="댓글을 입력하세요..." 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddComment()
                    }
                  }}
                />
                <button 
                  type="button"
                  className="comment-send-btn" 
                  disabled={!commentText.trim()}
                  onClick={handleAddComment}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>

            {/* Comments list */}
            <div className="detail-comments-list">
              {comments.filter(c => !c.parentId).map(comment => {
                const replies = comments.filter(c => c.parentId === comment.id)
                return (
                  <div key={comment.id} className="comment-thread">
                    {/* 부모 댓글 */}
                    <CommentItem
                      comment={comment}
                      isReply={false}
                      replyingTo={replyingTo}
                      setReplyingTo={setReplyingTo}
                      replyText={replyText}
                      setReplyText={setReplyText}
                      handleAddReply={handleAddReply}
                      editingCommentId={editingCommentId}
                      editCommentText={editCommentText}
                      setEditCommentText={setEditCommentText}
                      handleSaveEditComment={handleSaveEditComment}
                      showCommentMenu={showCommentMenu}
                      setShowCommentMenu={setShowCommentMenu}
                      handleStartEditComment={handleStartEditComment}
                      handleDeleteComment={handleDeleteComment}
                    />
                    {/* 대댓글 목록 */}
                    {replies.length > 0 && (
                      <div className="comment-replies">
                        {replies.map(reply => (
                          <CommentItem
                            key={reply.id}
                            comment={reply}
                            isReply={true}
                            replyingTo={replyingTo}
                            setReplyingTo={setReplyingTo}
                            replyText={replyText}
                            setReplyText={setReplyText}
                            handleAddReply={handleAddReply}
                            editingCommentId={editingCommentId}
                            editCommentText={editCommentText}
                            setEditCommentText={setEditCommentText}
                            handleSaveEditComment={handleSaveEditComment}
                            showCommentMenu={showCommentMenu}
                            setShowCommentMenu={setShowCommentMenu}
                            handleStartEditComment={handleStartEditComment}
                            handleDeleteComment={handleDeleteComment}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

function Community() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [sortBy, setSortBy] = useState('latest')
  const [currentView, setCurrentView] = useState('list') // 'list' | 'detail' | 'write'
  const [selectedPost, setSelectedPost] = useState(null)
  const [editPost, setEditPost] = useState(null)
  const [posts, setPosts] = useState(postsData)

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleOpenPost = (post) => {
    setSelectedPost(post)
    setCurrentView('detail')
  }

  const handleBack = () => {
    setCurrentView('list')
    setSelectedPost(null)
    setEditPost(null)
  }

  const handleOpenWrite = () => {
    setEditPost(null)
    setCurrentView('write')
  }

  const handleEditPost = (post) => {
    setEditPost(post)
    setCurrentView('write')
  }

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(p => p.id !== postId))
    setCurrentView('list')
    setSelectedPost(null)
  }

  // 게시글 상세 보기
  if (currentView === 'detail' && selectedPost) {
    return (
      <PostDetail 
        post={selectedPost} 
        onBack={handleBack} 
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
      />
    )
  }

  // 글쓰기 / 수정
  if (currentView === 'write') {
    return (
      <WritePage 
        onBack={handleBack} 
        editPost={editPost}
      />
    )
  }

  return (
    <div className="community-page">
      <div className="community-wrapper">
        {/* Header */}
        <header className="page-header">
          <div className="header-content">
            <h1>커뮤니티</h1>
            <p>프롬프트 관련 정보를 공유하고 소통하세요</p>
          </div>
          <button className="write-btn" onClick={handleOpenWrite}>
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
              onClick={() => handleOpenPost(post)}
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
    </div>
  )
}

export default Community
