import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Main Service Pages
import MainLayout from './components/main/MainLayout'
import Home from './pages/main/Home'
import FreePrompts from './pages/main/FreePrompts'
import PaidPrompts from './pages/main/PaidPrompts'
import PromptDetail from './pages/main/PromptDetail'
import PromptRequest from './pages/main/PromptRequest'
import PromptRequestDetail from './pages/main/PromptRequestDetail'
import PromptRequestWrite from './pages/main/PromptRequestWrite'
import Community from './pages/main/Community'
import Run from './pages/main/Run'
import AIModels from './pages/main/AIModels'
import Profile from './pages/main/Profile'
import Credits from './pages/main/Credits'

// Creator Dashboard
import Layout from './components/Layout'
import MyPerformance from './pages/MyPerformance'
import ContentUpload from './pages/ContentUpload'
import ContentManagement from './pages/ContentManagement'
import ReviewHistory from './pages/ReviewHistory'
import Revenue from './pages/Revenue'
import Inquiry from './pages/Inquiry'

// Admin Pages
import AdminLayout from './components/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminReviews from './pages/admin/AdminReviews'
import AdminCreators from './pages/admin/AdminCreators'

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Service - User facing */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="free" element={<FreePrompts />} />
          <Route path="paid" element={<PaidPrompts />} />
          <Route path="prompt/:id" element={<PromptDetail />} />
          <Route path="request" element={<PromptRequest />} />
          <Route path="request/write" element={<PromptRequestWrite />} />
          <Route path="request/:id" element={<PromptRequestDetail />} />
          <Route path="community" element={<Community />} />
          <Route path="run" element={<Run />} />
          <Route path="ai-models" element={<AIModels />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="credits" element={<Credits />} />
        </Route>

        {/* Creator Dashboard */}
        <Route path="/creator" element={<Layout />}>
          <Route index element={<Navigate to="/creator/performance" replace />} />
          <Route path="performance" element={<MyPerformance />} />
          <Route path="upload" element={<ContentUpload />} />
          <Route path="management" element={<ContentManagement />} />
          <Route path="review" element={<ReviewHistory />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="inquiry" element={<Inquiry />} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="creators" element={<AdminCreators />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
