import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Play, 
  Image as ImageIcon, 
  Download, 
  RefreshCw,
  Settings,
  Sparkles,
  Clock,
  Coins,
  X,
  Check,
  Loader2,
  Wand2,
  Film,
  Zap,
  Grid3X3,
  Heart,
  Share2,
  Maximize2,
  Trash2
} from 'lucide-react'
import './Run.css'

const models = [
  { id: 'midjourney', name: 'Midjourney v6', credits: 50, speed: 'Fast' },
  { id: 'dalle3', name: 'DALL-E 3', credits: 40, speed: 'Medium' },
  { id: 'sdxl', name: 'Stable Diffusion XL', credits: 30, speed: 'Fast' },
  { id: 'leonardo', name: 'Leonardo AI', credits: 35, speed: 'Fast' },
]

const aspectRatios = [
  { value: '1:1', label: '정사각형', width: 1024, height: 1024 },
  { value: '16:9', label: '가로형', width: 1920, height: 1080 },
  { value: '9:16', label: '세로형', width: 1080, height: 1920 },
  { value: '4:3', label: '표준', width: 1024, height: 768 },
  { value: '3:2', label: '사진', width: 1536, height: 1024 },
]

const stylePresets = [
  { id: 'none', name: '없음' },
  { id: 'cinematic', name: 'Cinematic' },
  { id: 'anime', name: 'Anime' },
  { id: 'photorealistic', name: 'Photorealistic' },
  { id: 'digital-art', name: 'Digital Art' },
  { id: 'oil-painting', name: 'Oil Painting' },
]

// 샘플 생성 기록
const recentHistory = [
  { id: 1, prompt: 'cyberpunk city at night with neon lights', image: 'https://picsum.photos/seed/gen1/400/400', model: 'Midjourney', time: '5분 전', liked: true },
  { id: 2, prompt: 'minimal logo design for tech startup', image: 'https://picsum.photos/seed/gen2/400/400', model: 'DALL-E 3', time: '15분 전', liked: false },
  { id: 3, prompt: 'fantasy landscape with floating islands', image: 'https://picsum.photos/seed/gen3/400/400', model: 'Stable Diffusion', time: '1시간 전', liked: true },
  { id: 4, prompt: 'portrait of a warrior in golden armor', image: 'https://picsum.photos/seed/gen4/400/400', model: 'Midjourney', time: '2시간 전', liked: false },
  { id: 5, prompt: 'cute cat illustration kawaii style', image: 'https://picsum.photos/seed/gen5/400/400', model: 'Leonardo AI', time: '3시간 전', liked: true },
  { id: 6, prompt: 'abstract geometric pattern colorful', image: 'https://picsum.photos/seed/gen6/400/400', model: 'DALL-E 3', time: '5시간 전', liked: false },
  { id: 7, prompt: 'futuristic car concept design', image: 'https://picsum.photos/seed/gen7/400/400', model: 'Midjourney', time: '어제', liked: true },
  { id: 8, prompt: 'cozy coffee shop interior autumn', image: 'https://picsum.photos/seed/gen8/400/400', model: 'Stable Diffusion', time: '어제', liked: false },
  { id: 9, prompt: 'dragon flying over mountains', image: 'https://picsum.photos/seed/gen9/400/400', model: 'Leonardo AI', time: '2일 전', liked: true },
]

function Run() {
  const [prompt, setPrompt] = useState('')
  const [selectedModel, setSelectedModel] = useState(models[0])
  const [aspectRatio, setAspectRatio] = useState(aspectRatios[0])
  const [stylePreset, setStylePreset] = useState(stylePresets[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showCreditModal, setShowCreditModal] = useState(false)
  const [viewMode, setViewMode] = useState('create') // 'create' | 'history'
  const [previewImage, setPreviewImage] = useState(null)
  
  const userCredits = 500

  const handleGenerate = () => {
    if (!prompt.trim()) return
    
    if (userCredits < selectedModel.credits) {
      setShowCreditModal(true)
      return
    }
    
    setIsGenerating(true)
    setGeneratedImage(null)
    
    setTimeout(() => {
      setIsGenerating(false)
      setGeneratedImage({
        url: `https://picsum.photos/seed/${Date.now()}/800/800`,
        prompt: prompt,
        model: selectedModel.name,
        time: '4.2초'
      })
    }, 3000)
  }

  return (
    <div className="run-page">
      {/* Tab Navigation */}
      <div className="run-tabs">
        <button 
          className={`run-tab ${viewMode === 'create' ? 'active' : ''}`}
          onClick={() => setViewMode('create')}
        >
          <Wand2 size={18} />
          생성하기
        </button>
        <button 
          className={`run-tab ${viewMode === 'history' ? 'active' : ''}`}
          onClick={() => setViewMode('history')}
        >
          <Grid3X3 size={18} />
          생성 기록
        </button>
      </div>

      {viewMode === 'create' ? (
        <div className="run-workspace">
          {/* Left Panel - Controls */}
          <aside className="run-controls">
            <div className="controls-header">
              <h2>
                <Sparkles size={20} />
                이미지 생성
              </h2>
              <div className="credits-badge">
                <Coins size={14} />
                <span>{userCredits}C</span>
              </div>
            </div>

            {/* Model Selection */}
            <div className="control-section">
              <label className="section-label">AI 모델</label>
              <div className="model-grid">
                {models.map(model => (
                  <button
                    key={model.id}
                    className={`model-card ${selectedModel.id === model.id ? 'active' : ''}`}
                    onClick={() => setSelectedModel(model)}
                  >
                    <span className="model-name">{model.name}</span>
                    <span className="model-meta">
                      <Zap size={10} /> {model.speed} · {model.credits}C
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="control-section">
              <label className="section-label">프롬프트</label>
              <div className="prompt-input-wrap">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="생성하고 싶은 이미지를 설명해주세요..."
                  rows={4}
                />
                <span className="char-count">{prompt.length}</span>
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="control-section">
              <label className="section-label">비율</label>
              <div className="ratio-options">
                {aspectRatios.map(ratio => (
                  <button
                    key={ratio.value}
                    className={`ratio-btn ${aspectRatio.value === ratio.value ? 'active' : ''}`}
                    onClick={() => setAspectRatio(ratio)}
                  >
                    <div className={`ratio-preview ratio-${ratio.value.replace(':', '-')}`}></div>
                    <span>{ratio.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Style Preset */}
            <div className="control-section">
              <label className="section-label">스타일 프리셋</label>
              <div className="style-options">
                {stylePresets.map(style => (
                  <button
                    key={style.id}
                    className={`style-btn ${stylePreset.id === style.id ? 'active' : ''}`}
                    onClick={() => setStylePreset(style)}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Settings Toggle */}
            <button 
              className="settings-toggle"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings size={16} />
              고급 설정
              <span className={`toggle-arrow ${showSettings ? 'open' : ''}`}>▼</span>
            </button>

            {showSettings && (
              <div className="advanced-settings">
                <div className="setting-row">
                  <label>스타일 강도</label>
                  <input type="range" min="0" max="100" defaultValue="50" />
                </div>
                <div className="setting-row">
                  <label>품질</label>
                  <select>
                    <option>표준</option>
                    <option>고품질</option>
                    <option>최고품질 (+20C)</option>
                  </select>
                </div>
                <div className="setting-row">
                  <label>Negative Prompt</label>
                  <input type="text" placeholder="제외할 요소 입력" />
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button 
              className="generate-btn"
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={20} className="spinner" />
                  생성 중...
                </>
              ) : (
                <>
                  <Play size={20} />
                  이미지 생성
                  <span className="btn-cost">{selectedModel.credits}C</span>
                </>
              )}
            </button>
          </aside>

          {/* Right Panel - Preview */}
          <main className="run-preview">
            {!generatedImage && !isGenerating && (
              <div className="empty-preview">
                <div className="empty-icon">
                  <ImageIcon size={48} />
                </div>
                <h3>결과 미리보기</h3>
                <p>프롬프트를 입력하고 생성 버튼을 클릭하세요</p>
              </div>
            )}

            {isGenerating && (
              <div className="generating-preview">
                <div className="gen-animation">
                  <div className="gen-ring"></div>
                  <div className="gen-ring"></div>
                  <div className="gen-ring"></div>
                  <Sparkles size={32} className="gen-icon" />
                </div>
                <h3>이미지 생성 중</h3>
                <p>AI가 이미지를 생성하고 있습니다...</p>
                <div className="gen-progress">
                  <div className="progress-bar"></div>
                </div>
              </div>
            )}

            {generatedImage && (
              <div className="result-preview">
                <div className="result-image">
                  <img src={generatedImage.url} alt="생성된 이미지" />
                  <div className="result-overlay">
                    <button className="overlay-btn" onClick={() => setPreviewImage(generatedImage.url)}>
                      <Maximize2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="result-footer">
                  <div className="result-info">
                    <span className="result-status">
                      <Check size={14} /> 생성 완료 · {generatedImage.time}
                    </span>
                  </div>
                  <div className="result-actions">
                    <button className="result-btn">
                      <Heart size={18} />
                    </button>
                    <button className="result-btn">
                      <Share2 size={18} />
                    </button>
                    <button className="result-btn primary">
                      <Download size={18} />
                      다운로드
                    </button>
                    <button className="result-btn" onClick={handleGenerate}>
                      <RefreshCw size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      ) : (
        /* History View - Instagram-like Grid */
        <div className="history-view">
          <div className="history-header">
            <h2>최근 생성 기록</h2>
            <span className="history-count">{recentHistory.length}개의 이미지</span>
          </div>
          
          <div className="history-grid">
            {recentHistory.map(item => (
              <div 
                key={item.id} 
                className="history-card"
                onClick={() => setPreviewImage(item.image)}
              >
                <img src={item.image} alt="" />
                <div className="history-overlay">
                  <div className="overlay-content">
                    {item.liked && <Heart size={16} fill="currentColor" className="liked" />}
                    <span className="overlay-model">{item.model}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="preview-modal" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="" />
          <button className="preview-close">
            <X size={24} />
          </button>
        </div>
      )}

      {/* Credit Modal */}
      {showCreditModal && (
        <div className="modal-backdrop" onClick={() => setShowCreditModal(false)}>
          <div className="credit-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">
              <Coins size={32} />
            </div>
            <h2>크레딧이 부족합니다</h2>
            <p>이미지 생성을 위해 {selectedModel.credits}C가 필요합니다.</p>
            <p className="current-credits">현재 보유: {userCredits}C</p>
            <div className="modal-actions">
              <button className="modal-btn secondary" onClick={() => setShowCreditModal(false)}>
                취소
              </button>
              <Link to="/credits" className="modal-btn primary">
                크레딧 충전하기
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Run
