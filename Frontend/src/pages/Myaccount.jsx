import {useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logOut } from '../redux/userRedux';
import { updateUserProfile, changePassword } from '../redux/apiCalls';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Myaccount = () => {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for form data (matching your model field names)
  const [formData, setFormData] = useState({
    name: user.currentUser?.name || '',
    email: user.currentUser?.email || '',
    phone: user.currentUser?.phone || '',
    address: user.currentUser?.address || ''
  });

  // State for password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Handle input changes for account info
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle account info form submission
  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    
    const result = await updateUserProfile(dispatch, {
      userId: user.currentUser?._id, // Using _id as it's likely MongoDB ObjectId
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    });

    if (result.success) {
      toast.success('Account information updated successfully!', {
        position: 'top-center',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else {
      toast.error(result.message || 'Failed to update account information.', {
        position: 'top-center',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  // Handle password form submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match!', {
        position: 'top-center',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }

    const result = await changePassword({
      userId: user.currentUser?._id,
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    });

    if (result.success) {
      toast.success('Password updated successfully!', {
        position: 'top-center',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } else {
      toast.error(result.message || 'Failed to update password.', {
        position: 'top-center',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 100);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6">
      <ToastContainer
        position="top-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-4xl">
      {/* Account Information Section */}
      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-extrabold mb-6 text-gray-800">Account Information</h2>
        <div className="space-y-2 sm:space-y-4">
          <p className="text-base sm:text-xl font-semibold text-gray-800">{formData.name}</p>
          <p className="text-gray-600 text-sm sm:text-base">{formData.email}</p>
          <p className="text-gray-600 text-sm sm:text-base">{formData.phone}</p>
        </div>
      </div>

      {/* Account Settings Section */}
      <div className="mb-8">
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Account Settings</h3>
        <form className="space-y-4 sm:space-y-6" onSubmit={handleAccountSubmit}>
          <div>
            <label className="block text-gray-700 text-xs sm:text-sm font-semibold">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name} 
              onChange={handleInputChange}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-semibold">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email} 
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold">Phone</label>
            <input 
              type="text" 
              name="phone"
              value={formData.phone} 
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-semibold">Address</label>
            <input 
              type="text" 
              name="address"
              value={formData.address} 
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          <button type="submit" className="w-full bg-[#1e1e1e] text-white p-3 rounded-lg shadow-md hover:bg-green-900 transition duration-300 min-h-[44px] min-w-[44px]">Save Changes</button>
        </form>
      </div>

      {/* Password Management Section */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Change Password</h3>
        <form className="space-y-4 sm:space-y-6" onSubmit={handlePasswordSubmit}>
          <div>
            <label className="block text-gray-700 text-xs sm:text-sm font-semibold">Current Password</label>
            <input 
              type="password" 
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-semibold">New Password</label>
            <input 
              type="password" 
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold">Confirm New Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            />
          </div>
          
          <button type="submit" className="w-full bg-[#1e1e1e] text-white p-3 rounded-lg shadow-md hover:bg-green-900 transition duration-300 min-h-[44px] min-w-[44px]">Change Password</button>
        </form>
        
        <button 
          type="button" 
          className="w-full mt-4 bg-red-500 text-white p-3 rounded-lg shadow-md hover:bg-gray-500 transition duration-300" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  </div>
  )
}

export default Myaccount