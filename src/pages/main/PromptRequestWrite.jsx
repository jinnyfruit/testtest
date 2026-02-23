import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft,
  Upload,
  Trash2,
  X
} from 'lucide-react'
import './PromptRequestWrite.css'

const modelOptions = ['Midjourney', 'DALL-E 3', 'Stable Diffusion', 'Leonardo AI']
const categoryOptions = ['캐릭터', '로고', '풍경', '인물', '목업', '디자인', '기타']

function PromptRequestWrite() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [description, setDescription] = useState('')
  const [referenceImages, setReferenceImages] = useState([])
  
  const handleImageUpload = () => {
    // 실제로는 파일 업로드 로직
    const fakeImages = [
      `https://picsum.photos/seed/${Date.now()}/200/200`,
    ]
    setReferenceImages([...referenceImages, ...fakeImages])
  }
  
  const removeImage = (index) => {
    setReferenceImages(referenceImages.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 실제로는 API 호출
    alert('요청이 등록되었습니다!')
    navigate('/request')
  }

  return (
    <div className="request-write-page">
      <div className="write-wrapper">
        {/* Header */}
        <header className="write-header">
          <button className="back-btn" onClick={() => navigate('/request')}>
            <ArrowLeft size={20} />
            <span>목록으로</span>
          </button>
          <h1>프롬프트 요청하기</h1>
        </header>

        {/* Form */}
        <form className="write-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-field">
              <label>제목 <span className="required">*</span></label>
              <input 
                type="text" 
                placeholder="어떤 프롬프트가 필요하신가요?" 
                className="field-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label>카테고리 <span className="required">*</span></label>
                <select 
                  className="field-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">선택하세요</option>
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-field">
              <label>선호 AI 모델</label>
              <p className="field-hint">원하시는 AI 모델을 선택해주세요 (선택사항)</p>
              <div className="model-chips">
                {modelOptions.map(model => (
                  <button 
                    type="button"
                    key={model}
                    className={`model-chip ${selectedModel === model ? 'selected' : ''}`}
                    onClick={() => setSelectedModel(model === selectedModel ? '' : model)}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-field">
              <label>레퍼런스 이미지</label>
              <p className="field-hint">원하는 스타일의 참고 이미지를 업로드해주세요 (최대 5장)</p>
              <div className="ref-upload-area">
                {referenceImages.map((img, idx) => (
                  <div key={idx} className="ref-preview">
                    <img src={img} alt="" />
                    <button type="button" className="ref-remove" onClick={() => removeImage(idx)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                {referenceImages.length < 5 && (
                  <button type="button" className="ref-add-btn" onClick={handleImageUpload}>
                    <Upload size={24} />
                    <span>이미지 추가</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-field">
              <label>상세 설명 <span className="required">*</span></label>
              <p className="field-hint">원하시는 프롬프트의 스타일, 용도, 특징 등을 자세히 설명해주세요</p>
              <textarea 
                className="field-textarea" 
                placeholder="상세할수록 좋은 제안을 받으실 수 있습니다.

예시:
- 사용 목적: 스타트업 로고 제작
- 원하는 스타일: 미니멀, 모던
- 색상: 블루 계열 선호
- 참고 브랜드: Apple, Airbnb 스타일"
                rows={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="write-footer">
            <button type="button" className="btn-cancel" onClick={() => navigate('/request')}>
              취소
            </button>
            <button type="submit" className="btn-submit">
              요청 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PromptRequestWrite
