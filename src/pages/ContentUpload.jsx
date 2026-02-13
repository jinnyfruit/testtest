import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Image, 
  X, 
  Plus, 
  Sparkles,
  Tag,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import './ContentUpload.css'

const aiModels = [
  { id: 'midjourney', name: 'Midjourney', color: '#ff6b6b' },
  { id: 'dalle', name: 'DALL-E 3', color: '#4ecdc4' },
  { id: 'stable', name: 'Stable Diffusion', color: '#a855f7' },
  { id: 'firefly', name: 'Adobe Firefly', color: '#ff9f43' },
  { id: 'leonardo', name: 'Leonardo AI', color: '#6366f1' },
]

function ContentUpload() {
  const [images, setImages] = useState([])
  const [title, setTitle] = useState('')
  const [prompt, setPrompt] = useState('')
  const [description, setDescription] = useState('')
  const [selectedModels, setSelectedModels] = useState([])
  const [price, setPrice] = useState('')
  const [isFree, setIsFree] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages(prev => [...prev, ...newImages].slice(0, 5))
  }

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const toggleModel = (modelId) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitSuccess(true)
    
    // 3초 후 리셋
    setTimeout(() => {
      setSubmitSuccess(false)
      setImages([])
      setTitle('')
      setPrompt('')
      setDescription('')
      setSelectedModels([])
      setPrice('')
      setIsFree(false)
    }, 3000)
  }

  return (
    <div className="upload-page">
      <motion.form 
        className="upload-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Image Upload Section */}
        <div className="form-section">
          <div className="section-header">
            <Image size={20} />
            <h2>레퍼런스 이미지</h2>
            <span className="section-hint">최대 5장까지 업로드 가능</span>
          </div>
          
          <div className="image-upload-area">
            <div className="image-grid">
              {images.map((image, index) => (
                <motion.div 
                  key={image.id}
                  className="image-preview"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <img src={image.preview} alt={`Preview ${index + 1}`} />
                  <button 
                    type="button"
                    className="remove-image"
                    onClick={() => removeImage(image.id)}
                  >
                    <X size={14} />
                  </button>
                  {index === 0 && <span className="main-badge">대표</span>}
                </motion.div>
              ))}
              
              {images.length < 5 && (
                <label className="upload-box">
                  <input 
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    hidden
                  />
                  <div className="upload-content">
                    <div className="upload-icon">
                      <Plus size={24} />
                    </div>
                    <span>이미지 추가</span>
                  </div>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Title & Prompt Section */}
        <div className="form-section">
          <div className="section-header">
            <FileText size={20} />
            <h2>프롬프트 정보</h2>
          </div>
          
          <div className="form-group">
            <label className="form-label">제목</label>
            <input 
              type="text"
              className="form-input"
              placeholder="프롬프트 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">프롬프트</label>
            <textarea 
              className="form-textarea"
              placeholder="실제 사용된 프롬프트를 입력하세요"
              rows={6}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">상세설명 및 사용가이드</label>
            <textarea 
              className="form-textarea"
              placeholder="구매자에게 보여질 설명과 사용 가이드를 작성하세요"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* AI Model Selection */}
        <div className="form-section">
          <div className="section-header">
            <Sparkles size={20} />
            <h2>사용 모델 태그</h2>
          </div>
          
          <div className="model-tags">
            {aiModels.map(model => (
              <button
                key={model.id}
                type="button"
                className={`model-tag ${selectedModels.includes(model.id) ? 'selected' : ''}`}
                onClick={() => toggleModel(model.id)}
                style={{ '--model-color': model.color }}
              >
                <Tag size={14} />
                {model.name}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="form-section">
          <div className="section-header">
            <DollarSign size={20} />
            <h2>가격 설정</h2>
          </div>
          
          <div className="pricing-options">
            <label className="pricing-option">
              <input 
                type="radio"
                name="pricing"
                checked={!isFree}
                onChange={() => setIsFree(false)}
              />
              <span className="option-radio"></span>
              <span className="option-label">유료</span>
            </label>
            <label className="pricing-option">
              <input 
                type="radio"
                name="pricing"
                checked={isFree}
                onChange={() => setIsFree(true)}
              />
              <span className="option-radio"></span>
              <span className="option-label">무료</span>
            </label>
          </div>

          {!isFree && (
            <motion.div 
              className="price-input-wrapper"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <span className="currency">₩</span>
              <input 
                type="number"
                className="price-input"
                placeholder="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </motion.div>
          )}
        </div>

        {/* Submit Button */}
        <motion.button 
          type="submit"
          className={`submit-btn ${isSubmitting ? 'loading' : ''} ${submitSuccess ? 'success' : ''}`}
          disabled={isSubmitting || submitSuccess}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              등록 중...
            </>
          ) : submitSuccess ? (
            <>
              <CheckCircle size={20} />
              등록 완료!
            </>
          ) : (
            <>
              <Upload size={20} />
              등록하기
            </>
          )}
        </motion.button>

        <p className="submit-notice">
          <AlertCircle size={14} />
          등록된 컨텐츠는 관리자 검수 후 판매가 시작됩니다
        </p>
      </motion.form>
    </div>
  )
}

export default ContentUpload
