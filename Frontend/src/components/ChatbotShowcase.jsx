import { useState } from 'react'
import { MessageCircle, Bot, Sparkles, ArrowRight, Zap, Heart, Shield } from 'lucide-react'

function ChatbotShowcase({ onStartChat }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="py-10 sm:py-16 px-2 sm:px-4 bg-gradient-to-r from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-20 w-24 h-24 bg-[#414312]/8 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-20 w-32 h-32 bg-[#414312]/6 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Compact Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#414312]/10 text-[#414312] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Bot className="w-4 h-4" />
            AI Skincare Assistant
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Get Instant <span className="text-[#414312]">Expert Advice</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chat with VELMIRA, our AI skincare consultant, for personalized recommendations
          </p>
        </div>

        {/* Main Content - Landscape Layout */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-4 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-center">
            
            {/* Left - Compact Chat Preview */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden max-w-sm mx-auto">
                {/* Mini Chat Header */}
                <div className="bg-gradient-to-r from-[#414312] to-[#525518] text-white px-4 py-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">VELMIRA</h4>
                    <p className="text-xs opacity-80">Online now</p>
                  </div>
                  <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>

                {/* Mini Chat Messages */}
                <div className="p-4 space-y-3">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-[#414312]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-[#414312]" />
                    </div>
                    <div className="bg-white border rounded-lg px-3 py-2 text-xs">
                      Hi! What's your skin concern?
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-[#414312] text-white rounded-lg px-3 py-2 text-xs max-w-[120px]">
                      Dry skin issues
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-[#414312]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-[#414312]" />
                    </div>
                    <div className="bg-white border rounded-lg px-3 py-2 text-xs">
                      I recommend gentle hydrating products...
                    </div>
                  </div>

                  {/* Mini Typing Indicator */}
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-[#414312]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-[#414312]" />
                    </div>
                    <div className="bg-white border rounded-lg px-3 py-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-[#414312] rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-[#414312] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1.5 h-1.5 bg-[#414312] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Features Grid */}
            <div className="lg:col-span-1 grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-[#414312]/10 rounded-lg flex items-center justify-center text-[#414312]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Instant Analysis</h4>
                  <p className="text-gray-600 text-xs">AI-powered recommendations</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-[#414312]/10 rounded-lg flex items-center justify-center text-[#414312]">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Personalized Care</h4>
                  <p className="text-gray-600 text-xs">Tailored to your skin type</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-[#414312]/10 rounded-lg flex items-center justify-center text-[#414312]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Expert Guidance</h4>
                  <p className="text-gray-600 text-xs">Dermatology-backed advice</p>
                </div>
              </div>
            </div>

            {/* Right - CTA Section */}
            <div className="lg:col-span-1 text-center lg:text-left space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  Ready to Transform Your Skin?
                </h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                  Start your personalized skincare journey with our AI consultant - completely free.
                </p>
              </div>

              <button
                onClick={onStartChat}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label="Start Consultation"
                className="group w-full lg:w-auto bg-gradient-to-r from-[#414312] to-[#525518] hover:from-[#363011] hover:to-[#414312] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 min-h-[44px] min-w-[44px]"
              >
                <MessageCircle className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
                Start Consultation
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </button>

              {/* Quick Stats */}
              <div className="flex flex-col xs:flex-row items-center justify-center lg:justify-start gap-3 xs:gap-6 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-lg font-bold text-[#414312]">5K+</p>
                  <p className="text-xs text-gray-600">Happy Users</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#414312]">24/7</p>
                  <p className="text-xs text-gray-600">Available</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#414312]">Free</p>
                  <p className="text-xs text-gray-600">No Cost</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Badge */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-[#414312]/5 text-[#414312] px-4 py-2 rounded-full text-sm">
            <Shield className="w-4 h-4" />
            Private & Secure • No Registration Required
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChatbotShowcase;