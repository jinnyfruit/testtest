import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Grid, 
  Heart, 
  Image as ImageIcon,
  X,
  UserMinus,
  Edit3,
  Camera
} from 'lucide-react'
import './Profile.css'

// 샘플 프로필 데이터
const profileData = {
  username: 'creative_kim',
  displayName: '김크리에이티브',
  avatar: 'https://picsum.photos/seed/profile/200/200',
  bio: 'AI 아트 크리에이터 | Midjourney & DALL-E 전문\n다양한 스타일의 프롬프트를 공유합니다 ✨',
  followers: 1234,
  following: 567,
  totalPrompts: 42,
  totalLikes: 8920,
  badges: ['Top Creator', 'Verified'],
  isFollowing: false,
  isOwner: true
}

// 스크랩 탭 제거 (좋아요 = 스크랩 기능)
const tabs = [
  { id: 'prompts', label: '프롬프트', icon: Grid, count: 42 },
  { id: 'history', label: '히스토리', icon: ImageIcon, count: 256 },
  { id: 'likes', label: '좋아요', icon: Heart, count: 89 },
]

const promptsData = [
  { id: 1, title: '사이버펑크 네온 캐릭터', image: 'https://picsum.photos/seed/p1/300/300', likes: 234, price: 0 },
  { id: 2, title: '미니멀 로고 디자인', image: 'https://picsum.photos/seed/p2/300/300', likes: 189, price: 500 },
  { id: 3, title: '판타지 풍경', image: 'https://picsum.photos/seed/p3/300/300', likes: 456, price: 800 },
  { id: 4, title: '3D 캐릭터', image: 'https://picsum.photos/seed/p4/300/300', likes: 321, price: 1200 },
  { id: 5, title: '빈티지 포스터', image: 'https://picsum.photos/seed/p5/300/300', likes: 567, price: 0 },
  { id: 6, title: '추상 아트', image: 'https://picsum.photos/seed/p6/300/300', likes: 234, price: 400 },
]

// 샘플 팔로워/팔로잉 데이터
const followersData = [
  { id: 1, username: 'art_lover', displayName: '아트러버', avatar: 'https://picsum.photos/seed/f1/100/100', isFollowing: true },
  { id: 2, username: 'design_master', displayName: '디자인마스터', avatar: 'https://picsum.photos/seed/f2/100/100', isFollowing: false },
  { id: 3, username: 'pixel_artist', displayName: '픽셀아티스트', avatar: 'https://picsum.photos/seed/f3/100/100', isFollowing: true },
  { id: 4, username: 'creative_soul', displayName: '크리에이티브소울', avatar: 'https://picsum.photos/seed/f4/100/100', isFollowing: false },
  { id: 5, username: 'ai_enthusiast', displayName: 'AI열정가', avatar: 'https://picsum.photos/seed/f5/100/100', isFollowing: true },
  { id: 6, username: 'prompt_wizard', displayName: '프롬프트위자드', avatar: 'https://picsum.photos/seed/f6/100/100', isFollowing: false },
]

const followingData = [
  { id: 1, username: 'midjourney_pro', displayName: '미드저니프로', avatar: 'https://picsum.photos/seed/g1/100/100', isFollowing: true },
  { id: 2, username: 'dalle_expert', displayName: '달리전문가', avatar: 'https://picsum.photos/seed/g2/100/100', isFollowing: true },
  { id: 3, username: 'stable_diffusion', displayName: '스테이블디퓨전', avatar: 'https://picsum.photos/seed/g3/100/100', isFollowing: true },
  { id: 4, username: 'ai_art_studio', displayName: 'AI아트스튜디오', avatar: 'https://picsum.photos/seed/g4/100/100', isFollowing: true },
]

function Profile() {
  const { username } = useParams()
  const [activeTab, setActiveTab] = useState('prompts')
  const [isFollowing, setIsFollowing] = useState(profileData.isFollowing)
  const [followModal, setFollowModal] = useState({ open: false, type: null }) // 'followers' or 'following'
  const [followers, setFollowers] = useState(followersData)
  const [following, setFollowing] = useState(followingData)
  
  // 프로필 수정 관련 state
  const [showEditModal, setShowEditModal] = useState(false)
  const [profileState, setProfileState] = useState(profileData)
  const [editForm, setEditForm] = useState({
    displayName: profileData.displayName,
    bio: profileData.bio,
    avatar: profileData.avatar
  })
  const [previewAvatar, setPreviewAvatar] = useState(null)
  const fileInputRef = useRef(null)

  const profile = profileState // 실제로는 username으로 fetch
  
  const handleEditProfile = () => {
    setEditForm({
      displayName: profileState.displayName,
      bio: profileState.bio,
      avatar: profileState.avatar
    })
    setPreviewAvatar(null)
    setShowEditModal(true)
  }
  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleSaveProfile = () => {
    setProfileState(prev => ({
      ...prev,
      displayName: editForm.displayName,
      bio: editForm.bio,
      avatar: previewAvatar || editForm.avatar
    }))
    setShowEditModal(false)
  }

  const handleToggleFollow = (userId, listType) => {
    if (listType === 'followers') {
      setFollowers(prev => prev.map(user => 
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      ))
    } else {
      setFollowing(prev => prev.map(user => 
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      ))
    }
  }

  const handleRemoveFollower = (userId) => {
    setFollowers(prev => prev.filter(user => user.id !== userId))
  }

  const handleUnfollow = (userId) => {
    setFollowing(prev => prev.filter(user => user.id !== userId))
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-cover">
            <div className="cover-gradient"></div>
          </div>
          
          <div className="profile-info">
            <div className="avatar-section">
              <img src={profile.avatar} alt={profile.displayName} className="profile-avatar" />
            </div>
            
            <div className="info-main">
              <div className="name-row">
                <h1 className="display-name">{profile.displayName}</h1>
                <div className="badges">
                  {profile.badges.map((badge, idx) => (
                    <span key={idx} className="badge">{badge}</span>
                  ))}
                </div>
              </div>
              <p className="username">@{profile.username}</p>
              <p className="bio">{profile.bio}</p>
              
              <div className="stats-row">
                <div className="stat-item">
                  <span className="stat-value">{profile.totalPrompts}</span>
                  <span className="stat-label">게시물</span>
                </div>
                <div className="stat-divider"></div>
                <button className="stat-item clickable" onClick={() => setFollowModal({ open: true, type: 'followers' })}>
                  <span className="stat-value">{profile.followers.toLocaleString()}</span>
                  <span className="stat-label">팔로워</span>
                </button>
                <div className="stat-divider"></div>
                <button className="stat-item clickable" onClick={() => setFollowModal({ open: true, type: 'following' })}>
                  <span className="stat-value">{profile.following}</span>
                  <span className="stat-label">팔로잉</span>
                </button>
              </div>
              
              {profile.isOwner && (
                <button className="edit-profile-btn" onClick={handleEditProfile}>
                  <Edit3 size={14} />
                  프로필 수정
                </button>
              )}
            </div>
            
            <div className="action-buttons">
              {!profile.isOwner && (
                <button 
                  className={`action-btn ${isFollowing ? 'following' : 'primary'}`}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? '팔로잉' : '팔로우'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
              <span className="tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="profile-content">
          {activeTab === 'prompts' && (
            <div className="prompts-grid">
              {promptsData.map(prompt => (
                <Link to={`/prompt/${prompt.id}`} key={prompt.id} className="prompt-item">
                  <img src={prompt.image} alt={prompt.title} />
                  <div className="prompt-overlay">
                    <div className="overlay-stats">
                      <span><Heart size={14} /> {prompt.likes}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="prompts-grid">
              {[...promptsData, ...promptsData].slice(0, 9).map((prompt, idx) => (
                <div key={idx} className="prompt-item">
                  <img src={`https://picsum.photos/seed/history${idx}/300/300`} alt="" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'likes' && (
            <div className="prompts-grid">
              {promptsData.map(prompt => (
                <Link to={`/prompt/${prompt.id}`} key={prompt.id} className="prompt-item">
                  <img src={prompt.image} alt={prompt.title} />
                  <div className="prompt-overlay">
                    <div className="overlay-stats">
                      <span><Heart size={14} /> {prompt.likes}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 팔로워/팔로잉 모달 */}
      {followModal.open && (
        <div className="follow-modal-overlay" onClick={() => setFollowModal({ open: false, type: null })}>
          <div className="follow-modal" onClick={e => e.stopPropagation()}>
            <div className="follow-modal-header">
              <h2>{followModal.type === 'followers' ? '팔로워' : '팔로잉'}</h2>
              <button className="modal-close-btn" onClick={() => setFollowModal({ open: false, type: null })}>
                <X size={20} />
              </button>
            </div>
            
            <div className="follow-modal-body">
              <div className="follow-list">
                {(followModal.type === 'followers' ? followers : following).map(user => (
                  <div key={user.id} className="follow-item">
                    <Link to={`/profile/${user.username}`} className="follow-user-info" onClick={() => setFollowModal({ open: false, type: null })}>
                      <img src={user.avatar} alt={user.displayName} className="follow-avatar" />
                      <div className="follow-user-details">
                        <span className="follow-display-name">{user.displayName}</span>
                        <span className="follow-username">@{user.username}</span>
                      </div>
                    </Link>
                    <div className="follow-actions">
                      {followModal.type === 'followers' ? (
                        <>
                          <button 
                            className={`follow-action-btn ${user.isFollowing ? 'following' : 'follow'}`}
                            onClick={() => handleToggleFollow(user.id, 'followers')}
                          >
                            {user.isFollowing ? '팔로잉' : '맞팔로우'}
                          </button>
                          {profile.isOwner && (
                            <button 
                              className="follow-action-btn remove"
                              onClick={() => handleRemoveFollower(user.id)}
                            >
                              <UserMinus size={16} />
                            </button>
                          )}
                        </>
                      ) : (
                        <button 
                          className="follow-action-btn unfollow"
                          onClick={() => handleUnfollow(user.id)}
                        >
                          언팔로우
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                
                {(followModal.type === 'followers' ? followers : following).length === 0 && (
                  <div className="follow-empty">
                    <p>{followModal.type === 'followers' ? '아직 팔로워가 없습니다' : '아직 팔로잉하는 사용자가 없습니다'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 프로필 수정 모달 */}
      {showEditModal && (
        <div className="edit-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="edit-modal" onClick={e => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h2>프로필 수정</h2>
              <button className="modal-close-btn" onClick={() => setShowEditModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="edit-modal-body">
              {/* 프로필 사진 수정 */}
              <div className="edit-avatar-section">
                <div className="edit-avatar-wrapper">
                  <img 
                    src={previewAvatar || editForm.avatar} 
                    alt="프로필" 
                    className="edit-avatar-preview" 
                  />
                  <button 
                    className="edit-avatar-overlay"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera size={24} />
                    <span>사진 변경</span>
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
              
              {/* 이름 수정 */}
              <div className="edit-field">
                <label className="edit-label">이름</label>
                <input
                  type="text"
                  className="edit-input"
                  value={editForm.displayName}
                  onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                  placeholder="이름을 입력하세요"
                  maxLength={20}
                />
                <span className="edit-char-count">{editForm.displayName.length}/20</span>
              </div>
              
              {/* 소개글 수정 */}
              <div className="edit-field">
                <label className="edit-label">소개</label>
                <textarea
                  className="edit-textarea"
                  value={editForm.bio}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="자신을 소개해주세요"
                  maxLength={150}
                  rows={4}
                />
                <span className="edit-char-count">{editForm.bio.length}/150</span>
              </div>
            </div>
            
            <div className="edit-modal-footer">
              <button className="edit-cancel-btn" onClick={() => setShowEditModal(false)}>
                취소
              </button>
              <button className="edit-save-btn" onClick={handleSaveProfile}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
