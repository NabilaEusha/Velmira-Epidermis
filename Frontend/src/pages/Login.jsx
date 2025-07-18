import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useState, } from "react";
import { login } from "../redux/apiCalls";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      login(dispatch, { email, password });

      console.log(user.currentUser);

      setLoading(false);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
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

      {/* Static Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c1d196] via-[#b8cc8a] to-[#a8c470]"></div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative flex items-center bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden mt-[-70px] border border-white/20 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
        {/* IMAGE */}
        <div className="h-[500px] w-[700px] relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <img
            src="/blisslogo1.png"
            alt="login"
            className="object-cover h-full w-full transition-transform duration-700 ease-in-out transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
        </div>

        {/* FORM */}
        <div className="p-10 w-[500px] relative">
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-[#9cc960]/20 to-transparent rounded-full blur-sm"></div>

          <h2 className="text-3xl font-extrabold font-[Poppins] mb-8 bg-gradient-to-r from-[#75954c] to-[#9cc960] bg-clip-text text-transparent animate-pulse">
            Welcome Back
          </h2>

          <div className="space-y-6">
            <div className="relative group">
              <label className="block font-[Poppins] text-gray-600 mb-2 transition-colors duration-300 group-focus-within:text-[#75954c]">
                Email
              </label>
              <input
                type="email"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-[#9cc960] transition-all duration-300 bg-gray-50/50 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-lg placeholder-gray-400"
                placeholder="example@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9cc960] to-[#75954c] opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <div className="relative group">
              <label className="block font-[Poppins] text-gray-600 mb-2 transition-colors duration-300 group-focus-within:text-[#75954c]">
                Password
              </label>
              <input
                type="password"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-[#9cc960] transition-all duration-300 bg-gray-50/50 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-lg placeholder-gray-400"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9cc960] to-[#75954c] opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <div className="text-right mb-2">
              <Link to="/reset-password" className="text-[#75954c] hover:text-[#9cc960] text-sm font-semibold transition-colors duration-300 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              className="w-full py-4 bg-gradient-to-r from-[#75954c] to-[#9cc960] text-white font-[Poppins] font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#75954c]/25 hover:scale-105 transform active:scale-95 relative overflow-hidden group"
              onClick={handleLogin}
            >
             
              <span className="relative z-10">Login to Your Account</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#9cc960] to-[#75954c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <div className="text-sm font-[Poppins] text-gray-600 text-center mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative bg-white px-4">
                <span>Don't have an account?</span>
                <Link
                  to="/create-account"
                  className="text-[#75954c] hover:text-[#9cc960] font-semibold ml-1 transition-colors duration-300 hover:underline decoration-2 underline-offset-2"
                >
                  Sign Up Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
