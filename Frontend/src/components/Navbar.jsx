import { FaSearch, FaUser } from "react-icons/fa";
import ShoppingBacketIcon from "@mui/icons-material/ShoppingBasket";
import Badge from "@mui/material/Badge";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-[100px] shadow-md px-6">
      <Link to="/">
      <div className="cursor-pointer m-2 ">
        <img src="/blisslogo1.png" alt="" height="100px" width="150px"></img>
      </div>
      </Link>

      <div className="flex items-center m-3">
        <input
          type="text"
          placeholder="search"
          className="p-[15px] border-2 border-[#131402] border-solid w-[400px] outline-none rounded-lg mr-[-30px]"
        />

        <FaSearch className="text-[20px] cursor-pointer" />
      </div>

      <div className="flex items-center">
        <Link to="/cart">
        <div className="mr-[20px] cursor-pointer">
          <Badge badgeContent={2} color="secondary">
            <ShoppingBacketIcon className="text-[#5f520c]" />
          </Badge>
        </div>
        </Link>

        <Link to="/login">
        <div className="flex items-center cursor-pointer space-x-2 border border-[#131402] p-2 rounded-lg hover:bg-[#cedeb1] duration-300">
          <FaUser className="text-[#6d7028] hover:text-[#3e3f28] transition duration-300" />
          <span className="text-[#414312] hover:text-[#131402] font-semibold">
            Login
          </span>
        </div>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
