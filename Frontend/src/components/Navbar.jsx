import { FaSearch, FaUser, FaRobot, FaStore, FaBars, FaTimes } from 'react-icons/fa';
import ShoppingBacketIcon from '@mui/icons-material/ShoppingBasket';
import { useSelector } from "react-redux"
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/products/${search}`;
    }
  };

  const handleSearchIconClick = () => {
    if (!isSearchExpanded) {
      setIsSearchExpanded(true);
    } else if (search.trim()) {
      window.location.href = `/products/${search}`;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative bg-gradient-to-r from-white via-[#fafbf7] to-white shadow-xl border-b border-[#e8ecd4]">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#cedeb1] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-24 h-24 bg-[#6d7028] rounded-full blur-2xl"></div>
      </div>

      {/* Main Navbar Container */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between h-[90px]">
          {/* Logo Section */}
          <Link to="/" className="relative z-10">
            <div className="group cursor-pointer transition-transform duration-300 hover:scale-105">
              <img 
                src="/blisslogo1.png" 
                alt="Bliss Logo" 
                className="h-39 w-auto drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300"               />
            </div>
          </Link>

          {/* Navigation Section */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            
            {/* AI Consultation Button */}
            <Link to="/chatbot">
              <button className="group relative flex items-center space-x-2 px-3 lg:px-6 py-2 lg:py-2.5 bg-white/80 backdrop-blur-sm border border-[#cedeb1]/40 rounded-2xl hover:bg-[#cedeb1]/20 hover:border-[#6d7028]/60 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-400 text-[#414312] font-medium overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#cedeb1]/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 -translate-x-full"></div>
                <FaRobot className="text-[#6d7028] group-hover:text-[#414312] transition-all duration-300 text-sm lg:text-base group-hover:rotate-12" />
                <span className="relative font-semibold tracking-wide text-sm lg:text-base">AI Consultation</span>
              </button>
            </Link>
            
            {/* Shop Button */}
            <Link to="/products">
              <button className="group relative flex items-center space-x-2 px-3 lg:px-6 py-2 lg:py-2.5 bg-white/80 backdrop-blur-sm border border-[#cedeb1]/40 rounded-2xl hover:bg-[#cedeb1]/20 hover:border-[#6d7028]/60 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-400 text-[#414312] font-medium overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#cedeb1]/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 -translate-x-full"></div>
                <FaStore className="text-[#6d7028] group-hover:text-[#414312] transition-all duration-300 text-sm lg:text-base group-hover:scale-110" />
                <span className="relative font-semibold tracking-wide text-sm lg:text-base">Shop</span>
              </button>
            </Link>

            {/* Search Section */}
            <div className="flex items-center">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className={`transition-all duration-500 ease-out ${
                  isSearchExpanded ? 'w-[200px] lg:w-[280px] opacity-100 mr-0' : 'w-0 opacity-0 overflow-hidden'
                }`}>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white/90 backdrop-blur-sm border border-[#cedeb1]/50 rounded-l-2xl outline-none focus:border-[#6d7028] focus:bg-white focus:shadow-lg transition-all duration-300 placeholder-[#6d7028]/60 text-[#414312] font-medium text-sm lg:text-base"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onBlur={() => {
                      if (!search.trim()) {
                        setTimeout(() => setIsSearchExpanded(false), 200);
                      }
                    }}
                    autoFocus={isSearchExpanded}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSearchIconClick}
                  className={`group relative p-2 lg:p-3 bg-white/80 backdrop-blur-sm border border-[#cedeb1]/40 hover:bg-[#cedeb1]/20 hover:border-[#6d7028]/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-400 cursor-pointer overflow-hidden ${
                    isSearchExpanded 
                      ? 'rounded-r-2xl border-l-0' 
                      : 'rounded-2xl'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#cedeb1]/30 to-[#6d7028]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FaSearch className="relative z-10 text-base lg:text-lg text-[#6d7028] group-hover:text-[#414312] group-hover:scale-110 transition-all duration-300" />
                </button>
              </form>
            </div>

            {/* Cart Button */}
            <Link to="/cart">
              <div className="group relative p-2 lg:p-3 bg-white/80 backdrop-blur-sm border border-[#cedeb1]/40 rounded-2xl hover:bg-[#cedeb1]/20 hover:border-[#6d7028]/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-400 cursor-pointer">
                <Badge 
                  badgeContent={cart.quantity} 
                  color="secondary"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#6d7028',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.75rem'
                    }
                  }}
                >
                  <ShoppingBacketIcon className="text-[#6d7028] group-hover:text-[#414312] text-[20px] lg:text-[26px] group-hover:scale-110 transition-all duration-300" />
                </Badge>
              </div>
            </Link>

            {/* User Account */}
            <div className="group relative flex items-center cursor-pointer space-x-2 lg:space-x-3 px-3 lg:px-5 py-2 lg:py-2.5 bg-white/80 backdrop-blur-sm border border-[#cedeb1]/40 rounded-2xl hover:bg-[#cedeb1]/20 hover:border-[#6d7028]/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-400 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#cedeb1]/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 -translate-x-full"></div>
              <FaUser className="relative z-10 text-[#6d7028] group-hover:text-[#414312] transition-all duration-300 text-sm lg:text-base group-hover:scale-110" />
              {!user.currentUser ? (
                <Link to="/login">
                  <span className="relative z-10 text-[#414312] group-hover:text-[#131402] font-semibold transition-all duration-300 tracking-wide text-sm lg:text-base">Login</span>
                </Link>
              ) : (
                <Link to="/myaccount">
                  <span className="relative z-10 text-[#6d7028] group-hover:text-[#414312] transition-all duration-300 font-semibold tracking-wide max-w-[80px] lg:max-w-[100px] truncate text-sm lg:text-base">
                    {user.currentUser.name}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Logo */}
          <Link to="/" className="relative z-10">
            <div className="group cursor-pointer transition-transform duration-300 hover:scale-105">
              <img 
                src="/blisslogo1.png" 
                alt="Bliss Logo" 
                className="h-10 lg:h-12 w-auto drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300" 
              />
            </div>
          </Link>

          {/* Mobile Right Section */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <div className="flex items-center">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className={`transition-all duration-500 ease-out ${
                  isSearchExpanded ? 'w-[200px] opacity-100 mr-0' : 'w-0 opacity-0 overflow-hidden'
                }`}>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-3 py-2 bg-white/90 backdrop-blur-sm border border-[#cedeb1]/50 rounded-l-2xl outline-none focus:border-[#6d7028] focus:bg-white focus:shadow-lg transition-all duration-300 placeholder-[#6d7028]/60 text-[#414312] font-medium text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onBlur={() => {
                      if (!search.trim()) {
                        setTimeout(() => setIsSearchExpanded(false), 200);
                      }
                    }}
                    autoFocus={isSearchExpanded}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSearchIconClick}
                  className={`group relative p-2 bg-white/80 backdrop-blur-sm border border-[#cedeb1]/40 hover:bg-[#cedeb1]/20 hover:border-[#6d7028]/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-400 cursor-pointer overflow-hidden ${
                    isSearchExpanded 
                      ? 'rounded-r-2xl border-l-0' 
                      : 'rounded-2xl'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#cedeb1]/30 to-[#6d7028]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FaSearch className="relative z-10 text-sm text-[#6d7028] group-hover:text-[#414312] group-hover:scale-110 transition-all duration-300" />
                </button>
              </form>
            </div>

            {/* Mobile Cart */}
            <Link to="/cart">
              <div className="group relative p-2 bg-white/80 backdrop-blur-sm border border-[#cedeb1]/40 rounded-2xl hover:bg-[#cedeb1]/20 hover:border-[#6d7028]/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-400 cursor-pointer">
                <Badge 
                  badgeContent={cart.quantity} 
                  color="secondary"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#6d7028',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.75rem'
                    }
                  }}
                >
                  <ShoppingBacketIcon className="text-[#6d7028] group-hover:text-[#414312] text-[20px] group-hover:scale-110 transition-all duration-300" />
                </Badge>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="group relative p-2 bg-white/80 backdrop-blur-sm border border-[#cedeb1]/40 rounded-2xl hover:bg-[#cedeb1]/20 hover:border-[#6d7028]/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-400 cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-[#6d7028] group-hover:text-[#414312] text-lg transition-all duration-300" />
              ) : (
                <FaBars className="text-[#6d7028] group-hover:text-[#414312] text-lg transition-all duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-[#e8ecd4] shadow-xl z-50">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                <Link 
                  to="/chatbot" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 bg-white/80 backdrop-blur-sm border border-[#cedeb1]/40 rounded-2xl hover:bg-[#cedeb1]/20 hover:border-[#6d7028]/60 transition-all duration-300 text-[#414312] font-medium"
                >
                  <FaRobot className="text-[#6d7028] text-base" />
                  <span>AI Consultation</span>
                </Link>
                
                <Link 
                  to="/products" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 bg-white/80 backdrop-blur-sm border border-[#cedeb1]/40 rounded-2xl hover:bg-[#cedeb1]/20 hover:border-[#6d7028]/60 transition-all duration-300 text-[#414312] font-medium"
                >
                  <FaStore className="text-[#6d7028] text-base" />
                  <span>Shop</span>
                </Link>
              </div>

              {/* Mobile User Account */}
              <div className="pt-4 border-t border-[#e8ecd4]">
                {!user.currentUser ? (
                  <Link 
                    to="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 p-3 bg-white/80 backdrop-blur-sm border border-[#cedeb1]/40 rounded-2xl hover:bg-[#cedeb1]/20 hover:border-[#6d7028]/60 transition-all duration-300 text-[#414312] font-medium"
                  >
                    <FaUser className="text-[#6d7028] text-base" />
                    <span>Login</span>
                  </Link>
                ) : (
                  <Link 
                    to="/myaccount" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 p-3 bg-white/80 backdrop-blur-sm border border-[#cedeb1]/40 rounded-2xl hover:bg-[#cedeb1]/20 hover:border-[#6d7028]/60 transition-all duration-300 text-[#6d7028] font-medium"
                  >
                    <FaUser className="text-[#6d7028] text-base" />
                    <span>{user.currentUser.name}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;