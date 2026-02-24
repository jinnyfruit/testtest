import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Image as ImageIcon, 
  MessageSquare, 
  Film, 
  Music, 
  Code, 
  Eye, 
  Zap,
  ArrowRight,
  Check,
  Play,
  Cpu,
  Video,
  Wand2,
  Globe,
  ShieldCheck,
  Clock,
  Layers
} from 'lucide-react'
import './AIModels.css'

// AI 서비스 프로바이더 데이터
const aiProviders = [
  {
    id: 'openai',
    name: 'OpenAI',
    logo: '◎',
    color: '#10a37f',
    gradient: 'linear-gradient(135deg, #10a37f 0%, #1a7f5a 100%)',
    tagline: 'Industry-leading AI Models',
    description: 'GPT-4o 기반 텍스트 생성, DALL-E 3 이미지 생성 등 최고 수준의 AI 모델을 제공합니다.',
    status: 'active',
    models: [
      {
        name: 'GPT-4o',
        type: '텍스트 / 멀티모달',
        description: '최신 멀티모달 모델. 텍스트, 이미지, 코드를 이해하고 생성합니다.',
        capabilities: ['텍스트 생성', '코드 작성', '이미지 분석', '대화'],
        speed: '빠름',
        quality: '최고',
        costPerUse: 40,
        icon: MessageSquare
      },
      {
        name: 'GPT-4 Turbo',
        type: '텍스트',
        description: '128K 컨텍스트 윈도우의 고성능 텍스트 생성 모델.',
        capabilities: ['장문 생성', '분석', '번역', '요약'],
        speed: '보통',
        quality: '최고',
        costPerUse: 50,
        icon: Code
      },
      {
        name: 'DALL-E 3',
        type: '이미지 생성',
        description: '텍스트 프롬프트로 고품질 이미지를 생성하는 최신 모델.',
        capabilities: ['이미지 생성', '스타일 변환', '편집', '인페인팅'],
        speed: '보통',
        quality: '최고',
        costPerUse: 60,
        icon: ImageIcon
      }
    ]
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    logo: '◆',
    color: '#4285f4',
    gradient: 'linear-gradient(135deg, #4285f4 0%, #a855f7 50%, #ea4335 100%)',
    tagline: 'Google\'s Most Capable AI',
    description: 'Google의 최신 멀티모달 AI 모델. 텍스트, 이미지, 코드를 통합 처리합니다.',
    status: 'active',
    models: [
      {
        name: 'Gemini Pro',
        type: '멀티모달',
        description: '텍스트와 이미지를 함께 이해하고 처리하는 멀티모달 모델.',
        capabilities: ['텍스트 생성', '이미지 이해', '코드 생성', '추론'],
        speed: '빠름',
        quality: '높음',
        costPerUse: 35,
        icon: Sparkles
      },
      {
        name: 'Gemini Pro Vision',
        type: '비전',
        description: '이미지 분석과 시각적 질의응답에 특화된 모델.',
        capabilities: ['이미지 분석', '시각적 Q&A', '문서 이해', 'OCR'],
        speed: '빠름',
        quality: '높음',
        costPerUse: 30,
        icon: Eye
      }
    ]
  },
  {
    id: 'runway',
    name: 'Runway',
    logo: '▶',
    color: '#ff4081',
    gradient: 'linear-gradient(135deg, #ff4081 0%, #7c4dff 100%)',
    tagline: 'Next-Gen Video AI',
    description: 'Gen-3 Alpha 기반의 영상 생성 AI. 텍스트와 이미지로부터 고품질 영상을 만듭니다.',
    status: 'active',
    models: [
      {
        name: 'Gen-3 Alpha',
        type: '비디오 생성',
        description: '텍스트/이미지를 기반으로 최대 10초 고품질 비디오를 생성합니다.',
        capabilities: ['텍스트→비디오', '이미지→비디오', '모션 브러쉬', '카메라 컨트롤'],
        speed: '느림',
        quality: '최고',
        costPerUse: 100,
        icon: Film
      },
      {
        name: 'Gen-3 Alpha Turbo',
        type: '비디오 생성 (고속)',
        description: 'Gen-3의 경량 버전. 빠른 속도로 비디오를 생성합니다.',
        capabilities: ['텍스트→비디오', '이미지→비디오', '빠른 생성'],
        speed: '보통',
        quality: '높음',
        costPerUse: 70,
        icon: Zap
      }
    ]
  },
  {
    id: 'kling',
    name: 'Kling AI',
    logo: '⟡',
    color: '#6c5ce7',
    gradient: 'linear-gradient(135deg, #6c5ce7 0%, #0984e3 100%)',
    tagline: 'Creative Video Intelligence',
    description: 'Kuaishou의 최첨단 비디오 AI. 자연스러운 모션과 립싱크 기능을 제공합니다.',
    status: 'active',
    models: [
      {
        name: 'Kling v1.5',
        type: '비디오 생성',
        description: '텍스트/이미지 기반 최대 10초 비디오 생성. 자연스러운 모션 표현.',
        capabilities: ['텍스트→비디오', '이미지→비디오', '모션 생성'],
        speed: '느림',
        quality: '최고',
        costPerUse: 90,
        icon: Video
      },
      {
        name: 'Kling Lip Sync',
        type: '립싱크',
        description: '비디오에 자연스러운 립싱크를 적용합니다.',
        capabilities: ['립싱크', '음성 동기화', '표정 생성'],
        speed: '보통',
        quality: '높음',
        costPerUse: 50,
        icon: Music
      },
      {
        name: 'Kling Virtual Try-On',
        type: '가상 피팅',
        description: '의류를 가상으로 피팅하는 AI 기능.',
        capabilities: ['가상 피팅', '의류 교체', '스타일링'],
        speed: '보통',
        quality: '높음',
        costPerUse: 60,
        icon: Layers
      }
    ]
  }
]

// 통계 데이터
const platformStats = [
  { label: '제공 AI 모델', value: '10+', icon: Cpu },
  { label: '일일 생성 횟수', value: '50K+', icon: Zap },
  { label: '평균 응답 시간', value: '3.2s', icon: Clock },
  { label: '가용률', value: '99.9%', icon: ShieldCheck },
]

function AIModels() {
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [hoveredModel, setHoveredModel] = useState(null)

  return (
    <div className="ai-models-page">
      {/* Hero Section */}
      <section className="ai-hero">
        <div className="ai-hero-bg">
          <div className="hero-grid-pattern"></div>
          <div className="hero-glow hero-glow-1"></div>
          <div className="hero-glow hero-glow-2"></div>
          <div className="hero-glow hero-glow-3"></div>
        </div>
        <div className="ai-hero-content">
          <div className="ai-hero-badge">
            <Sparkles size={14} />
            Powered by Leading AI
          </div>
          <h1 className="ai-hero-title">
            Create with the<br />
            <span className="gradient-text">World's Best AI</span>
          </h1>
          <p className="ai-hero-desc">
            OpenAI, Google Gemini, Runway, Kling까지<br />
            최고의 생성형 AI를 한 곳에서 경험하세요.
          </p>
          <div className="ai-hero-actions">
            <Link to="/run" className="hero-cta-btn primary">
              <Play size={18} />
              지금 시작하기
            </Link>
            <a href="#models" className="hero-cta-btn secondary">
              모델 둘러보기
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Provider Logos */}
        <div className="provider-logos">
          {aiProviders.map(provider => (
            <div key={provider.id} className="provider-logo-item" style={{ '--provider-color': provider.color }}>
              <span className="provider-logo-icon">{provider.logo}</span>
              <span className="provider-logo-name">{provider.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="ai-stats">
        <div className="stats-container">
          {platformStats.map((stat, i) => (
            <div key={i} className="ai-stat-card">
              <stat.icon size={20} className="stat-icon" />
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Provider Cards */}
      <section className="ai-providers" id="models">
        <div className="section-header">
          <h2>Available AI Services</h2>
          <p>PROMMI에서 바로 사용 가능한 생성형 AI 서비스</p>
        </div>

        <div className="providers-grid">
          {aiProviders.map(provider => (
            <div 
              key={provider.id}
              className={`provider-card ${selectedProvider === provider.id ? 'expanded' : ''}`}
              onClick={() => setSelectedProvider(selectedProvider === provider.id ? null : provider.id)}
            >
              <div className="provider-card-header">
                <div className="provider-identity">
                  <div className="provider-icon" style={{ background: provider.gradient }}>
                    <span>{provider.logo}</span>
                  </div>
                  <div className="provider-info">
                    <h3>{provider.name}</h3>
                    <span className="provider-tagline">{provider.tagline}</span>
                  </div>
                </div>
                <div className={`status-indicator ${provider.status}`}>
                  <span className="status-dot"></span>
                  Active
                </div>
              </div>

              <p className="provider-desc">{provider.description}</p>

              <div className="provider-models-preview">
                {provider.models.map((model, idx) => (
                  <span key={idx} className="model-tag" style={{ '--tag-color': provider.color }}>
                    {model.name}
                  </span>
                ))}
              </div>

              {/* Expanded Model List */}
              <div className={`provider-models-detail ${selectedProvider === provider.id ? 'show' : ''}`}>
                {provider.models.map((model, idx) => (
                  <div 
                    key={idx} 
                    className="model-detail-card"
                    onMouseEnter={() => setHoveredModel(`${provider.id}-${idx}`)}
                    onMouseLeave={() => setHoveredModel(null)}
                  >
                    <div className="model-detail-header">
                      <div className="model-icon-wrap" style={{ background: provider.gradient }}>
                        <model.icon size={18} />
                      </div>
                      <div className="model-meta">
                        <h4>{model.name}</h4>
                        <span className="model-type">{model.type}</span>
                      </div>
                      <div className="model-cost">
                        <span className="cost-value">🍰 {model.costPerUse}</span>
                        <span className="cost-label">/ 1회</span>
                      </div>
                    </div>

                    <p className="model-description">{model.description}</p>

                    <div className="model-capabilities">
                      {model.capabilities.map((cap, i) => (
                        <span key={i} className="capability-tag">
                          <Check size={10} />
                          {cap}
                        </span>
                      ))}
                    </div>

                    <div className="model-footer">
                      <div className="model-specs">
                        <span className={`spec-badge speed-${model.speed === '빠름' ? 'fast' : model.speed === '보통' ? 'medium' : 'slow'}`}>
                          <Zap size={10} />
                          {model.speed}
                        </span>
                        <span className={`spec-badge quality-${model.quality === '최고' ? 'best' : 'high'}`}>
                          <Sparkles size={10} />
                          {model.quality}
                        </span>
                      </div>
                      <Link 
                        to="/run" 
                        className="model-use-btn"
                        onClick={(e) => e.stopPropagation()}
                        style={{ '--btn-color': provider.color }}
                      >
                        사용하기
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <button className="expand-toggle">
                {selectedProvider === provider.id ? '접기' : '모델 상세보기'}
                <ArrowRight size={14} className={selectedProvider === provider.id ? 'rotated' : ''} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="ai-comparison">
        <div className="section-header">
          <h2>Model Comparison</h2>
          <p>각 AI 모델의 특징을 비교해보세요</p>
        </div>

        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>모델</th>
                <th>제공사</th>
                <th>유형</th>
                <th>속도</th>
                <th>품질</th>
                <th>비용 (🍰)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {aiProviders.flatMap(provider => 
                provider.models.map((model, idx) => (
                  <tr key={`${provider.id}-${idx}`}>
                    <td className="model-name-cell">
                      <div className="table-model-icon" style={{ background: provider.gradient }}>
                        <model.icon size={14} />
                      </div>
                      <strong>{model.name}</strong>
                    </td>
                    <td>
                      <span className="table-provider" style={{ color: provider.color }}>
                        {provider.name}
                      </span>
                    </td>
                    <td><span className="table-type">{model.type}</span></td>
                    <td>
                      <span className={`table-speed speed-${model.speed === '빠름' ? 'fast' : model.speed === '보통' ? 'medium' : 'slow'}`}>
                        {model.speed}
                      </span>
                    </td>
                    <td>
                      <span className={`table-quality quality-${model.quality === '최고' ? 'best' : 'high'}`}>
                        {model.quality}
                      </span>
                    </td>
                    <td className="table-cost">🍰 {model.costPerUse}</td>
                    <td>
                      <Link to="/run" className="table-use-btn">사용</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ai-cta">
        <div className="cta-card">
          <div className="cta-glow"></div>
          <h2>지금 바로 생성을 시작하세요</h2>
          <p>10개 이상의 AI 모델이 여러분의 창작을 기다리고 있습니다</p>
          <div className="cta-actions">
            <Link to="/run" className="cta-btn primary">
              <Wand2 size={18} />
              이미지 생성하기
            </Link>
            <Link to="/credits" className="cta-btn secondary">
              🍰 케이크 충전하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AIModels
