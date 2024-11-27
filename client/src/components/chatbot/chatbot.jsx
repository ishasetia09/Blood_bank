import React, { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, X, MinusCircle } from "lucide-react"
import "./chatbot.css"


const initialMessage = {
  text:
    "Hello! I'm your assistant. How can I help you today?\n\nYou can ask about:\n 1. Appointment booking\n 2. Department information\n 3. Emergency services\n 4. Visiting hours \n 5. How can i register?",
  isBot: true,
  timestamp: new Date()
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([initialMessage])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)

const scrollToBottom = () => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
};


  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = {
      text: input,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")

    setTimeout(() => {
      const botResponse = generateResponse(input.toLowerCase())
      setMessages(prev => [
        ...prev,
        {
          text: botResponse,
          isBot: true,
          timestamp: new Date()
        }
      ])
    }, 1000)
  }

  const generateResponse = input => {
    if (input.includes("appointment") || input.includes("book")) {
      return "To book an appointment, please contact us at 1-800-HOSPITAL"
    } else if (input.includes("emergency")) {
      return "For emergencies:\n• Call 911 immediately\n• Our ER is open 24/7\n• Location: Ground Floor, East Wing\n• Direct Emergency Line: 1-800-EMERGENCY"
    } else if (input.includes("visiting") || input.includes("hours")) {
      return "Visiting Hours:\n• General Wards: 10 AM - 8 PM\n• ICU: 11 AM - 12 PM & 5 PM - 6 PM\n• Pediatrics: 24/7 for parents"
    } else if (input.includes("department")) {
      return "Our Departments:\n• Cardiology\n• Neurology\n• Orthopedics\n• Pediatrics\n• Oncology\n• General Medicine\n\nWhich department would you like to know more about?"
    }else if (input.includes("register")) {
      return "Click on 'Register' and fill out the form with your details, including your contact info."
    }else {
      return "I'm not sure I understand. Could you please specify if you need help with:\n1. Appointment booking\n2. Department information\n3. Emergency services\n4. Visiting hours\n 5.How can I register  "
    }
  }

  return (
    <div className="chatbot">
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="chat-button"
          style={
            {
              padding: "14px",
              borderRadius:"7%"
          }
        }
        >
          <MessageCircle size={24} />
          <span>Chat with us</span>
        </button>
      )}

      {isOpen && (
        <div className={`chat-window ${isMinimized ? "minimized" : ""}`}>
          <div className="chat-header">
            <div className="header-title">
              <MessageCircle size={20} />
              <h3>Chat with us</h3>
            </div>
            <div className="header-actions">
              
              <button
                onClick={() => setIsOpen(false)}
                className="header-button"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="messages">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${message.isBot ? "bot" : "user"}`}
                  >
                    <div className="message-content">
                      <p className="message-text">{message.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="input-area">
                <div className="input-container">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..."
                    className="chat-input"
                  />
                  <button onClick={handleSend} className="send-button">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
