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
  Filter,
  BarChart3,
  LineChart as LineChartIcon
} from 'lucide-react'
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  ComposedChart,
  Line
} from 'recharts'
import './MyPerformance.css'

// 샘플 데이터
const salesData = [
  { name: '1월', sales: 45, revenue: 2400 },
  { name: '2월', sales: 52, revenue: 3100 },
  { name: '3월', sales: 78, revenue: 9800 },
  { name: '4월', sales: 65, revenue: 5200 },
  { name: '5월', sales: 89, revenue: 7800 },
  { name: '6월', sales: 72, revenue: 6100 },
  { name: '7월', sales: 95, revenue: 8500 },
]

const recentSales = [
  { id: 1, title: '사이버펑크 네온 캐릭터', price: 15000, date: '2시간 전', buyer: 'user***' },
  { id: 2, title: '미니멀 로고 디자인 프롬프트', price: 8000, date: '5시간 전', buyer: 'design***' },
  { id: 3, title: '판타지 풍경 일러스트', price: 25000, date: '1일 전', buyer: 'art***' },
  { id: 4, title: '포토리얼 인물 사진', price: 12000, date: '2일 전', buyer: 'photo***' },
]

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        <div className="tooltip-items">
          <div className="tooltip-item revenue">
            <span className="tooltip-dot"></span>
            <span className="tooltip-name">매출</span>
            <span className="tooltip-value">₩{((payload[1]?.value || 0) * 1000).toLocaleString()}</span>
          </div>
          <div className="tooltip-item sales">
            <span className="tooltip-dot"></span>
            <span className="tooltip-name">판매</span>
            <span className="tooltip-value">{payload[0]?.value || 0}건</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

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
            <div className="chart-title-group">
              <h3 className="chart-title">매출 & 판매 추이</h3>
              <span className="chart-period">최근 7개월</span>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot revenue"></span>
                <span>매출</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot sales"></span>
                <span>판매수</span>
              </div>
            </div>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={salesData} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.5}/>
                    <stop offset="50%" stopColor="#a78bfa" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#c4b5fd" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.7}/>
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#9ca3af"
                  fontSize={12}
                  fontWeight={500}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                  dy={10}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#9ca3af"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value >= 1000 ? `₩${(value/1000).toFixed(0)}M` : `₩${value}K`}
                  width={55}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#9ca3af"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}건`}
                  width={50}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(139, 92, 246, 0.05)' }}
                />
                <Bar 
                  yAxisId="right"
                  dataKey="sales" 
                  fill="url(#colorSales)"
                  radius={[6, 6, 0, 0]}
                  barSize={36}
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  dot={{ fill: '#8b5cf6', strokeWidth: 3, r: 5, stroke: '#fff', filter: 'url(#glow)' }}
                  activeDot={{ r: 8, stroke: '#8b5cf6', strokeWidth: 3, fill: '#fff' }}
                />
              </ComposedChart>
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
