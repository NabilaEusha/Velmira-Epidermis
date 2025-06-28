import {
  FaBox,
  FaClipboardList,
  FaElementor,
  FaHome,
  FaPlus,
  FaUpload,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className=" w-62 bg-white px-6 py-4 shadow-xl border-r border-gray-300">
      {/* Logo or Header */}
      <div className="flex items-center gap-3 mb-8">
        <FaElementor className="text-2xl text-[#2b4b6b]" />
        <h1 className="text-xl font-bold text-[#2b4b6b]">Admin Panel</h1>
      </div>

      <ul className="flex flex-col gap-1">
        {/* Section: Dashboard */}
        <p className="text-gray-400 uppercase text-xs px-2">Dashboard</p>
        <Link to="/">
        <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-1 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
          <FaHome className="text-[#2b4b6b] group-hover:text-white" />
          Home
        </li>
        </Link>

        {/* Section Divider */}
        <hr className="my-4 border-gray-300" />

        {/* Section: Manage */}
        <p className="text-gray-400 uppercase text-xs px-2">Manage</p>
        <Link to="/users">
          <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-1 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
            <FaUsers className="text-[#2b4b6b]" />
            Users
          </li>
        </Link>
        <Link to="/products">
          <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-1 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
            <FaBox className="text-[#2b4b6b]" />
            Products
          </li>
        </Link>
        <Link to="/orders">
          <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-1 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
            <FaClipboardList className="text-[#2b4b6b]" />
            Orders
          </li>
        </Link>

        {/* Section Divider */}
        <hr className="my-4 border-gray-300" />

        {/* Section: Upload */}
        <p className="text-gray-400 uppercase text-xs px-2">Upload</p>
        <Link to="/newproduct">
          <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-1 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
            <FaPlus className="text-[#2b4b6b]" />
            Add Product
          </li>
        </Link>
        <Link to="/banners">
          <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-1 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
            <FaUpload className="text-[#2b4b6b]" />
            Manage Banners
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Menu;
