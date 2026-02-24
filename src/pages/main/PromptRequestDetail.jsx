import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft,
  CheckCircle,
  X,
  Send,
  Eye,
  Award,
  Share2,
  Edit3,
  Trash2,
  MoreHorizontal,
  ThumbsUp,
  Check
} from 'lucide-react'
import './PromptRequestDetail.css'

// 현재 로그인한 사용자 (실제로는 인증 시스템에서 가져옴)
const currentUser = {
  username: 'startup_founder',
  isCreator: false
}

// 샘플 요청 데이터
const requestsData = [
  {
    id: 1,
    title: '미니멀 로고 디자인 프롬프트 요청',
    description: '스타트업 로고에 사용할 미니멀한 스타일의 로고 프롬프트가 필요합니다. 심플하면서도 기억에 남는 디자인으로 부탁드립니다. 주로 테크 스타트업 느낌의 깔끔한 로고를 원하며, 다양한 배경에서도 잘 보이는 디자인이면 좋겠습니다.',
    author: 'startup_founder',
    authorAvatar: 'https://picsum.photos/seed/startup/100/100',
    createdAt: '2시간 전',
    status: 'open',
    replies: 3,
    views: 128,
    category: '로고',
    preferredModel: 'Midjourney',
    referenceImages: ['https://picsum.photos/seed/ref1/400/400', 'https://picsum.photos/seed/ref2/400/400']
  },
  {
    id: 2,
    title: '게임 캐릭터 일러스트 프롬프트',
    description: '판타지 RPG 게임에 사용할 캐릭터 일러스트 프롬프트를 찾고 있습니다. 전사, 마법사, 궁수 등 다양한 직업군 캐릭터가 필요합니다. 애니메이션 스타일보다는 좀 더 리얼리스틱한 느낌을 원합니다.',
    author: 'game_developer',
    authorAvatar: 'https://picsum.photos/seed/gamedev/100/100',
    createdAt: '5시간 전',
    status: 'open',
    replies: 7,
    views: 342,
    category: '캐릭터',
    preferredModel: 'Stable Diffusion',
    referenceImages: ['https://picsum.photos/seed/game1/400/400', 'https://picsum.photos/seed/game2/400/400', 'https://picsum.photos/seed/game3/400/400']
  },
  {
    id: 3,
    title: '제품 목업 이미지 프롬프트',
    description: '화장품 브랜드 제품 목업 이미지를 생성할 수 있는 프롬프트가 필요합니다. 고급스러운 느낌으로 부탁드립니다. 대리석 배경이나 자연광이 들어오는 느낌의 세팅을 선호합니다.',
    author: 'beauty_brand',
    authorAvatar: 'https://picsum.photos/seed/beauty/100/100',
    createdAt: '1일 전',
    status: 'in_progress',
    replies: 5,
    views: 256,
    category: '목업',
    preferredModel: 'DALL-E 3',
    referenceImages: ['https://picsum.photos/seed/beauty1/400/400']
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

// 댓글 컴포넌트 (커뮤니티 스타일)
function ReplyCard({ reply, isReply, isOwner, onEdit, onDelete, onSelect, showSelectButton, replyingToId, onStartReply, onSubmitReply, onCancelReply, replyText, setReplyText }) {
  const [showMenu, setShowMenu] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(reply.content)
  const isMyReply = currentUser.username === reply.author

  const handleEdit = () => {
    setIsEditing(true)
    setShowMenu(false)
  }

  const handleSaveEdit = () => {
    onEdit(reply.id, editText)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditText(reply.content)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      onDelete(reply.id)
    }
    setShowMenu(false)
  }

  return (
    <div className={`detail-comment ${isReply ? 'is-reply' : ''} ${reply.isSelected ? 'selected' : ''}`}>
      {reply.isSelected && (
        <div className="selected-badge">
          <Award size={12} />
          채택됨
        </div>
      )}
      <img src={reply.avatar} alt="" className="comment-avatar" />
      <div className="comment-content">
        <div className="comment-top">
          <span className="comment-name">@{reply.author}</span>
          {reply.isCreator && <span className="creator-badge">Creator</span>}
          <span className="comment-date">{reply.time}</span>
          {isMyReply && (
            <div className="comment-menu-wrapper">
              <button 
                className="comment-menu-btn"
                onClick={() => setShowMenu(!showMenu)}
              >
                <MoreHorizontal size={14} />
              </button>
              {showMenu && (
                <div className="dropdown-menu comment-dropdown">
                  <button className="dropdown-item" onClick={handleEdit}>
                    <Edit3 size={13} />
                    <span>수정</span>
                  </button>
                  <button className="dropdown-item danger" onClick={handleDelete}>
                    <Trash2 size={13} />
                    <span>삭제</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="comment-edit-area">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="comment-edit-input"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSaveEdit()
                }
              }}
            />
            <div className="comment-edit-actions">
              <button type="button" className="comment-edit-cancel" onClick={handleCancelEdit}>
                취소
              </button>
              <button type="button" className="comment-edit-save" onClick={handleSaveEdit}>
                <Check size={14} />
                저장
              </button>
            </div>
          </div>
        ) : (
          <p className="comment-text">{reply.content}</p>
        )}

        {reply.promptPreview && !isEditing && (
          <button 
            className="reply-preview"
            onClick={() => reply.onPreview && reply.onPreview(reply.promptPreview)}
          >
            <img src={reply.promptPreview} alt="" />
            <div className="preview-overlay">
              <Eye size={16} />
              <span>미리보기</span>
            </div>
          </button>
        )}

        {!isEditing && (
          <div className="comment-actions">
            <button type="button" className="comment-like-btn">
              <ThumbsUp size={14} />
              <span>{reply.likes || 0}</span>
            </button>
            <button 
              type="button"
              className={`comment-reply-btn ${replyingToId === reply.id ? 'active' : ''}`}
              onClick={() => onStartReply(reply.id)}
            >
              답글
            </button>
            {showSelectButton && !reply.isSelected && (
              <button type="button" className="comment-accept-btn" onClick={() => onSelect(reply.id)}>
                <CheckCircle size={14} />
                <span>채택</span>
              </button>
            )}
          </div>
        )}

        {/* 답글 입력 */}
        {replyingToId === reply.id && (
          <div className="reply-input-area">
            <img src="https://picsum.photos/seed/startup/100/100" alt="" className="reply-avatar" />
            <div className="reply-input-wrap">
              <input 
                type="text" 
                placeholder={`@${reply.author}에게 답글...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    onSubmitReply(reply.id, replyText)
                  }
                }}
                autoFocus
              />
              <div className="reply-input-actions">
                <button 
                  type="button"
                  className="reply-cancel-btn"
                  onClick={onCancelReply}
                >
                  취소
                </button>
                <button 
                  type="button"
                  className="reply-send-btn" 
                  disabled={!replyText?.trim()}
                  onClick={() => onSubmitReply(reply.id, replyText)}
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

function PromptRequestDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [replyText, setReplyText] = useState('')
  const [inlineReplyText, setInlineReplyText] = useState('')
  const [previewImage, setPreviewImage] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [replyingTo, setReplyingTo] = useState(null)
  const [replies, setReplies] = useState([
    {
      id: 1,
      author: 'pro_creator',
      avatar: 'https://picsum.photos/seed/creator1/100/100',
      isCreator: true,
      content: '안녕하세요! 요청하신 스타일의 프롬프트 제작 가능합니다. 아래 샘플 결과물 확인해주세요. 추가적인 수정 요청도 반영 가능합니다.',
      promptPreview: 'https://picsum.photos/seed/sample1/400/400',
      time: '1시간 전',
      isSelected: false,
      parentId: null,
      childReplies: []
    },
    {
      id: 2,
      author: 'design_master',
      avatar: 'https://picsum.photos/seed/creator2/100/100',
      isCreator: true,
      content: '비슷한 스타일의 프롬프트를 보유하고 있습니다. 결과물 미리보기 첨부합니다! 원하시는 방향으로 커스터마이징도 가능해요.',
      promptPreview: 'https://picsum.photos/seed/sample2/400/400',
      time: '3시간 전',
      isSelected: true,
      parentId: null,
      childReplies: [
        {
          id: 21,
          author: 'startup_founder',
          avatar: 'https://picsum.photos/seed/startup/100/100',
          isCreator: false,
          content: '감사합니다! 이 스타일이 딱 제가 원하던 거예요.',
          promptPreview: null,
          time: '2시간 전',
          isSelected: false,
          parentId: 2
        }
      ]
    },
    {
      id: 3,
      author: 'art_lover',
      avatar: 'https://picsum.photos/seed/creator3/100/100',
      isCreator: true,
      content: '흥미로운 요청이네요. 제 포트폴리오 확인해보시고 연락주세요! 다양한 스타일 작업이 가능합니다.',
      promptPreview: null,
      time: '5시간 전',
      isSelected: false,
      parentId: null,
      childReplies: []
    }
  ])
  
  const request = requestsData.find(r => r.id === parseInt(id))
  
  if (!request) {
    return (
      <div className="request-detail-page">
        <div className="detail-wrapper">
          <div className="not-found">
            <h2>요청을 찾을 수 없습니다</h2>
            <Link to="/request" className="back-link">목록으로 돌아가기</Link>
          </div>
        </div>
      </div>
    )
  }
  
  const status = statusConfig[request.status]
  const isOwner = currentUser.username === request.author

  const handleEdit = () => {
    navigate(`/request/edit/${id}`)
  }

  const handleDelete = () => {
    alert('글이 삭제되었습니다.')
    navigate('/request')
  }

  const handleEditReply = (replyId, newContent) => {
    setReplies(prev => prev.map(reply => {
      if (reply.id === replyId) {
        return { ...reply, content: newContent }
      }
      if (reply.childReplies) {
        return {
          ...reply,
          childReplies: reply.childReplies.map(child => 
            child.id === replyId ? { ...child, content: newContent } : child
          )
        }
      }
      return reply
    }))
  }

  const handleDeleteReply = (replyId) => {
    setReplies(prev => prev.filter(reply => {
      if (reply.id === replyId) return false
      if (reply.childReplies) {
        reply.childReplies = reply.childReplies.filter(child => child.id !== replyId)
      }
      return true
    }))
  }

  const handleSelectReply = (replyId) => {
    setReplies(prev => prev.map(reply => ({
      ...reply,
      isSelected: reply.id === replyId
    })))
  }

  // 답글 시작 (인라인)
  const handleStartReply = (replyId) => {
    setReplyingTo(replyId === replyingTo ? null : replyId)
  }

  // 인라인 답글 제출
  const handleInlineSubmitReply = (parentId, text) => {
    if (!text?.trim()) return
    const newReply = {
      id: Date.now(),
      author: currentUser.username,
      avatar: 'https://picsum.photos/seed/startup/100/100',
      isCreator: currentUser.isCreator,
      content: `@${replies.find(r => r.id === parentId)?.author || ''} ${text}`,
      promptPreview: null,
      time: '방금 전',
      isSelected: false,
      parentId: parentId,
      likes: 0
    }

    setReplies(prev => prev.map(reply => {
      if (reply.id === parentId) {
        return {
          ...reply,
          childReplies: [...(reply.childReplies || []), newReply]
        }
      }
      return reply
    }))

    setReplyingTo(null)
    setInlineReplyText('')
  }

  // 하단 댓글 입력 (새 댓글)
  const handleSubmitNewReply = () => {
    if (!replyText.trim()) return

    const newReply = {
      id: Date.now(),
      author: currentUser.username,
      avatar: 'https://picsum.photos/seed/startup/100/100',
      isCreator: currentUser.isCreator,
      content: replyText,
      promptPreview: null,
      time: '방금 전',
      isSelected: false,
      parentId: null,
      childReplies: []
    }

    setReplies(prev => [...prev, newReply])
    setReplyText('')
  }

  return (
    <div className="request-detail-page">
      <div className="detail-wrapper">
        {/* Header */}
        <header className="detail-header">
          <button className="back-btn" onClick={() => navigate('/request')}>
            <ArrowLeft size={20} />
            <span>목록으로</span>
          </button>
          <div className="header-actions">
            {isOwner && (
              <>
                <button className="action-icon-btn" onClick={handleEdit} title="수정">
                  <Edit3 size={18} />
                </button>
                <button className="action-icon-btn delete" onClick={() => setShowDeleteModal(true)} title="삭제">
                  <Trash2 size={18} />
                </button>
              </>
            )}
            <button className="action-icon-btn">
              <Share2 size={18} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="detail-content">
          {/* Request Info */}
          <div className="detail-main">
            <div className="detail-top">
              <span className={`status-tag ${status.className}`}>{status.label}</span>
              <span className="detail-time">{request.createdAt}</span>
            </div>
            
            <h1 className="detail-title">{request.title}</h1>
            
            <div className="detail-author">
              <img src={request.authorAvatar} alt="" />
              <div className="author-info">
                <span className="author-name">@{request.author}</span>
                <span className="post-time">{request.createdAt} · 조회 {request.views}</span>
              </div>
            </div>
            
            <div className="detail-desc">
              <p>{request.description}</p>
            </div>
            
            <div className="detail-info-grid">
              <div className="info-card">
                <span className="info-label">선호 AI 모델</span>
                <span className="info-value">{request.preferredModel}</span>
              </div>
              <div className="info-card">
                <span className="info-label">카테고리</span>
                <span className="info-value">{request.category}</span>
              </div>
            </div>
            
            {request.referenceImages.length > 0 && (
              <div className="detail-refs">
                <h3>레퍼런스 이미지</h3>
                <div className="refs-grid">
                  {request.referenceImages.map((img, idx) => (
                    <button 
                      key={idx} 
                      className="ref-item"
                      onClick={() => setPreviewImage(img)}
                    >
                      <img src={img} alt="" />
                      <div className="ref-overlay">
                        <Eye size={20} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Replies - 커뮤니티 스타일 */}
          <div className="detail-comments-section">
            <div className="detail-comments">
              <h3 className="comments-title">크리에이터 제안 {replies.length}개</h3>
              
              {/* 새 댓글 입력 */}
              <div className="detail-comment-input">
                <img src="https://picsum.photos/seed/startup/100/100" alt="" />
                <div className="comment-input-wrap">
                  <input 
                    type="text" 
                    placeholder="댓글을 입력하세요..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleSubmitNewReply()
                      }
                    }}
                  />
                  <button 
                    type="button"
                    className="comment-send-btn" 
                    disabled={!replyText.trim()}
                    onClick={handleSubmitNewReply}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
              
              {/* 댓글 목록 */}
              <div className="detail-comments-list">
                {replies.map(reply => (
                  <div key={reply.id} className="comment-thread">
                    {/* 부모 댓글 */}
                    <ReplyCard
                      reply={{ ...reply, onPreview: setPreviewImage }}
                      isReply={false}
                      isOwner={isOwner}
                      onEdit={handleEditReply}
                      onDelete={handleDeleteReply}
                      onSelect={handleSelectReply}
                      showSelectButton={isOwner && request.status === 'open'}
                      replyingToId={replyingTo}
                      onStartReply={handleStartReply}
                      onSubmitReply={handleInlineSubmitReply}
                      onCancelReply={() => { setReplyingTo(null); setInlineReplyText('') }}
                      replyText={inlineReplyText}
                      setReplyText={setInlineReplyText}
                    />
                    {/* 대댓글 */}
                    {reply.childReplies && reply.childReplies.length > 0 && (
                      <div className="comment-replies">
                        {reply.childReplies.map(childReply => (
                          <ReplyCard
                            key={childReply.id}
                            reply={{ ...childReply, onPreview: setPreviewImage }}
                            isReply={true}
                            isOwner={isOwner}
                            onEdit={handleEditReply}
                            onDelete={handleDeleteReply}
                            onSelect={() => {}}
                            showSelectButton={false}
                            replyingToId={replyingTo}
                            onStartReply={() => handleStartReply(reply.id)}
                            onSubmitReply={handleInlineSubmitReply}
                            onCancelReply={() => { setReplyingTo(null); setInlineReplyText('') }}
                            replyText={inlineReplyText}
                            setReplyText={setInlineReplyText}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop" onClick={() => setShowDeleteModal(false)}>
          <div className="confirm-modal" onClick={e => e.stopPropagation()}>
            <h3>글 삭제</h3>
            <p>정말로 이 글을 삭제하시겠습니까?<br/>삭제된 글은 복구할 수 없습니다.</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>취소</button>
              <button className="btn-delete" onClick={handleDelete}>삭제</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PromptRequestDetail
