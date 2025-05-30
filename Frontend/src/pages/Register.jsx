import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#c1d196]">
      <div className="flex items-center bg-white shadow-2xl rounded-xl overflow-hidden mt-[30px]">
        {/* IMAGE */}
        <div className="h-[400px] w-[750px] transition-transform duration-700 ease-in-out transform hover:scale-105">
          <img
            src="/blisslogo1.png"
            alt="register"
            className="object-cover h-full w-full"
          />
        </div>

        {/* FORM */}
        <div className="p-10 w-[500px]">
          <h2 className="text-2xl font-extrabold font-[Poppins] text-gray-800 mb-6">Create Account</h2>
          <form className="space-y-5">
            <div>
              <label className="block font-[Poppins] text-gray-600 mb-2">Full Name</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9cc960]"
                placeholder="Nabila S."
              />
            </div>
            <div>
              <label className="block font-[Poppins] text-gray-600 mb-2">Email</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9cc960]"
                placeholder="example@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-[Poppins] mb-2">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9cc960]"
                placeholder="******"
              />
            </div>

            <button className="w-full py-3 font-[Poppins] bg-[#75954c] text-white font-semibold rounded-md transition-transform duration-300 hover:bg-green-900 hover:scale-105">
              Create an Account
            </button>

            <div className="text-sm font-[Poppins] text-gray-600 text-center mt-4">
              <span>Already have an account?</span>
              <Link to="/login" className="text-red-700 hover:underline ml-1">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
