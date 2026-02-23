import { useState } from 'react'
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  TrendingUp,
  Clock,
  AlertCircle,
  ChevronDown
} from 'lucide-react'
import './Revenue.css'

// 케이크 아이콘
const CakeIcon = ({ size = 20 }) => (
  <img 
    src="/cake-icon.png" 
    alt="케이크" 
    style={{ width: size, height: size, objectFit: 'contain' }}
  />
)

// 샘플 판매 데이터 (레퍼런스 스타일)
const salesData = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/sale1/100/100',
    format: 'PNG',
    transactionId: 'D1769835625432F43C',
    date: '2026-01-31 14:00:25',
    price: 1000,
    authorReward: 50,
    revenue: 500,
    total: 2000,
    type: '수익(일반)'
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/sale2/100/100',
    format: 'PNG',
    transactionId: 'D1769513856225B3C1',
    date: '2026-01-27 20:37:36',
    price: 1000,
    authorReward: 50,
    revenue: 500,
    total: 1500,
    type: '수익(일반)'
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/sale3/100/100',
    format: 'PNG',
    transactionId: 'D1757065550792D39B',
    date: '2025-09-05 18:45:50',
    price: 1000,
    authorReward: 50,
    revenue: 500,
    total: 1000,
    type: '수익(일반)'
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/sale4/100/100',
    format: 'PNG',
    transactionId: 'D1757065478020D39B',
    date: '2025-09-05 18:44:38',
    price: 1000,
    authorReward: 50,
    revenue: 500,
    total: 500,
    type: '수익(일반)'
  },
]

function Revenue() {
  const [sortBy, setSortBy] = useState('latest')
  const [perPage, setPerPage] = useState(12)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)

  // 통계 데이터
  const totalRevenue = 45678
  const availableWithdraw = 23450
  const pendingWithdraw = 5000
  const thisMonthRevenue = 8900

  return (
    <div className="revenue-page-light">
      <div className="revenue-container">
        {/* 페이지 타이틀 */}
        <h1 className="revenue-title">수익 & 출금 내역</h1>

        {/* 출금 안내 공지 */}
        <div className="withdraw-notice">
          <AlertCircle size={18} />
          <span>출금 신청은 <strong>50,000원 이상</strong>부터 가능합니다. 매월 15일, 말일에 정산됩니다.</span>
        </div>

        {/* 통계 카드 */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-card-icon">
              <CakeIcon size={24} />
            </div>
            <div className="stat-card-content">
              <span className="stat-card-label">총 수익</span>
              <span className="stat-card-value">{totalRevenue.toLocaleString()}원</span>
            </div>
            <div className="stat-card-trend positive">
              <ArrowUpRight size={14} />
              12.5%
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-icon withdraw">
              <Wallet size={24} />
            </div>
            <div className="stat-card-content">
              <span className="stat-card-label">출금 가능</span>
              <span className="stat-card-value">{availableWithdraw.toLocaleString()}원</span>
            </div>
            <button 
              className="withdraw-btn"
              onClick={() => setShowWithdrawModal(true)}
              disabled={availableWithdraw < 50000}
            >
              출금 신청
            </button>
          </div>

          <div className="stat-card">
            <div className="stat-card-icon pending">
              <Clock size={24} />
            </div>
            <div className="stat-card-content">
              <span className="stat-card-label">출금 대기</span>
              <span className="stat-card-value">{pendingWithdraw.toLocaleString()}원</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-icon month">
              <TrendingUp size={24} />
            </div>
            <div className="stat-card-content">
              <span className="stat-card-label">이번 달</span>
              <span className="stat-card-value">{thisMonthRevenue.toLocaleString()}원</span>
            </div>
            <div className="stat-card-trend positive">
              <ArrowUpRight size={14} />
              8.3%
            </div>
          </div>
        </div>

        {/* 필터 & 정렬 */}
        <div className="revenue-toolbar">
          <div className="toolbar-left">
            <div className="select-wrapper">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="latest">최신순</option>
                <option value="oldest">오래된순</option>
                <option value="highest">높은금액순</option>
                <option value="lowest">낮은금액순</option>
              </select>
              <ChevronDown size={16} />
            </div>
            <div className="select-wrapper">
              <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
                <option value={12}>12개씩 보기</option>
                <option value={24}>24개씩 보기</option>
                <option value={48}>48개씩 보기</option>
              </select>
              <ChevronDown size={16} />
            </div>
          </div>
          <button className="download-btn">
            <Download size={16} />
            내역 다운로드
          </button>
        </div>

        {/* 판매 내역 테이블 */}
        <div className="sales-table-wrapper">
          <table className="sales-table">
            <thead>
              <tr>
                <th>이미지</th>
                <th>확장자</th>
                <th>거래번호</th>
                <th>날짜</th>
                <th>단가</th>
                <th>작가 리워드</th>
                <th>수익금</th>
                <th>합계</th>
                <th>종류</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map(sale => (
                <tr key={sale.id}>
                  <td className="image-cell">
                    <img src={sale.image} alt="판매 이미지" />
                  </td>
                  <td className="format-cell">{sale.format}</td>
                  <td className="transaction-cell">{sale.transactionId}</td>
                  <td className="date-cell">{sale.date}</td>
                  <td className="price-cell">{sale.price.toLocaleString()}원</td>
                  <td className="reward-cell">{sale.authorReward}%</td>
                  <td className="revenue-cell">{sale.revenue.toLocaleString()}원</td>
                  <td className="total-cell">{sale.total.toLocaleString()}원</td>
                  <td className="type-cell">
                    <span className="type-badge">{sale.type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {salesData.length === 0 && (
          <div className="empty-state">
            <p>아직 판매 내역이 없습니다</p>
          </div>
        )}
      </div>

      {/* 출금 신청 모달 */}
      {showWithdrawModal && (
        <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>출금 신청</h2>
            <div className="modal-body">
              <div className="withdraw-info">
                <span>출금 가능 금액</span>
                <strong>{availableWithdraw.toLocaleString()}원</strong>
              </div>
              {availableWithdraw < 50000 ? (
                <div className="withdraw-warning">
                  <AlertCircle size={18} />
                  <span>출금 신청은 50,000원 이상부터 가능합니다.</span>
                </div>
              ) : (
                <>
                  <div className="input-group">
                    <label>출금 금액</label>
                    <input type="number" placeholder="출금할 금액을 입력하세요" />
                  </div>
                  <div className="input-group">
                    <label>계좌번호</label>
                    <input type="text" placeholder="계좌번호를 입력하세요" />
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowWithdrawModal(false)}>
                취소
              </button>
              <button 
                className="confirm-btn" 
                disabled={availableWithdraw < 50000}
              >
                출금 신청
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Revenue
