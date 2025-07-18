import {LineChart} from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import {FaUpload} from 'react-icons/fa';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { userRequest } from '../requestMethods';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [inputs, setInputs] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState("");

  useEffect(() =>{

    const getProduct = async() =>{
      try {

        const res = await userRequest.get("/products/find/" + id)
        setProduct(res.data)
        
      } catch (error) {
        console.log(error)
      }
    }

    getProduct()

  },[])

  
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

 const handleUpdate = async(e) =>{
  e.preventDefault();
  try {
    let imgUrl = product.img;
    if (selectedImage) {
      setUploading("Uploading image...");
      const data = new FormData();
      data.append("file", selectedImage);
      data.append("upload_preset", "uploads");
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dur3dmmji/image/upload",
        data
      );
      imgUrl = uploadRes.data.url;
      setUploading("");
    }
    await userRequest.put(`/products/${id}`, {...inputs, img: imgUrl});
    toast.success('Product updated successfully!');
    // Optionally, refresh product data
    const res = await userRequest.get(`/products/find/${id}`);
    setProduct(res.data);
    setSelectedImage(null);
  } catch (error) {
    console.log(error);
    toast.error('Failed to update product');
  }
 }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-4 flex justify-center">
      <ToastContainer position="top-right" />
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Edit Product</h1>
          <Link to="/newproduct">
            <button className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded-lg text-white font-semibold shadow">
              + New Product
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Info Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 flex flex-col items-center">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="h-40 w-40 rounded-xl object-cover border mb-4"
              />
            ) : (
              <img
                src={product.img}
                alt=""
                className="h-40 w-40 rounded-xl object-cover border mb-4"
              />
            )}
            <label htmlFor="file" className="cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 font-medium mt-2 transition-colors">
              <FaUpload className="text-xl" />
              {selectedImage ? "Change Image" : "Upload Image"}
            </label>
            <input
              type="file"
              id="file"
              onChange={imageChange}
              accept="image/*"
              className="hidden"
            />
            {uploading && (
              <span className="text-blue-600 text-sm mt-2">{uploading}</span>
            )}
            <div className="w-full mt-8">
              <div className="mb-4 flex justify-between">
                <span className="font-semibold text-gray-600">Product ID:</span>
                <span className="text-gray-800">{product._id}</span>
              </div>
              <div className="mb-4 flex justify-between">
                <span className="font-semibold text-gray-600">In Stock:</span>
                <span className="text-gray-800">{product.inStock ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>

          {/* Edit Form Card */}
          <form onSubmit={handleUpdate} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Details</h2>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Product Name</label>
              <input
                type="text"
                name="title"
                placeholder={product.title}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Product Description</label>
              <input
                type="text"
                name="desc"
                placeholder={product.desc}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Original Price</label>
              <input
                type="number"
                step="any"
                name="originalPrice"
                placeholder={product.originalPrice}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Discounted Price</label>
              <input
                type="number"
                step="any"
                name="discountedPrice"
                placeholder={product.discountedPrice}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">In Stock</label>
              <select
                name="inStock"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onChange={handleChange}
                defaultValue={product.inStock ? "Yes" : "No"}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-md transition-colors duration-200 mt-4"
            >
              Update Product
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Product;