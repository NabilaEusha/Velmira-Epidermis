import { FaHeart, FaUsers, FaShoppingBag, FaLeaf, FaTimes, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaRocket, FaGem, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const About = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  const openContactModal = () => {
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-md w-full relative transform transition-all duration-300 scale-100">
            <button 
              onClick={closeContactModal}
              aria-label="Close contact modal"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 min-h-[44px] min-w-[44px]"
            >
              <FaTimes className="text-xl" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7e973d] to-[#2d310e] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">V</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-[#2d310e] mb-2">Get In Touch</h3>
              <p className="text-gray-600 text-sm sm:text-base">We're here to help you!</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-[#f8f9fa] rounded-lg hover:bg-[#e9ecef] transition-colors duration-200 cursor-pointer">
                <FaEnvelope className="text-[#7e973d] mr-3 text-lg" />
                <div>
                  <p className="font-semibold text-[#2d310e]">Email</p>
                  <p className="text-gray-600 text-sm">hello@velmira.com</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-[#f8f9fa] rounded-lg hover:bg-[#e9ecef] transition-colors duration-200 cursor-pointer">
                <FaPhone className="text-[#7e973d] mr-3 text-lg" />
                <div>
                  <p className="font-semibold text-[#2d310e]">Phone</p>
                  <p className="text-gray-600 text-sm">+880 1234-567890</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-[#f8f9fa] rounded-lg hover:bg-[#e9ecef] transition-colors duration-200 cursor-pointer">
                <FaMapMarkerAlt className="text-[#7e973d] mr-3 text-lg" />
                <div>
                  <p className="font-semibold text-[#2d310e]">Address</p>
                  <p className="text-gray-600 text-sm">Chittagong, Bangladesh</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-[#f8f9fa] rounded-lg hover:bg-[#e9ecef] transition-colors duration-200 cursor-pointer">
                <FaGlobe className="text-[#7e973d] mr-3 text-lg" />
                <div>
                  <p className="font-semibold text-[#2d310e]">Website</p>
                  <p className="text-gray-600 text-sm">www.velmira.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={closeContactModal}
                aria-label="Close contact modal"
                className="bg-gradient-to-r from-[#7e973d] to-[#2d310e] text-white px-4 sm:px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 min-h-[44px] min-w-[44px] text-sm sm:text-base"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2d310e] via-[#7e973d] to-[#2d310e] text-white py-12 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-bounce"></div>
          <div className="absolute top-32 right-20 w-12 h-12 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full animate-bounce"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-2 sm:px-6 text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "var(--font-italiana)" }}>
            Welcome to Velmira
          </h1>
          <p className="text-base sm:text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
            Where shopping meets excellence and every purchase tells a story of quality and trust
          </p>
          <button 
            onClick={openContactModal}
            aria-label="Open contact modal"
            className="bg-white text-[#2d310e] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg min-h-[44px] min-w-[44px] text-sm sm:text-base"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-2 sm:px-6 py-8 sm:py-16">
        
        {/* Brand Story */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#2d310e] mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#7e973d] to-[#2d310e] mx-auto"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="text-center mb-8">
              <p className="text-base sm:text-xl text-gray-700 leading-relaxed mb-6">
                Welcome to Velmira, where quality meets innovation in the world of e-commerce. We're passionate about 
                creating exceptional shopping experiences that go beyond the ordinary. Our platform combines cutting-edge 
                technology with personalized service to bring you products that truly matter.
              </p>
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                At Velmira, we believe shopping should be intuitive, enjoyable, and rewarding. Every product we feature 
                is carefully selected to meet our high standards of quality and value.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
              <div className="text-center p-6 bg-gradient-to-br from-[#f8f9fa] to-[#e3f2fd] rounded-xl hover:transform hover:scale-105 transition-all duration-300">
                <FaRocket className="text-4xl text-[#7e973d] mx-auto mb-3" />
                <h3 className="font-bold text-[#2d310e] mb-2">Innovation First</h3>
                <p className="text-gray-600 text-sm">Cutting-edge technology meets exceptional user experience</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-[#fff3e0] to-[#fce4ec] rounded-xl hover:transform hover:scale-105 transition-all duration-300">
                <FaHeart className="text-4xl text-[#7e973d] mx-auto mb-3" />
                <h3 className="font-bold text-[#2d310e] mb-2">Customer Obsessed</h3>
                <p className="text-gray-600 text-sm">Your satisfaction drives everything we do, every single day</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-[#e8f5e8] to-[#f1f8e9] rounded-xl hover:transform hover:scale-105 transition-all duration-300">
                <FaLeaf className="text-4xl text-[#7e973d] mx-auto mb-3" />
                <h3 className="font-bold text-[#2d310e] mb-2">Sustainable Future</h3>
                <p className="text-gray-600 text-sm">Committed to environmentally conscious business practices</p>
              </div>
            </div>
          </div>
        </div>

        {/* Meet Our Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#2d310e] mb-4">Meet Our Founders</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#7e973d] to-[#2d310e] mx-auto"></div>
            <p className="text-gray-600 mt-4">The visionary team behind Velmira's success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Founder 1 */}
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-32 h-32 bg-gradient-to-r from-[#7e973d] to-[#2d310e] rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-white">NS</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-bold text-[#2d310e] mb-2">Nabila Sultana</h3>
              <div className="flex items-center justify-center mb-4">
                <span className="bg-gradient-to-r from-[#7e973d] to-[#2d310e] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">Co-Founder & CEO</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                The visionary leader driving Velmira's mission forward. Nabila combines strategic thinking with a 
                deep understanding of customer needs, ensuring that every aspect of our platform delivers exceptional value. 
                Her commitment to excellence shapes our company culture and product philosophy.
              </p>
              <div className="flex justify-center space-x-2 sm:space-x-4 text-[#7e973d]">
                <FaRocket className="text-xl" />
                <FaUsers className="text-xl" />
                <FaHeart className="text-xl" />
              </div>
            </div>

            {/* Founder 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-32 h-32 bg-gradient-to-r from-[#2d310e] to-[#7e973d] rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-white">TA</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-bold text-[#2d310e] mb-2">Tasnia Afrin</h3>
              <div className="flex items-center justify-center mb-4">
                <span className="bg-gradient-to-r from-[#2d310e] to-[#7e973d] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">Co-Founder & CTO</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                The technical mastermind behind Velmira's seamless user experience. Tasnia's expertise in modern web 
                technologies and user-centric design ensures our platform is not only powerful but also intuitive. 
                Her innovation drives our technological advancement and platform reliability.
              </p>
              <div className="flex justify-center space-x-2 sm:space-x-4 text-[#7e973d]">
                <FaShoppingBag className="text-xl" />
                <FaGem className="text-xl" />
                <FaRocket className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Velmira */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#2d310e] mb-4">Why Choose Velmira</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#7e973d] to-[#2d310e] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#7e973d] to-[#2d310e] rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaRocket className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-[#2d310e] mb-2 text-sm sm:text-base">Lightning Fast Delivery</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Swift and reliable shipping that gets your orders to you quickly</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7e973d] to-[#2d310e] rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaShieldAlt className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-[#2d310e] mb-2">Secure Shopping</h3>
              <p className="text-gray-600 text-sm">Advanced security measures protect your data and transactions</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7e973d] to-[#2d310e] rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaGem className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-[#2d310e] mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Carefully curated products that meet our strict quality standards</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7e973d] to-[#2d310e] rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaHeadset className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-[#2d310e] mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Dedicated customer service team ready to help anytime</p>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-[#2d310e] mb-4">Our Mission</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#7e973d] to-[#2d310e] mx-auto"></div>
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                To revolutionize online shopping by creating a platform that seamlessly blends cutting-edge technology 
                with exceptional customer service, delivering products and experiences that exceed expectations and 
                build lasting relationships with our customers.
              </p>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <p className="text-gray-600 italic text-lg">
                  "We're not just selling products; we're creating experiences that bring joy, 
                  convenience, and value to your everyday life."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#2d310e] to-[#7e973d] rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Velmira?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of satisfied customers who trust Velmira for their shopping needs
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <button 
                onClick={openContactModal}
                className="bg-white text-[#2d310e] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </button>
               <Link to="/products">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#2d310e] transition-all duration-300 transform hover:scale-105">
                Start Shopping
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;