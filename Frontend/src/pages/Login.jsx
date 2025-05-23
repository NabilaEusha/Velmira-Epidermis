import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#c1d196]">
      <div className="flex items-center bg-white shadow-2xl rounded-xl overflow-hidden mt-[-70px]">
        {/* IMAGE */}
        <div className="h-[500px] w-[700px] transition-transform duration-700 ease-in-out transform hover:scale-105">
          <img
            src="/blisslogo1.png"
            alt="login"
            className="object-cover h-full w-full"
          />
        </div>

        {/* FORM */}
        <div className="p-10 w-[500px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9cc960]"
                placeholder="example@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9cc960]"
                placeholder="******"
              />
            </div>

            <button className="w-full py-3 bg-[#75954c] text-white font-semibold rounded-md transition-transform duration-300 hover:bg-green-900 hover:scale-105">
              Login
            </button>

            <div className="text-sm text-gray-600 text-center mt-4">
              <span>Don’t have an account?</span>
              <Link
                to="/create-account"
                className="text-red-700 hover:underline ml-1"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
