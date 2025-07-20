import { useState, useEffect } from 'react'
import { MessageCircle, Send, ArrowLeft, User, Bot, Sparkles, Leaf, Shield, Home } from 'lucide-react'

function Chatbot() {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState([])
  const [showChat, setShowChat] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageSize, setImageSize] = useState('large')
  const [showImageOptions, setShowImageOptions] = useState(false)

  const imageSizes = {
    small: '40%',
    medium: '55%',
    large: '70%',
    xlarge: '85%'
  }

  async function generateAnswer() {
    if (!question.trim()) return
    
    setIsLoading(true)
    
    try {
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are VELMIRA, a professional skincare assistant. Provide helpful, accurate skincare advice for this question: "${question}". Keep your response informative but concise, and always recommend consulting a dermatologist for serious concerns.`
            }]
          }]
        })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "I apologize, but I couldn't generate a proper response. Please try rephrasing your question."
      
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: question },
        { sender: "bot", text: botResponse },
      ])
      setQuestion("")
    } catch (error) {
      console.error("Error generating answer:", error)
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: question },
        { sender: "bot", text: "I apologize, but I'm having trouble connecting to the AI service right now. Please check your API key and try again in a moment." },
      ])
      setQuestion("")
    } finally {
      setIsLoading(false)
    }
  }

  // Image Resize Controls
  const ImageControls = () => (
    <div className={`fixed top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg transition-all duration-300 z-40 ${showImageOptions ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
      <h4 className="text-sm font-semibold text-gray-800 mb-3">Image Size</h4>
      <div className="flex flex-col gap-2">
        {Object.keys(imageSizes).map((size) => (
          <button
            key={size}
            onClick={() => {
              setImageSize(size)
              setShowImageOptions(false)
            }}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              imageSize === size 
                ? 'bg-[#6d7028] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {size.charAt(0).toUpperCase() + size.slice(1)} ({imageSizes[size]})
          </button>
        ))}
      </div>
    </div>
  )

  // Landing Page Component
  if (!showChat) {
    return (
      <>
        <div 
          className="min-h-screen flex items-center justify-center p-2 sm:p-4 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #f8f9f6 0%, #f1f3ed 30%, #eaede3 70%, #e3e7d9 100%)'
          }}
        >
          {/* Subtle Background Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-[#6d7028]/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#6d7028]/8 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#6d7028]/6 rounded-full blur-lg"></div>
          
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-6 z-10">
              <div className="space-y-2 sm:space-y-4">
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-[#6d7028]">
                  VELMIRA
                </h1>
                <p className="text-base sm:text-lg md:text-2xl text-gray-700 font-light">Your Personal Skincare Assistant</p>
                <p className="text-xs sm:text-base md:text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
                  Discover personalized skincare solutions powered by AI. Get expert advice tailored to your unique skin needs.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setShowChat(true)}
                  className="group bg-[#6d7028] hover:bg-[#5a5d22] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <MessageCircle size={20} />
                  Start Consultation
                </button>
                
                <button
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  className="px-8 py-4 border-2 border-[#6d7028] text-[#6d7028] rounded-xl font-semibold hover:bg-[#6d7028] hover:text-white transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-10">
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-[#6d7028]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="text-[#6d7028]" size={24} />
                  </div>
                  <p className="font-semibold text-gray-800 mb-2">AI-Powered Analysis</p>
                  <p className="text-sm text-gray-600">Advanced skincare recommendations</p>
                </div>
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-[#6d7028]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="text-[#6d7028]" size={24} />
                  </div>
                  <p className="font-semibold text-gray-800 mb-2">Natural Solutions</p>
                  <p className="text-sm text-gray-600">Gentle, effective treatments</p>
                </div>
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-[#6d7028]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-[#6d7028]" size={24} />
                  </div>
                  <p className="font-semibold text-gray-800 mb-2">Expert Care</p>
                  <p className="text-sm text-gray-600">Professional guidance</p>
                </div>
              </div>
            </div>
            
            {/* Right Side - Image */}
            <div className="relative flex justify-center lg:justify-end mt-6 lg:mt-0">
              <div className="relative">
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl border border-gray-200"
                  style={{
                    width: imageSizes[imageSize],
                    minWidth: '140px',
                    maxWidth: '350px',
                    aspectRatio: '3/4'
                  }}
                >
                  <img
                    src="/essenceBottle.jpg"
                    alt="Premium Skincare"
                    className="w-full h-40 sm:h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-[#6d7028] text-white rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Bot size={20} />
                    <div>
                      <p className="text-xs font-semibold">AI Assistant</p>
                      <p className="text-xs opacity-80">Ready to help</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image Size Control Button */}
              <button
                onClick={() => setShowImageOptions(!showImageOptions)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
                title="Resize Image"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <ImageControls />
      </>
    )
  }

  // Chat Interface Component
  return (
    <div 
      className="min-h-screen flex flex-col items-center p-2 sm:p-4 relative"
      style={{
        background: 'linear-gradient(135deg, #f8f9f6 0%, #f1f3ed 30%, #eaede3 70%, #e3e7d9 100%)'
      }}
    >
      {/* Header */}
      <div className="w-full max-w-4xl mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-between bg-white/80 backdrop-blur-md rounded-xl p-2 sm:p-4 border border-gray-200 shadow-sm gap-2 sm:gap-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#6d7028] rounded-xl flex items-center justify-center text-white text-xl font-bold">
            V
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">VELMIRA</h1>
            <p className="text-gray-600 text-sm">AI Skincare Consultant</p>
          </div>
        </div>
        <button
          onClick={() => {
            setShowChat(false)
            setMessages([])
          }}
          className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>
      </div>

      {/* Chat Container */}
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-2 sm:p-4 flex flex-col gap-3 sm:gap-6 flex-1 border border-gray-200">
        {/* Messages Area */}
        <div className="flex flex-col gap-2 sm:gap-4 h-80 sm:h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#6d7028] scrollbar-track-gray-100">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#6d7028]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="text-[#6d7028]" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome to VELMIRA</h3>
              <p className="text-gray-600 mb-6">I'm here to help you with personalized skincare advice.</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "What's my skin type?",
                  "Morning routine help",
                  "Anti-aging advice",
                  "Acne treatment options"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setQuestion(suggestion)}
                    className="px-4 py-2 bg-[#6d7028]/10 text-[#6d7028] rounded-full text-sm hover:bg-[#6d7028]/20 transition-colors border border-[#6d7028]/20"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start gap-3 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.sender === "user" 
                    ? "bg-gray-100" 
                    : "bg-[#6d7028]/10"
                }`}>
                  {msg.sender === "user" ? (
                    <User className="text-gray-600" size={16} />
                  ) : (
                    <Bot className="text-[#6d7028]" size={16} />
                  )}
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm ${
                    msg.sender === "user"
                      ? "bg-[#6d7028] text-white rounded-tr-sm"
                      : "bg-gray-50 text-gray-800 border border-gray-200 rounded-tl-sm"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">
                    {msg.text}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3 max-w-[80%]">
                <div className="w-8 h-8 bg-[#6d7028]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-[#6d7028]" size={16} />
                </div>
                <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#6d7028] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#6d7028] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-[#6d7028] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-gray-600 text-sm">Analyzing your question...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex items-end gap-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows="2"
            placeholder="Ask me about your skincare concerns..."
            className="flex-1 rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#6d7028] focus:border-transparent resize-none bg-white shadow-sm"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                generateAnswer()
              }
            }}
            disabled={isLoading}
          />
          <button
            onClick={generateAnswer}
            disabled={!question.trim() || isLoading}
            className="bg-[#6d7028] hover:bg-[#5a5d22] disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg group"
          >
            <Send className={`w-5 h-5 transition-transform group-hover:scale-110 ${isLoading ? 'animate-pulse' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chatbot