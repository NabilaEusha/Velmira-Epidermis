import {useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logOut } from '../redux/userRedux';
import { updateUserProfile, changePassword } from '../redux/apiCalls';

const Myaccount = () => {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
      alert('Account information updated successfully!');
    } else {
      alert(result.message);
    }
  };

  // Handle password form submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    const result = await changePassword({
      userId: user.currentUser?._id,
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    });

    if (result.success) {
      alert('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } else {
      alert(result.message);
    }
  };

  const handleLogout = () => {
    dispatch(logOut())
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
      {/* Account Information Section */}
      <div className="mb-8">
        <h2 className="text-xl font-extrabold mb-6 text-gray-800">Account Information</h2>
        <div className="space-y-4">
          <p className="text-xl font-semibold text-gray-800">{formData.name}</p>
          <p className="text-gray-600">{formData.email}</p>
          <p className="text-gray-600">{formData.phone}</p>
        </div>
      </div>

      {/* Account Settings Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Account Settings</h3>
        <form className="space-y-6" onSubmit={handleAccountSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-semibold">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name} 
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
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

          <button type="submit" className="w-full bg-[#1e1e1e] text-white p-3 rounded-lg shadow-md hover:bg-green-900 transition duration-300">Save Changes</button>
        </form>
      </div>

      {/* Password Management Section */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Change Password</h3>
        <form className="space-y-6" onSubmit={handlePasswordSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-semibold">Current Password</label>
            <input 
              type="password" 
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
          
          <button type="submit" className="w-full bg-[#1e1e1e] text-white p-3 rounded-lg shadow-md hover:bg-gray-500 transition duration-300">Update Password</button>
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