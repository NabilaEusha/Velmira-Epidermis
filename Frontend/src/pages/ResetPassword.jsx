import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { userRequest } from '../requestMethods';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    
    setLoading(true);
    try {
      const res = await userRequest.post(
        '/users/reset-password',
        { email, newPassword }
      );
      toast.success(res.data.message || 'Password reset successful!');
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to reset password. Please try again.'
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#c1d196] via-[#b8cc8a] to-[#a8c470] p-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#75954c] to-[#9cc960] rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2 font-[Poppins]">Reset Password</h1>
          <p className="text-gray-600 font-[Poppins]">Enter your details to create a new password</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Field */}
          <div className="relative group">
            <label className="block text-gray-700 font-medium mb-2 font-[Poppins]">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#9cc960] transition-all duration-300 bg-white/70 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-lg placeholder-gray-400 text-gray-700 font-[Poppins]"
              placeholder="example@example.com"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9cc960]/10 to-[#75954c]/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          {/* New Password Field */}
          <div className="relative group">
            <label className="block text-gray-700 font-medium mb-2 font-[Poppins]">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#9cc960] transition-all duration-300 bg-white/70 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-lg placeholder-gray-400 text-gray-700 font-[Poppins]"
              placeholder="••••••••"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9cc960]/10 to-[#75954c]/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          {/* Confirm Password Field */}
          <div className="relative group">
            <label className="block text-gray-700 font-medium mb-2 font-[Poppins]">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#9cc960] transition-all duration-300 bg-white/70 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-lg placeholder-gray-400 text-gray-700 font-[Poppins]"
              placeholder="••••••••"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9cc960]/10 to-[#75954c]/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#75954c] to-[#9cc960] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#75954c]/25 hover:scale-105 transform active:scale-95 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-[Poppins]"
          >
            <span className="relative z-10 flex items-center justify-center">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#9cc960] to-[#75954c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Return to Login Link */}
          <div className="text-center pt-4">
            <div className="flex items-center justify-center mb-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm font-[Poppins]">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center text-[#75954c] hover:text-[#9cc960] font-medium transition-all duration-300 hover:scale-105 transform font-[Poppins] text-sm group"
            >
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Login
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ResetPassword;