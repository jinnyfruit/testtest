import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  Search,
  User,
  Clock,
  ChevronRight,
  Paperclip,
  Image as ImageIcon,
  Smile
} from 'lucide-react'
import './Inquiry.css'

// 샘플 대화 목록
const sampleChats = [
  {
    id: 1,
    user: 'design_lover',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=design',
    lastMessage: '프롬프트 사용법에 대해 질문이 있어요',
    time: '방금 전',
    unread: 2,
    messages: [
      { id: 1, sender: 'user', text: '안녕하세요! 구매한 프롬프트 관련해서 질문이 있어요', time: '14:30' },
      { id: 2, sender: 'user', text: '프롬프트 사용법에 대해 질문이 있어요', time: '14:31' },
    ]
  },
  {
    id: 2,
    user: 'art_creator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=art',
    lastMessage: '감사합니다! 잘 적용됐어요',
    time: '1시간 전',
    unread: 0,
    messages: [
      { id: 1, sender: 'user', text: '사이버펑크 프롬프트 구매했는데요', time: '12:15' },
      { id: 2, sender: 'me', text: '안녕하세요! 어떤 점이 궁금하신가요?', time: '12:20' },
      { id: 3, sender: 'user', text: '네거티브 프롬프트도 같이 적용해야 하나요?', time: '12:22' },
      { id: 4, sender: 'me', text: '네, 네거티브 프롬프트를 같이 사용하시면 더 좋은 결과를 얻으실 수 있어요!', time: '12:25' },
      { id: 5, sender: 'user', text: '감사합니다! 잘 적용됐어요', time: '13:00' },
    ]
  },
  {
    id: 3,
    user: 'photo_master',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=photo',
    lastMessage: '다른 모델에서도 사용 가능한가요?',
    time: '3시간 전',
    unread: 1,
    messages: [
      { id: 1, sender: 'user', text: '다른 모델에서도 사용 가능한가요?', time: '11:00' },
    ]
  },
  {
    id: 4,
    user: 'creative_mind',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=creative',
    lastMessage: '리뷰 남겼어요! 정말 좋은 프롬프트네요',
    time: '1일 전',
    unread: 0,
    messages: [
      { id: 1, sender: 'user', text: '리뷰 남겼어요! 정말 좋은 프롬프트네요', time: '어제 18:30' },
      { id: 2, sender: 'me', text: '감사합니다! 좋은 리뷰 남겨주셔서 정말 감사해요 😊', time: '어제 19:00' },
    ]
  },
]

function ChatListItem({ chat, isActive, onClick }) {
  return (
    <motion.div 
      className={`chat-list-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
      whileHover={{ x: 4 }}
    >
      <div className="chat-avatar">
        <img src={chat.avatar} alt={chat.user} />
        {chat.unread > 0 && (
          <span className="unread-badge">{chat.unread}</span>
        )}
      </div>
      <div className="chat-preview">
        <div className="chat-header">
          <span className="chat-user">{chat.user}</span>
          <span className="chat-time">{chat.time}</span>
        </div>
        <p className="chat-last-message">{chat.lastMessage}</p>
      </div>
      <ChevronRight size={16} className="chat-arrow" />
    </motion.div>
  )
}

function Inquiry() {
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [messages, setMessages] = useState([])

  const handleSelectChat = (chat) => {
    setSelectedChat(chat)
    setMessages(chat.messages)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages(prev => [...prev, newMessage])
    setMessage('')
  }

  const filteredChats = sampleChats.filter(chat =>
    chat.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="inquiry-page">
      {/* Chat List */}
      <motion.div 
        className="chat-list-panel"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="panel-header">
          <h2>메시지</h2>
          <span className="message-count">{sampleChats.length}</span>
        </div>

        <div className="search-box">
          <Search size={16} />
          <input 
            type="text"
            placeholder="대화 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="chat-list">
          {filteredChats.map(chat => (
            <ChatListItem 
              key={chat.id}
              chat={chat}
              isActive={selectedChat?.id === chat.id}
              onClick={() => handleSelectChat(chat)}
            />
          ))}
        </div>
      </motion.div>

      {/* Chat Window */}
      <motion.div 
        className="chat-window"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {selectedChat ? (
          <>
            <div className="chat-window-header">
              <div className="chat-user-info">
                <img src={selectedChat.avatar} alt={selectedChat.user} />
                <div>
                  <span className="user-name">{selectedChat.user}</span>
                  <span className="user-status">온라인</span>
                </div>
              </div>
            </div>

            <div className="messages-container">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    className={`message ${msg.sender}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="message-bubble">
                      <p>{msg.text}</p>
                      <span className="message-time">{msg.time}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <form className="message-input-form" onSubmit={handleSendMessage}>
              <div className="input-actions">
                <button type="button" className="input-action-btn">
                  <Paperclip size={18} />
                </button>
                <button type="button" className="input-action-btn">
                  <ImageIcon size={18} />
                </button>
              </div>
              <input 
                type="text"
                placeholder="메시지를 입력하세요..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="button" className="input-action-btn">
                <Smile size={18} />
              </button>
              <motion.button 
                type="submit"
                className="send-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!message.trim()}
              >
                <Send size={18} />
              </motion.button>
            </form>
          </>
        ) : (
          <div className="empty-chat">
            <div className="empty-icon">
              <MessageCircle size={48} />
            </div>
            <h3>대화를 선택하세요</h3>
            <p>왼쪽 목록에서 대화를 선택하면 메시지를 확인할 수 있습니다</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Inquiry
