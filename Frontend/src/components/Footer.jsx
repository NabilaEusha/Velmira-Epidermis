const Footer = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#c9c48b] via-[#d4d08f] to-[#beb974] px-6 md:px-12 lg:px-24 xl:px-36 2xl:px-52 py-12 mt-10 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-20 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-16 w-32 h-32 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* UPPER PART */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
        {/* Logo and Text */}
        <div className="flex-1">
          <div className="transform transition-transform duration-300 hover:scale-105">
            <img src="/blisslogo1.png" alt="Bliss Logo" className="w-32 h-auto filter drop-shadow-md" />
          </div>
          <p className="mt-4 text-sm md:text-base text-gray-800 font-medium leading-relaxed">
            LET'S MAKE YOUR SKIN FLOURISH WITH OUR PRODUCTS
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 relative">
            Quick Links
            <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#66631b] rounded-full"></div>
          </h3>
          <ul className="space-y-2">
            {['Home', 'About us', 'Shop', 'Contact'].map((link) => (
              <li key={link}>
                <a 
                  href="#" 
                  className="text-sm md:text-base text-gray-700 hover:text-[#66631b] transition-all duration-300 relative group"
                >
                  {link}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#66631b] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 relative">
            Contact Us
            <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#66631b] rounded-full"></div>
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-[#66631b] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <p className="text-sm md:text-base text-gray-700">5060 SNK, CUET, Chittagong, Bangladesh</p>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-[#66631b] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <p className="text-sm md:text-base text-gray-700">(123) 456-7890</p>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-[#66631b] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <a href="mailto:velmira5060@gmail.com" className="text-sm md:text-base text-gray-700 hover:text-[#66631b] transition-colors duration-300">velmira5060@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER PART */}
      <div className="relative z-10 mt-8 pt-6 border-t border-white/40">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-700 text-sm">&copy; 2025 Velmira. All rights reserved.</p>
          
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            {[
              { name: 'GitHub', path: 'M22 12.08c0-5.522-4.477-10-10-10S2 6.558 2 12.08c0 4.411 3.07 8.083 7.305 9.27.535.098.73-.233.73-.518 0-.255-.009-.933-.014-1.832-2.97.647-3.595-1.433-3.595-1.433-.486-1.235-1.187-1.564-1.187-1.564-.97-.663.073-.65.073-.65 1.07.074 1.635 1.106 1.635 1.106.953 1.634 2.502 1.162 3.113.889.098-.695.373-1.163.68-1.43-2.373-.271-4.868-1.188-4.868-5.288 0-1.168.417-2.124 1.1-2.874-.111-.271-.478-1.363.104-2.842 0 0 .9-.288 2.95 1.095.856-.241 1.774-.36 2.688-.364.914.004 1.832.123 2.688.364 2.047-1.384 2.946-1.095 2.946-1.095.584 1.48.217 2.572.106 2.842.685.75 1.1 1.706 1.1 2.874 0 4.111-2.498 5.014-4.878 5.281.384.33.726.983.726 1.98 0 1.429-.013 2.583-.013 2.933 0 .287.193.62.735.515C18.93 20.16 22 16.491 22 12.08z' },
              { name: 'Twitter', path: 'M22.23 5.924c-.813.36-1.684.603-2.598.711a4.517 4.517 0 001.984-2.486c-.867.514-1.826.888-2.847 1.09a4.503 4.503 0 00-7.673 4.106 12.78 12.78 0 01-9.292-4.71 4.501 4.501 0 001.392 6.008 4.482 4.482 0 01-2.044-.563v.057a4.504 4.504 0 003.605 4.416 4.515 4.515 0 01-2.036.077 4.506 4.506 0 004.205 3.127 9.034 9.034 0 01-5.602 1.932c-.363 0-.722-.021-1.079-.064a12.765 12.765 0 006.917 2.027c8.304 0 12.847-6.878 12.847-12.847 0-.195-.004-.39-.014-.583a9.183 9.183 0 002.252-2.343c-.825.367-1.71.614-2.63.723a4.518 4.518 0 001.979-2.495z' },
              { name: 'Facebook', path: 'M21.5 0h-19A2.5 2.5 0 000 2.5v19A2.5 2.5 0 002.5 24h10.156v-8.797H9.548v-3.23h3.108V9.03c0-3.067 1.872-4.736 4.605-4.736 1.31 0 2.435.097 2.76.14v3.202l-1.897.001c-1.49 0-1.779.708-1.779 1.747v2.289h3.557l-.464 3.23h-3.093V24H21.5a2.5 2.5 0 002.5-2.5v-19A2.5 2.5 0 0021.5 0z' }
            ].map((social) => (
              <a 
                key={social.name}
                href="#" 
                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/30 hover:border-[#66631b]/50 transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-5 h-5 text-gray-700 hover:text-[#66631b] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;