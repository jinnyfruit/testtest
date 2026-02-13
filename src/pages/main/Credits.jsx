import { useState } from 'react'
import { 
  CreditCard, 
  History, 
  Check,
  Sparkles,
  Gift,
  Zap,
  Info,
  X,
  Shield,
  Smartphone,
  Building2
} from 'lucide-react'
import './Credits.css'

// 케이크 아이콘 컴포넌트
const CakeIcon = ({ size = 20 }) => (
  <img 
    src="/cake-icon.png" 
    alt="케이크" 
    style={{ width: size, height: size, objectFit: 'contain' }}
  />
)

// 케이크 기반 크레딧 패키지 (네이버 쿠키 스타일)
// 케이크 1개 = 100원
const cakePackages = [
  { id: 'c1', cakes: 1, price: 100 },
  { id: 'c2', cakes: 10, price: 1000 },
  { id: 'c3', cakes: 30, price: 3000 },
  { id: 'c4', cakes: 50, price: 5000 },
  { id: 'c5', cakes: 100, price: 10000 },
  { id: 'c6', cakes: 200, price: 20000 },
  { id: 'c7', cakes: 300, price: 30000 },
  { id: 'c8', cakes: 500, price: 50000 },
  { id: 'c9', cakes: 700, price: 70000 },
  { id: 'c10', cakes: 1000, price: 100000 },
]

// 결제 수단 옵션
const paymentMethods = [
  { id: 'card', name: '카드결제', icon: CreditCard, description: '신용/체크카드' },
  { id: 'phone', name: '휴대폰결제', icon: Smartphone, description: '통신사 결제' },
  { id: 'bank', name: '계좌이체', icon: Building2, description: '실시간 계좌이체' },
]

const usageHistory = [
  { id: 1, type: 'purchase', description: '프롬프트 구매: 사이버펑크 네온 캐릭터', amount: -8, date: '오늘 14:30', balance: 120 },
  { id: 2, type: 'run', description: '이미지 생성 (Midjourney v6)', amount: -5, date: '오늘 13:00', balance: 128 },
  { id: 3, type: 'charge', description: '케이크 30개 충전', amount: 30, date: '어제 10:00', balance: 133 },
  { id: 4, type: 'run', description: '이미지 생성 (DALL-E 3)', amount: -4, date: '2일 전', balance: 103 },
  { id: 5, type: 'purchase', description: '프롬프트 구매: 미니멀 로고 디자인', amount: -5, date: '3일 전', balance: 107 },
  { id: 6, type: 'bonus', description: '신규 가입 보너스', amount: 10, date: '1주 전', balance: 112 },
]

function Credits() {
  const [activeTab, setActiveTab] = useState('charge')
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const currentCakes = 120

  const handlePurchase = () => {
    if (!selectedPackage) return
    setShowPaymentModal(true)
  }

  const handlePaymentConfirm = async () => {
    setIsProcessing(true)
    
    // 토스페이먼츠 결제 시뮬레이션
    setTimeout(() => {
      setIsProcessing(false)
      setShowPaymentModal(false)
      alert(`결제가 완료되었습니다!\n케이크 ${selectedPackage.cakes}개가 충전되었습니다.`)
      setSelectedPackage(null)
    }, 2000)
  }

  return (
    <div className="credits-page">
      <div className="credits-container">
        {/* 현재 보유 케이크 */}
        <div className="balance-card">
          <div className="balance-content">
            <div className="balance-icon">
              <CakeIcon size={32} />
            </div>
            <div className="balance-info">
              <span className="balance-label">보유 케이크</span>
              <span className="balance-value">{currentCakes.toLocaleString()}<small>개</small></span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="credits-tabs">
          <button 
            className={`tab-btn ${activeTab === 'charge' ? 'active' : ''}`}
            onClick={() => setActiveTab('charge')}
          >
            <CreditCard size={18} />
            케이크충전
          </button>
          <button 
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <History size={18} />
            충전내역
          </button>
        </div>

        {/* Content */}
        <div className="credits-content">
          {/* Charge Tab */}
          {activeTab === 'charge' && (
            <div className="charge-section">
              {/* 케이크란? */}
              <div className="cake-info-box">
                <div className="cake-info-title">
                  <CakeIcon size={20} />
                  <strong>케이크란?</strong>
                </div>
                <p>프롬프트 구매 및 AI 이미지 생성을 위한 전용 결제수단입니다. (1개 = 100원)</p>
              </div>

              {/* 케이크 패키지 - 네이버 쿠키 스타일 */}
              <div className="cake-package-title">케이크 패키지</div>
              <div className="cake-grid">
                {cakePackages.map(pkg => (
                  <div 
                    key={pkg.id}
                    className={`cake-row ${selectedPackage?.id === pkg.id ? 'selected' : ''}`}
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    <div className="cake-row-left">
                      <CakeIcon size={22} />
                      <span className="cake-label">케이크 {pkg.cakes}개</span>
                    </div>
                    <button className="cake-price-btn">
                      {pkg.price.toLocaleString()} 원
                    </button>
                  </div>
                ))}
              </div>

              {/* 구매 버튼 */}
              <button 
                className="purchase-btn"
                onClick={handlePurchase}
                disabled={!selectedPackage}
              >
                <Sparkles size={18} />
                {selectedPackage ? `₩${selectedPackage.price.toLocaleString()} 결제하기` : '패키지를 선택하세요'}
              </button>

              {/* PIN 입력 */}
              <div className="pin-input-section">
                <label>보유 케이크번호(PIN) 입력</label>
                <div className="pin-input-wrap">
                  <input type="text" placeholder="케이크번호(PIN)를 입력하세요" />
                  <button className="pin-submit-btn">케이크받기</button>
                </div>
              </div>

              {/* Info */}
              <div className="charge-info">
                <Info size={14} />
                <span>충전된 케이크는 환불이 불가능합니다. 케이크는 1년간 유효합니다.</span>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="history-section">
              <div className="history-list">
                {usageHistory.map(item => (
                  <div key={item.id} className="history-item">
                    <div className={`history-icon ${item.type}`}>
                      {item.type === 'charge' && <CreditCard size={16} />}
                      {item.type === 'purchase' && <Sparkles size={16} />}
                      {item.type === 'run' && <Zap size={16} />}
                      {item.type === 'bonus' && <Gift size={16} />}
                    </div>
                    <div className="history-content">
                      <span className="history-desc">{item.description}</span>
                      <span className="history-date">{item.date}</span>
                    </div>
                    <div className="history-amount-wrap">
                      <span className={`history-amount ${item.amount > 0 ? 'plus' : 'minus'}`}>
                        {item.amount > 0 ? '+' : ''}{item.amount}개
                      </span>
                      <span className="history-balance">{item.balance}개</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 토스페이먼츠 결제 모달 */}
      {showPaymentModal && selectedPackage && (
        <div className="payment-modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="payment-modal" onClick={e => e.stopPropagation()}>
            <div className="payment-modal-header">
              <h2>결제하기</h2>
              <button className="modal-close-btn" onClick={() => setShowPaymentModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="payment-modal-body">
              {/* 주문 정보 */}
              <div className="payment-order-info">
                <div className="order-item">
                  <div className="order-item-left">
                    <CakeIcon size={32} />
                    <div className="order-item-details">
                      <span className="order-item-name">케이크 {selectedPackage.cakes}개</span>
                      <span className="order-item-desc">PROMMI 크레딧</span>
                    </div>
                  </div>
                  <span className="order-item-price">₩{selectedPackage.price.toLocaleString()}</span>
                </div>
              </div>

              {/* 결제 수단 선택 */}
              <div className="payment-method-section">
                <h3>결제 수단</h3>
                <div className="payment-methods">
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      className={`payment-method-btn ${selectedPaymentMethod === method.id ? 'selected' : ''}`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <method.icon size={20} />
                      <div className="payment-method-info">
                        <span className="payment-method-name">{method.name}</span>
                        <span className="payment-method-desc">{method.description}</span>
                      </div>
                      {selectedPaymentMethod === method.id && (
                        <Check size={18} className="check-icon" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 결제 금액 */}
              <div className="payment-summary">
                <div className="summary-row">
                  <span>상품 금액</span>
                  <span>₩{selectedPackage.price.toLocaleString()}</span>
                </div>
                <div className="summary-row total">
                  <span>총 결제 금액</span>
                  <span className="total-price">₩{selectedPackage.price.toLocaleString()}</span>
                </div>
              </div>

              {/* 토스페이먼츠 로고 */}
              <div className="toss-payments-badge">
                <Shield size={14} />
                <span>토스페이먼츠로 안전하게 결제됩니다</span>
              </div>
            </div>

            <div className="payment-modal-footer">
              <button 
                className="payment-confirm-btn"
                onClick={handlePaymentConfirm}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner"></span>
                    결제 처리 중...
                  </>
                ) : (
                  <>₩{selectedPackage.price.toLocaleString()} 결제하기</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Credits
