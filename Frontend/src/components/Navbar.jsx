import { FaSearch, FaUser } from 'react-icons/fa';
import ShoppingBacketIcon from '@mui/icons-material/ShoppingBasket';
import { useSelector } from "react-redux"

import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Navbar = () => {

  const [search, setSearch] = useState("");
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user);

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
          onChange={(e) => setSearch(e.target.value)}
        />
  <Link to={`/products/${search}`}>
        <FaSearch className="text-[20px] cursor-pointer" />
        </Link>
      </div>

      <div className="flex items-center">
        <Link to="/cart">
        <div className="mr-[20px] cursor-pointer">
          <Badge badgeContent={cart.quantity} color="secondary">
            <ShoppingBacketIcon className="text-[#5f520c]" />
          </Badge>
        </div>
        </Link>

        <div className="flex items-center cursor-pointer space-x-2 border border-[#131402] p-2 rounded-lg hover:bg-[#cedeb1] duration-300">
  <FaUser className="text-[#6d7028] hover:text-[#3e3f28] transition duration-300" />
  
  {!user.currentUser ? (
    <Link to="/login">
      <span className="text-[#414312] hover:text-[#131402] font-semibold">Login</span>
    </Link>
  ) : (
    <Link to="/myaccount">
      <span className="text-[#6d7028] hover:text-[#3e3f28] transition duration-300 font-semibold">
        {user.currentUser.name}
      </span>
    </Link>
  )}
</div>

      </div>
    </div>
  );
};
export default Navbar;
