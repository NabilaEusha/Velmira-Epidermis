import React, { useState } from 'react';
import { FaPlus, FaTrash, FaImage, FaTag, FaDollarSign, FaList } from 'react-icons/fa';
import axios from 'axios';
import { userRequest } from '../requestMethods.js';

const NewProduct = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputs, setInputs] = useState({});
  const [uploading, setUploading] = useState("Uploading is 0%");
  const [selectedOptions, setSelectedOptions] = useState({
    concern: [],
    skintype: [],
    categories: [],
  });

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
    }
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (value && !selectedOptions[name].includes(value)) {
      setSelectedOptions((prev) => ({
        ...prev,
        [name]: [...prev[name], value],
      }));
    }
  };

  const handleRemoveOption = (name, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: prev[name].filter((options) => options !== value)
    }));
  }

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleUpload = async(e) => {
    e.preventDefault();
    
    if (!selectedImage) {
      alert("Please select an image");
      return;
    }

    setUploading("Uploading ...")
    try {
      console.log("Starting upload to Cloudinary...");
      
      // Upload image to Cloudinary
      const data = new FormData();
      data.append("file", selectedImage);
      data.append("upload_preset", "uploads");

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dur3dmmji/image/upload",
        data
      );
      
      const { url } = uploadRes.data;
      console.log("Image uploaded successfully:", url);
      
      // Create product in database
      const productData = {
        img: url,
        ...inputs,
        ...selectedOptions
      };
      
      console.log("Creating product with data:", productData);
      const productResponse = await userRequest.post("/products", productData);
      
      console.log("Product created successfully:", productResponse.data);
      setUploading("Uploaded 100%");
      
      // Reset form
      setSelectedImage(null);
      setInputs({});
      setSelectedOptions({
        concern: [],
        skintype: [],
        categories: [],
      });
      
      alert("Product created successfully!");
      
    } catch (error) {
      console.log("Error during upload:", error);
      setUploading("Uploading failed");
      alert("Error creating product: " + (error.response?.data?.message || error.message));
    }
  }

  const concernOptions = [
    "Dry Skin", "Pigmentation", "Oil Control", "Cleansing", "Anti Acne", "Sunburn", 
    "Skin Brightening", "Tan Removal", "Night Routine", "UV Protection", 
    "Damaged Hair", "Frizzy Hair", "Stretch Marks", "Color Protection", 
    "Dry Hair", "Soothing", "Dandruff", "Greying", "Hairfall", 
    "Hair Color", "Well Being", "Acne", "Hair Growth", "Anti Aging"
  ];

  const skintypeOptions = ["All", "Oily", "Dry", "Sensitive", "Normal"];
  const categoryOptions = ["Toners", "Serums", "Sunscreens", "Lotions"];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
          <p className="text-gray-600">Create a new product listing with all the details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - Product Image & Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Product Image Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <FaImage className="text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Product Image</h3>
              </div>
              
              <div className="flex flex-col items-center">
                {!selectedImage ? (
                  <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200 h-48 w-48 rounded-lg flex items-center justify-center cursor-pointer group">
                    <label htmlFor="file" className="cursor-pointer text-center">
                      <FaPlus className="text-3xl text-gray-400 group-hover:text-blue-500 mb-2 mx-auto" />
                      <p className="text-sm text-gray-500 group-hover:text-blue-500">Click to upload image</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Product"
                      className="h-48 w-48 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  id="file"
                  onChange={imageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              <div className="mt-4 text-center">
                <span className={`text-sm font-medium ${
                  uploading.includes('100%') ? 'text-green-600' : 
                  uploading.includes('failed') ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {uploading}
                </span>
              </div>
            </div>

            {/* Basic Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <FaTag className="text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter product name"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="Enter brand name"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">Product Description</label>
                  <textarea
                    name="desc"
                    rows={4}
                    onChange={handleChange}
                    placeholder="Describe your product..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN - Pricing */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <FaDollarSign className="text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Pricing Details</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Original Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      name="originalPrice"
                      onChange={handleChange}
                      placeholder="100"
                      className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">Discounted Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      name="discountedPrice"
                      onChange={handleChange}
                      placeholder="80"
                      className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">Wholesale Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      name="wholesalePrice"
                      onChange={handleChange}
                      placeholder="70"
                      className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">Wholesale Minimum Quantity</label>
                  <input
                    type="number"
                    name="wholesaleMinimumQuantity"
                    onChange={handleChange}
                    placeholder="10"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <button 
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 shadow-sm' 
                onClick={handleUpload}
              >
                Create Product
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN - Categories & Options */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <FaList className="text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Categories & Attributes</h3>
              </div>
              
              <div className="space-y-6">
                {/* Concerns */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Concerns</label>
                  <select
                    name="concern"
                    onChange={handleSelectChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Concern</option>
                    {concernOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  
                  {selectedOptions.concern.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Selected Concerns:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedOptions.concern.map((option) => (
                          <span key={option} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {option}
                            <button
                              type="button"
                              className="ml-2 text-blue-600 hover:text-blue-800"
                              onClick={() => handleRemoveOption("concern", option)}
                            >
                              <FaTrash className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Skin Type */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Skin Type</label>
                  <select
                    name="skintype"
                    onChange={handleSelectChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Skin Type</option>
                    {skintypeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  
                  {selectedOptions.skintype.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Selected Skin Types:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedOptions.skintype.map((option) => (
                          <span key={option} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {option}
                            <button
                              type="button"
                              className="ml-2 text-green-600 hover:text-green-800"
                              onClick={() => handleRemoveOption("skintype", option)}
                            >
                              <FaTrash className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Categories */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Category</label>
                  <select
                    name="categories"
                    onChange={handleSelectChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  
                  {selectedOptions.categories.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Selected Categories:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedOptions.categories.map((option) => (
                          <span key={option} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {option}
                            <button
                              type="button"
                              className="ml-2 text-purple-600 hover:text-purple-800"
                              onClick={() => handleRemoveOption("categories", option)}
                            >
                              <FaTrash className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;