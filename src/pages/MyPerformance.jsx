import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart, 
  DollarSign, 
  CreditCard,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import './MyPerformance.css'

// 샘플 데이터
const salesData = [
  { name: '1월', sales: 4000, revenue: 2400 },
  { name: '2월', sales: 3000, revenue: 1398 },
  { name: '3월', sales: 2000, revenue: 9800 },
  { name: '4월', sales: 2780, revenue: 3908 },
  { name: '5월', sales: 1890, revenue: 4800 },
  { name: '6월', sales: 2390, revenue: 3800 },
  { name: '7월', sales: 3490, revenue: 4300 },
]

const recentSales = [
  { id: 1, title: '사이버펑크 네온 캐릭터', price: 15000, date: '2시간 전', buyer: 'user***' },
  { id: 2, title: '미니멀 로고 디자인 프롬프트', price: 8000, date: '5시간 전', buyer: 'design***' },
  { id: 3, title: '판타지 풍경 일러스트', price: 25000, date: '1일 전', buyer: 'art***' },
  { id: 4, title: '포토리얼 인물 사진', price: 12000, date: '2일 전', buyer: 'photo***' },
]

function StatCard({ icon: Icon, title, value, change, changeType, delay }) {
  const isPositive = changeType === 'positive'
  
  return (
    <motion.div 
      className="stat-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="stat-header">
        <div className={`stat-icon ${isPositive ? 'positive' : 'negative'}`}>
          <Icon size={20} />
        </div>
        <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          <span>{change}</span>
        </div>
      </div>
      <div className="stat-body">
        <span className="stat-value">{value}</span>
        <span className="stat-title">{title}</span>
      </div>
    </motion.div>
  )
}

function MyPerformance() {
  const navigate = useNavigate()
  const [period, setPeriod] = useState('month')
  const [productType, setProductType] = useState('all')

  return (
    <div className="performance-page">
      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard 
          icon={ShoppingCart}
          title="총 판매 수"
          value="1,234"
          change="+12.5%"
          changeType="positive"
          delay={0}
        />
        <StatCard 
          icon={DollarSign}
          title="총 매출"
          value="₩4,567,890"
          change="+8.2%"
          changeType="positive"
          delay={0.05}
        />
        <StatCard 
          icon={CreditCard}
          title="정산 가능 금액"
          value="₩2,345,000"
          change="+15.3%"
          changeType="positive"
          delay={0.1}
        />
        <StatCard 
          icon={Calendar}
          title="이번 달 판매"
          value="89"
          change="-3.1%"
          changeType="negative"
          delay={0.15}
        />
        <StatCard 
          icon={TrendingUp}
          title="수익"
          value="₩890,000"
          change="+22.4%"
          changeType="positive"
          delay={0.2}
        />
        <StatCard 
          icon={TrendingDown}
          title="전월 대비 증감"
          value="+18.7%"
          change="+5.2%"
          changeType="positive"
          delay={0.25}
        />
      </div>

      {/* Filters */}
      <motion.div 
        className="filters-section"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="filter-group">
          <Filter size={16} />
          <span>필터</span>
        </div>
        <div className="filter-buttons">
          <span className="filter-category">기간:</span>
          {['day', 'week', 'month', 'year'].map((p) => (
            <button 
              key={p}
              className={`filter-btn ${period === p ? 'active' : ''}`}
              onClick={() => setPeriod(p)}
            >
              {p === 'day' ? '일' : p === 'week' ? '주' : p === 'month' ? '월' : '년'}
            </button>
          ))}
        </div>
        <div className="filter-buttons">
          <span className="filter-category">상품:</span>
          {['all', 'paid', 'free'].map((t) => (
            <button 
              key={t}
              className={`filter-btn ${productType === t ? 'active' : ''}`}
              onClick={() => setProductType(t)}
            >
              {t === 'all' ? '전체' : t === 'paid' ? '유료' : '무료'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="charts-section">
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <div className="chart-header">
            <h3 className="chart-title">매출 추이</h3>
            <span className="chart-period">최근 7개월</span>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8a2be2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8a2be2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#808080"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#808080"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₩${value / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{
                    background: '#1a1a1a',
                    border: '1px solid #3a3a3a',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                  }}
                  labelStyle={{ color: '#e0e0e0', fontWeight: 600 }}
                  itemStyle={{ color: '#b0b0b0' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8a2be2" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          className="chart-card recent-sales"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="chart-header">
            <h3 className="chart-title">최근 판매</h3>
            <button className="view-all-btn" onClick={() => navigate('/creator/revenue')}>전체 보기</button>
          </div>
          <div className="sales-list">
            {recentSales.map((sale, index) => (
              <motion.div 
                key={sale.id}
                className="sale-item"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.05, duration: 0.3 }}
              >
                <div className="sale-thumbnail">
                  <img 
                    src={`https://picsum.photos/seed/${sale.id}/80/80`} 
                    alt={sale.title}
                  />
                </div>
                <div className="sale-info">
                  <span className="sale-title">{sale.title}</span>
                  <span className="sale-buyer">{sale.buyer}</span>
                </div>
                <div className="sale-meta">
                  <span className="sale-price">₩{sale.price.toLocaleString()}</span>
                  <span className="sale-date">{sale.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MyPerformance
