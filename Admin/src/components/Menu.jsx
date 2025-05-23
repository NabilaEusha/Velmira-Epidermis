import {
  FaBox,
  FaChartBar,
  FaClipboard,
  FaClipboardList,
  FaCog,
  FaElementor,
  FaHdd,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className=" w-72 bg-white px-6 py-8 shadow-xl border-r border-gray-300">
      {/* Logo or Header */}
      <div className="flex items-center gap-3 mb-8">
        <FaElementor className="text-2xl text-[#2b4b6b]" />
        <h1 className="text-xl font-bold text-[#2b4b6b]">Admin Panel</h1>
      </div>

      <ul className="flex flex-col gap-2">
        {/* Section: Dashboard */}
        <p className="text-gray-400 uppercase text-xs px-2">Dashboard</p>
        <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
          <FaHome className="text-[#2b4b6b] group-hover:text-white" />
          Home
        </li>
        <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
          <FaUser className="text-[#2b4b6b]" />
          Profile
        </li>

        {/* Section Divider */}
        <hr className="my-4 border-gray-300" />

        {/* Section: Manage */}
        <p className="text-gray-400 uppercase text-xs px-2">Manage</p>
        <Link to="/users">
          <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
            <FaUsers className="text-[#2b4b6b]" />
            Users
          </li>
        </Link>
        <Link to="/products">
          <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
            <FaBox className="text-[#2b4b6b]" />
            Products
          </li>
        </Link>
        <Link to="/orders">
          <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
            <FaClipboardList className="text-[#2b4b6b]" />
            Orders
          </li>
        </Link>

        {/* Section Divider */}
        <hr className="my-4 border-gray-300" />

        {/* Section: Tools */}
        <p className="text-gray-400 uppercase text-xs px-2">Tools</p>
        <Link to="/banners">
          <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
            <FaElementor className="text-[#2b4b6b]" />
            Banners
          </li>
        </Link>
        <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
          <FaCog className="text-[#2b4b6b]" />
          Settings
        </li>
        <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
          <FaHdd className="text-[#2b4b6b]" />
          Backups
        </li>

        {/* Section Divider */}
        <hr className="my-4 border-gray-300" />

        {/* Section: Reports */}
        <p className="text-gray-400 uppercase text-xs px-2">Reports</p>
        <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
          <FaChartBar className="text-[#2b4b6b]" />
          Charts
        </li>
        <li className="flex items-center gap-4 text-[18px] text-gray-700 font-medium px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2b4b6b] hover:text-white">
          <FaClipboard className="text-[#2b4b6b]" />
          All logs
        </li>

        {/* Logout */}
        <li className="flex items-center gap-4 text-[18px] text-red-600 font-medium px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-red-100">
          <FaSignOutAlt />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Menu;
