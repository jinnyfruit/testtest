import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  CreditCard,
  TrendingUp,
  Clock
} from 'lucide-react'
import './Revenue.css'

// 샘플 데이터
const revenueData = [
  {
    id: 1,
    type: 'sale',
    title: '사이버펑크 네온 캐릭터',
    amount: 15000,
    fee: 1500,
    net: 13500,
    date: '2024-02-09 14:32',
    status: 'completed'
  },
  {
    id: 2,
    type: 'sale',
    title: '미니멀 로고 디자인 프롬프트',
    amount: 8000,
    fee: 800,
    net: 7200,
    date: '2024-02-08 09:15',
    status: 'completed'
  },
  {
    id: 3,
    type: 'withdrawal',
    title: '출금 신청',
    amount: -500000,
    fee: 0,
    net: -500000,
    date: '2024-02-07 16:45',
    status: 'pending'
  },
  {
    id: 4,
    type: 'sale',
    title: '판타지 풍경 일러스트',
    amount: 25000,
    fee: 2500,
    net: 22500,
    date: '2024-02-06 11:20',
    status: 'completed'
  },
  {
    id: 5,
    type: 'sale',
    title: '포토리얼 인물 사진',
    amount: 12000,
    fee: 1200,
    net: 10800,
    date: '2024-02-05 18:05',
    status: 'completed'
  },
  {
    id: 6,
    type: 'withdrawal',
    title: '출금 완료',
    amount: -300000,
    fee: 0,
    net: -300000,
    date: '2024-02-01 10:00',
    status: 'completed'
  },
  {
    id: 7,
    type: 'sale',
    title: '3D 캐릭터 모델링 프롬프트',
    amount: 35000,
    fee: 3500,
    net: 31500,
    date: '2024-01-30 15:30',
    status: 'completed'
  },
]

function SummaryCard({ icon: Icon, title, value, subtitle, trend, delay }) {
  return (
    <motion.div 
      className="summary-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="summary-icon">
        <Icon size={24} />
      </div>
      <div className="summary-content">
        <span className="summary-title">{title}</span>
        <span className="summary-value">{value}</span>
        {subtitle && <span className="summary-subtitle">{subtitle}</span>}
      </div>
      {trend && (
        <div className={`summary-trend ${trend > 0 ? 'positive' : 'negative'}`}>
          {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(trend)}%
        </div>
      )}
    </motion.div>
  )
}

function Revenue() {
  const [filter, setFilter] = useState('all')
  const [dateRange, setDateRange] = useState('month')

  const filteredData = filter === 'all' 
    ? revenueData 
    : revenueData.filter(item => item.type === filter)

  return (
    <div className="revenue-page">
      {/* Summary Cards */}
      <div className="summary-grid">
        <SummaryCard 
          icon={Wallet}
          title="총 수익"
          value="₩4,567,890"
          trend={12.5}
          delay={0}
        />
        <SummaryCard 
          icon={CreditCard}
          title="정산 가능"
          value="₩2,345,000"
          subtitle="출금 가능한 금액"
          delay={0.1}
        />
        <SummaryCard 
          icon={TrendingUp}
          title="이번 달 수익"
          value="₩890,000"
          trend={8.3}
          delay={0.2}
        />
        <SummaryCard 
          icon={Clock}
          title="출금 대기"
          value="₩500,000"
          subtitle="처리 중 1건"
          delay={0.3}
        />
      </div>

      {/* Filters & Actions */}
      <motion.div 
        className="revenue-toolbar"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="toolbar-filters">
          <div className="filter-group">
            <Filter size={16} />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">전체</option>
              <option value="sale">판매</option>
              <option value="withdrawal">출금</option>
            </select>
          </div>
          
          <div className="filter-group">
            <Calendar size={16} />
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="filter-select"
            >
              <option value="week">최근 1주</option>
              <option value="month">최근 1개월</option>
              <option value="quarter">최근 3개월</option>
              <option value="year">최근 1년</option>
            </select>
          </div>
        </div>

        <div className="toolbar-actions">
          <button className="action-btn secondary">
            <Download size={16} />
            내역 다운로드
          </button>
          <motion.button 
            className="action-btn primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Wallet size={16} />
            출금 신청
          </motion.button>
        </div>
      </motion.div>

      {/* Revenue Table */}
      <motion.div 
        className="revenue-table-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <table className="revenue-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>내역</th>
              <th>금액</th>
              <th>수수료</th>
              <th>정산액</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <motion.tr 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                <td className="date-cell">{item.date}</td>
                <td className="title-cell">
                  <span className={`type-badge ${item.type}`}>
                    {item.type === 'sale' ? '판매' : '출금'}
                  </span>
                  {item.title}
                </td>
                <td className={`amount-cell ${item.amount > 0 ? 'positive' : 'negative'}`}>
                  {item.amount > 0 ? '+' : ''}₩{Math.abs(item.amount).toLocaleString()}
                </td>
                <td className="fee-cell">
                  {item.fee > 0 ? `-₩${item.fee.toLocaleString()}` : '-'}
                </td>
                <td className={`net-cell ${item.net > 0 ? 'positive' : 'negative'}`}>
                  {item.net > 0 ? '+' : ''}₩{Math.abs(item.net).toLocaleString()}
                </td>
                <td>
                  <span className={`status-badge ${item.status}`}>
                    {item.status === 'completed' ? '완료' : '대기중'}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {filteredData.length === 0 && (
        <div className="empty-state">
          <p>해당 기간의 내역이 없습니다</p>
        </div>
      )}
    </div>
  )
}

export default Revenue
