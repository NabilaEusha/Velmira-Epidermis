const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-gradient-to-br from-[#c9c48b] via-[#d4d08f] to-[#beb974] px-6 md:px-12 lg:px-24 xl:px-36 2xl:px-52 py-12 mt-10 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 left-16 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${20 + (i * 15)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      {/* UPPER PART */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
        {/* Logo and Text */}
        <div className="flex-1 group">
          <div 
            className="transform transition-all duration-500 hover:scale-110 cursor-pointer relative"
            onClick={scrollToTop}
          >
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img 
              src="/blisslogo1.png" 
              alt="Bliss Logo" 
              className="relative w-32 h-auto filter drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300" 
            />
          </div>
          <p className="mt-6 text-sm md:text-base text-gray-800 font-medium leading-relaxed tracking-wide relative">
            <span className="relative z-10 bg-gradient-to-r from-gray-800 to-[#66631b] bg-clip-text text-transparent font-semibold">
              LET'S MAKE YOUR SKIN FLOURISH WITH OUR PRODUCTS
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#66631b] to-transparent transition-all duration-700 group-hover:w-full"></div>
          </p>
        </div>

        {/* Quick Links */}
        <nav className="flex-1" aria-label="Footer quick links">
          <h3 className="text-lg font-bold text-gray-800 mb-6 relative group">
            <span className="relative z-10">Quick Links</span>
            <div className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-[#66631b] to-[#8b8635] rounded-full transition-all duration-300 group-hover:w-20"></div>
            <div className="absolute -bottom-2 left-2 w-6 h-0.5 bg-[#66631b]/50 rounded-full"></div>
          </h3>
          <ul className="space-y-3">
            {[
              { name: 'Home', href: '/' },
              { name: 'About us', href: '/about' },
              { name: 'Shop', href: '/products' },
              { name: 'Explore', href: '/explore' },
              { name: 'AI Consultation', href: '/chatbot' }
            ].map((link) => (
              <li key={link.name} className="group">
                <a 
                  href={link.href}
                  className="text-sm md:text-base text-gray-700 hover:text-[#66631b] transition-all duration-300 relative flex items-center cursor-pointer transform hover:translate-x-2 min-h-[44px] min-w-[44px]"
                >
                  <span className="w-0 h-0.5 bg-[#66631b] transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></span>
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#66631b] to-transparent transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Info */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-6 relative group">
            <span className="relative z-10">Contact Us</span>
            <div className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-[#66631b] to-[#8b8635] rounded-full transition-all duration-300 group-hover:w-20"></div>
            <div className="absolute -bottom-2 left-2 w-6 h-0.5 bg-[#66631b]/50 rounded-full"></div>
          </h3>
          <div className="space-y-4">
            <div className="flex items-start group cursor-pointer">
              <div className="p-2 bg-white/20 rounded-lg border border-white/30 group-hover:bg-white/40 group-hover:border-[#66631b]/50 transition-all duration-300 mr-3 mt-0.5">
                <svg className="w-4 h-4 text-[#66631b] group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <p className="text-sm md:text-base text-gray-700 group-hover:text-[#66631b] transition-colors duration-300">
                5060 SNK, CUET, Chittagong, Bangladesh
              </p>
            </div>
            
            <div className="flex items-center group cursor-pointer">
              <div className="p-2 bg-white/20 rounded-lg border border-white/30 group-hover:bg-white/40 group-hover:border-[#66631b]/50 transition-all duration-300 mr-3">
                <svg className="w-4 h-4 text-[#66631b] group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <a 
                href="tel:+1234567890" 
                className="text-sm md:text-base text-gray-700 hover:text-[#66631b] transition-colors duration-300"
              >
                (123) 456-7890
              </a>
            </div>
            
            <div className="flex items-center group cursor-pointer">
              <div className="p-2 bg-white/20 rounded-lg border border-white/30 group-hover:bg-white/40 group-hover:border-[#66631b]/50 transition-all duration-300 mr-3">
                <svg className="w-4 h-4 text-[#66631b] group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <a 
                href="mailto:velmira5060@gmail.com" 
                className="text-sm md:text-base text-gray-700 hover:text-[#66631b] transition-all duration-300 relative"
              >
                <span className="relative">
                  velmira5060@gmail.com
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#66631b] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER PART */}
      <div className="relative z-10 mt-12 pt-8 border-t border-white/40">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-700 text-sm font-medium">
            <span className="relative">
              &copy; 2025 Velmira. All rights reserved.
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#66631b] transition-all duration-500 hover:w-full"></span>
            </span>
          </p>
          {/* Enhanced Social Media Icons */}
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            {[
              { name: 'GitHub', path: 'M22 12.08c0-5.522-4.477-10-10-10S2 6.558 2 12.08c0 4.411 3.07 8.083 7.305 9.27.535.098.73-.233.73-.518 0-.255-.009-.933-.014-1.832-2.97.647-3.595-1.433-3.595-1.433-.486-1.235-1.187-1.564-1.187-1.564-.97-.663.073-.65.073-.65 1.07.074 1.635 1.106 1.635 1.106.953 1.634 2.502 1.162 3.113.889.098-.695.373-1.163.68-1.43-2.373-.271-4.868-1.188-4.868-5.288 0-1.168.417-2.124 1.1-2.874-.111-.271-.478-1.363.104-2.842 0 0 .9-.288 2.95 1.095.856-.241 1.774-.36 2.688-.364.914.004 1.832.123 2.688.364 2.047-1.384 2.946-1.095 2.946-1.095.584 1.48.217 2.572.106 2.842.685.75 1.1 1.706 1.1 2.874 0 4.111-2.498 5.014-4.878 5.281.384.33.726.983.726 1.98 0 1.429-.013 2.583-.013 2.933 0 .287.193.62.735.515C18.93 20.16 22 16.491 22 12.08z' },
              { name: 'Twitter', path: 'M22.23 5.924c-.813.36-1.684.603-2.598.711a4.517 4.517 0 001.984-2.486c-.867.514-1.826.888-2.847 1.09a4.503 4.503 0 00-7.673 4.106 12.78 12.78 0 01-9.292-4.71 4.501 4.501 0 001.392 6.008 4.482 4.482 0 01-2.044-.563v.057a4.504 4.504 0 003.605 4.416 4.515 4.515 0 01-2.036.077 4.506 4.506 0 004.205 3.127 9.034 9.034 0 01-5.602 1.932c-.363 0-.722-.021-1.079-.064a12.765 12.765 0 006.917 2.027c8.304 0 12.847-6.878 12.847-12.847 0-.195-.004-.39-.014-.583a9.183 9.183 0 002.252-2.343c-.825.367-1.71.614-2.63.723a4.518 4.518 0 001.979-2.495z' },
              { name: 'Facebook', path: 'M21.5 0h-19A2.5 2.5 0 000 2.5v19A2.5 2.5 0 002.5 24h10.156v-8.797H9.548v-3.23h3.108V9.03c0-3.067 1.872-4.736 4.605-4.736 1.31 0 2.435.097 2.76.14v3.202l-1.897.001c-1.49 0-1.779.708-1.779 1.747v2.289h3.557l-.464 3.23h-3.093V24H21.5a2.5 2.5 0 002.5-2.5v-19A2.5 2.5 0 0021.5 0z' }
            ].map((social) => (
              <a 
                key={social.name}
                href="#" 
                aria-label={social.name}
                className="group relative p-3 min-h-[44px] min-w-[44px] bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/40 hover:border-[#66631b]/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="relative w-5 h-5 text-gray-700 group-hover:text-[#66631b] transition-all duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#66631b]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;