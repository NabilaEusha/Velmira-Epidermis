import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaGripVertical, FaUpload, FaEdit } from "react-icons/fa";
import axios from "axios";
import { userRequest } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Banners = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [banners, setBanners] = useState([]);
  const [uploading, setUploading] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedImage || !title.trim() || !subtitle.trim()) {
      toast.error("Please fill in all fields and select an image");
      return;
    }

    setIsLoading(true);
    setUploading("Uploading image...");
    
    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", "uploads");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dkjenslgr/image/upload",
        data
      );

      const { url } = uploadRes.data;
      setUploading("Creating banner...");

      await userRequest.post("/banners", { img: url, title, subtitle });
      
      toast.success("Banner created successfully!");
      setSelectedImage(null);
      setTitle("");
      setSubtitle("");
      setUploading("");
      fetchBanners();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create banner");
      setUploading("");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBanners = async () => {
    try {
      const res = await userRequest.get("/banners");
      setBanners(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch banners");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await userRequest.delete(`/banners/${id}`);
        toast.success("Banner deleted successfully");
        fetchBanners();
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete banner");
      }
    }
  };

  // Custom drag and drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const items = Array.from(banners);
    const [draggedItem] = items.splice(draggedIndex, 1);
    items.splice(dropIndex, 0, draggedItem);

    setBanners(items);
    setDraggedIndex(null);

    try {
      await userRequest.put("/banners/order", {
        bannerId: draggedItem._id,
        newOrder: dropIndex
      });
      toast.success("Banner order updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update banner order");
      fetchBanners(); // Revert to original order
    }
  };

  const resetForm = () => {
    setSelectedImage(null);
    setTitle("");
    setSubtitle("");
    setEditingBanner(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Banner Management</h1>
          <p className="text-gray-600">Manage your website banners and their display order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Banner List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Active Banners</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Drag and drop to reorder banners
                </p>
              </div>

              <div className="p-6">
                {banners.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📷</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No banners yet</h3>
                    <p className="text-gray-500">Create your first banner to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {banners.map((banner, index) => (
                      <div
                        key={banner._id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        className={`bg-gray-50 rounded-lg p-4 border-2 transition-all duration-200 cursor-move hover:border-gray-300 ${
                          draggedIndex === index ? "border-blue-500 shadow-lg opacity-75" : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-gray-400 hover:text-gray-600">
                            <FaGripVertical size={20} />
                          </div>

                          <div className="flex-shrink-0">
                            <img
                              src={banner.img}
                              alt={banner.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {banner.title}
                            </h3>
                            <p className="text-gray-600 text-sm truncate">
                              {banner.subtitle}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-xs text-gray-500">
                                Order: {banner.order + 1}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <button
                              onClick={() => handleDelete(banner._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <FaTrash size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Create Banner Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Create New Banner</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Add a new banner to your collection
                </p>
              </div>

              <div className="p-6">
                <form onSubmit={handleUpload} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Banner Image
                    </label>
                    <div className="flex justify-center">
                      {!selectedImage ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full text-center hover:border-gray-400 transition-colors">
                          <label htmlFor="file" className="cursor-pointer">
                            <FaUpload className="mx-auto text-gray-400 text-3xl mb-2" />
                            <p className="text-sm text-gray-600">Click to upload image</p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                          </label>
                        </div>
                      ) : (
                        <div className="relative">
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      id="file"
                      onChange={imageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    {uploading && (
                      <p className="text-sm text-blue-600 mt-2">{uploading}</p>
                    )}
                  </div>

                  {/* Title Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter banner title"
                      required
                    />
                  </div>

                  {/* Subtitle Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter banner subtitle"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !selectedImage || !title.trim() || !subtitle.trim()}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? "Creating..." : "Create Banner"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;
