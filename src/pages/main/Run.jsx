import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Play, 
  Image as ImageIcon, 
  Download, 
  RefreshCw,
  Settings,
  Sparkles,
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
  AlertCircle
} from 'lucide-react'
import './Run.css'

const models = [
  { id: 'dalle3', name: 'DALL-E 3', provider: 'OpenAI', credits: 60, speed: 'Medium', outputType: 'image', endpoint: '/api/generate/dalle3' },
  { id: 'gpt4o', name: 'GPT-4o Vision', provider: 'OpenAI', credits: 40, speed: 'Fast', outputType: 'image', endpoint: '/api/generate/gpt4o', description: '프롬프트 자동 향상' },
  { id: 'gemini', name: 'Gemini Pro', provider: 'Google', credits: 35, speed: 'Fast', outputType: 'image', endpoint: '/api/generate/gemini' },
  { id: 'runway', name: 'Runway Gen-3', provider: 'Runway', credits: 100, speed: 'Slow', outputType: 'video', endpoint: '/api/generate/runway' },
  { id: 'kling', name: 'Kling v1.5', provider: 'Kling AI', credits: 90, speed: 'Slow', outputType: 'image', endpoint: '/api/generate/kling' },
]

const aspectRatios = [
  { value: '1:1', label: '정사각형' },
  { value: '16:9', label: '가로형' },
  { value: '9:16', label: '세로형' },
  { value: '4:3', label: '표준' },
  { value: '3:2', label: '사진' },
]

const stylePresets = [
  { id: 'none', name: '없음' },
  { id: 'cinematic', name: 'Cinematic' },
  { id: 'anime', name: 'Anime' },
  { id: 'photorealistic', name: 'Photorealistic' },
  { id: 'digital-art', name: 'Digital Art' },
  { id: 'oil-painting', name: 'Oil Painting' },
]

function Run() {
  const [prompt, setPrompt] = useState('')
  const [selectedModel, setSelectedModel] = useState(models[0])
  const [aspectRatio, setAspectRatio] = useState(aspectRatios[0])
  const [stylePreset, setStylePreset] = useState(stylePresets[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStatus, setGenerationStatus] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showCreditModal, setShowCreditModal] = useState(false)
  const [viewMode, setViewMode] = useState('create')
  const [previewImage, setPreviewImage] = useState(null)
  const [history, setHistory] = useState([])
  const [generationTime, setGenerationTime] = useState(null)
  const [negativePrompt, setNegativePrompt] = useState('')

  const pollingRef = useRef(null)
  const startTimeRef = useRef(null)

  const userCredits = 500

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [])

  // 비동기 작업 상태 폴링
  const pollTaskStatus = (statusEndpoint, taskId) => {
    return new Promise((resolve, reject) => {
      let attempts = 0
      const maxAttempts = 120

      pollingRef.current = setInterval(async () => {
        try {
          attempts++
          if (attempts > maxAttempts) {
            clearInterval(pollingRef.current)
            reject(new Error('생성 시간이 초과되었습니다. (10분)'))
            return
          }

          const elapsed = Math.floor(attempts * 5)
          setGenerationStatus(`AI가 생성 중... (${elapsed}초 경과)`)

          const response = await fetch(`${statusEndpoint}/${taskId}`)
          const data = await response.json()

          if (data.error) {
            clearInterval(pollingRef.current)
            reject(new Error(data.error))
            return
          }

          if (data.status === 'SUCCEEDED' || data.status === 'succeed') {
            clearInterval(pollingRef.current)
            resolve(data)
          } else if (data.status === 'FAILED' || data.status === 'failed') {
            clearInterval(pollingRef.current)
            reject(new Error(data.error || '생성에 실패했습니다.'))
          }
        } catch (err) {
          clearInterval(pollingRef.current)
          reject(err)
        }
      }, 5000)
    })
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    if (userCredits < selectedModel.credits) {
      setShowCreditModal(true)
      return
    }

    setIsGenerating(true)
    setResult(null)
    setError(null)
    setGenerationTime(null)
    setGenerationStatus('AI 모델에 요청 중...')
    startTimeRef.current = Date.now()

    try {
      const body = {
        prompt: prompt.trim(),
        aspectRatio: aspectRatio.value,
        stylePreset: stylePreset.id,
        quality: 'standard',
      }
      if (negativePrompt.trim()) {
        body.negative_prompt = negativePrompt.trim()
      }

      const response = await fetch(selectedModel.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || '생성 중 오류가 발생했습니다.')
      }

      // 비동기 모델 (Runway, Kling) - 태스크 폴링
      if (data.taskId) {
        setGenerationStatus('AI가 콘텐츠를 생성하고 있습니다...')

        const statusEndpoint = selectedModel.id === 'runway'
          ? '/api/generate/runway/status'
          : '/api/generate/kling/status'

        const pollResult = await pollTaskStatus(statusEndpoint, data.taskId)

        const elapsed = ((Date.now() - startTimeRef.current) / 1000).toFixed(1)
        setGenerationTime(`${elapsed}초`)

        const newResult = {
          type: pollResult.type || selectedModel.outputType,
          url: pollResult.url,
          prompt: prompt,
          model: selectedModel.name,
        }
        setResult(newResult)
        setHistory(prev => [{ ...newResult, id: Date.now(), time: formatTime() }, ...prev])
      } else {
        // 동기 결과 (DALL-E 3, GPT-4o, Gemini)
        const elapsed = ((Date.now() - startTimeRef.current) / 1000).toFixed(1)
        setGenerationTime(`${elapsed}초`)

        const newResult = {
          type: data.type || 'image',
          url: data.url,
          revised_prompt: data.revised_prompt,
          enhanced_prompt: data.enhanced_prompt,
          prompt: prompt,
          model: selectedModel.name,
        }
        setResult(newResult)
        setHistory(prev => [{ ...newResult, id: Date.now(), time: formatTime() }, ...prev])
      }
    } catch (err) {
      console.error('Generation error:', err)
      setError(err.message)
    } finally {
      setIsGenerating(false)
      setGenerationStatus('')
    }
  }

  const formatTime = () => {
    const now = new Date()
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
  }

  const handleDownload = async () => {
    if (!result?.url) return
    try {
      // base64 데이터 URL인 경우
      if (result.url.startsWith('data:')) {
        const a = document.createElement('a')
        a.href = result.url
        a.download = `prommi-${selectedModel.id}-${Date.now()}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        return
      }
      // 일반 URL인 경우
      const response = await fetch(result.url)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `prommi-${selectedModel.id}-${Date.now()}.${result.type === 'video' ? 'mp4' : 'png'}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      window.open(result.url, '_blank')
    }
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
                {selectedModel.outputType === 'video' ? '비디오 생성' : '이미지 생성'}
              </h2>
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
                      <Zap size={10} /> {model.speed} · 🍰{model.credits}
                    </span>
                    {model.outputType === 'video' && (
                      <span className="model-type-badge"><Film size={10} /> Video</span>
                    )}
                    {model.description && (
                      <span className="model-desc">{model.description}</span>
                    )}
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
                  placeholder="생성하고 싶은 이미지를 설명해주세요... (예: A cute cat sitting on a rainbow cloud)"
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
                  <label>Negative Prompt</label>
                  <input 
                    type="text" 
                    placeholder="제외할 요소 입력 (예: blurry, low quality)" 
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                  />
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
                  <span className="gen-btn-text">{generationStatus || '생성 중...'}</span>
                </>
              ) : (
                <>
                  <Play size={20} />
                  {selectedModel.outputType === 'video' ? '비디오 생성' : '이미지 생성'}
                  <span className="btn-cost">🍰{selectedModel.credits}</span>
                </>
              )}
            </button>
          </aside>

          {/* Right Panel - Preview */}
          <main className="run-preview">
            {/* Error State */}
            {error && !isGenerating && (
              <div className="error-preview">
                <div className="error-icon">
                  <AlertCircle size={48} />
                </div>
                <h3>생성 실패</h3>
                <p className="error-message">{error}</p>
                <button onClick={() => setError(null)} className="retry-btn">
                  다시 시도
                </button>
              </div>
            )}

            {/* Empty State */}
            {!result && !isGenerating && !error && (
              <div className="empty-preview">
                <div className="empty-icon">
                  <ImageIcon size={48} />
                </div>
                <h3>결과 미리보기</h3>
                <p>프롬프트를 입력하고 생성 버튼을 클릭하세요</p>
              </div>
            )}

            {/* Generating State */}
            {isGenerating && (
              <div className="generating-preview">
                <div className="gen-animation">
                  <div className="gen-ring"></div>
                  <div className="gen-ring"></div>
                  <div className="gen-ring"></div>
                  <Sparkles size={32} className="gen-icon" />
                </div>
                <h3>{selectedModel.outputType === 'video' ? '비디오' : '이미지'} 생성 중</h3>
                <p>{generationStatus}</p>
                <div className="gen-progress">
                  <div className="progress-bar"></div>
                </div>
                <span className="gen-model-badge">{selectedModel.name}</span>
              </div>
            )}

            {/* Result - Image */}
            {result && result.type === 'image' && !isGenerating && !error && (
              <div className="result-preview">
                <div className="result-image">
                  <img src={result.url} alt="생성된 이미지" />
                  <div className="result-overlay">
                    <button className="overlay-btn" onClick={() => setPreviewImage(result.url)}>
                      <Maximize2 size={20} />
                    </button>
                  </div>
                </div>
                {result.revised_prompt && (
                  <div className="result-prompt-info">
                    <span className="prompt-label">AI 해석:</span>
                    <p>{result.revised_prompt}</p>
                  </div>
                )}
                {result.enhanced_prompt && (
                  <div className="result-prompt-info enhanced">
                    <span className="prompt-label">향상된 프롬프트:</span>
                    <p>{result.enhanced_prompt}</p>
                  </div>
                )}
                <div className="result-footer">
                  <div className="result-info">
                    <span className="result-status">
                      <Check size={14} /> 생성 완료 · {generationTime} · {result.model}
                    </span>
                  </div>
                  <div className="result-actions">
                    <button className="result-btn primary" onClick={handleDownload}>
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

            {/* Result - Video */}
            {result && result.type === 'video' && !isGenerating && !error && (
              <div className="result-preview">
                <div className="result-video">
                  <video src={result.url} controls autoPlay loop playsInline />
                </div>
                <div className="result-footer">
                  <div className="result-info">
                    <span className="result-status">
                      <Check size={14} /> 비디오 생성 완료 · {generationTime} · {result.model}
                    </span>
                  </div>
                  <div className="result-actions">
                    <button className="result-btn primary" onClick={handleDownload}>
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
        /* History View */
        <div className="history-view">
          <div className="history-header">
            <h2>생성 기록</h2>
            <span className="history-count">{history.length}개의 결과</span>
          </div>
          
          {history.length === 0 ? (
            <div className="history-empty">
              <ImageIcon size={48} />
              <p>아직 생성 기록이 없습니다.</p>
              <button onClick={() => setViewMode('create')} className="retry-btn">
                생성하러 가기
              </button>
            </div>
          ) : (
            <div className="history-grid">
              {history.map(item => (
                <div 
                  key={item.id} 
                  className="history-card"
                  onClick={() => {
                    if (item.type === 'image') setPreviewImage(item.url)
                  }}
                >
                  {item.type === 'video' ? (
                    <video src={item.url} muted loop />
                  ) : (
                    <img src={item.url} alt="" />
                  )}
                  <div className="history-overlay">
                    <div className="overlay-content">
                      <span className="overlay-model">{item.model}</span>
                      <span className="overlay-time">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
              <span style={{ fontSize: '2rem' }}>🍰</span>
            </div>
            <h2>케이크가 부족합니다</h2>
            <p>이미지 생성을 위해 🍰{selectedModel.credits}가 필요합니다.</p>
            <p className="current-credits">현재 보유: 🍰{userCredits}</p>
            <div className="modal-actions">
              <button className="modal-btn secondary" onClick={() => setShowCreditModal(false)}>
                취소
              </button>
              <Link to="/credits" className="modal-btn primary">
                케이크 충전하기
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Run
