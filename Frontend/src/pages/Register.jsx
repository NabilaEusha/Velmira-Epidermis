import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await userRequest.post("/auth/register", { name, email, password });
      navigate("/login");
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
      {/* Minimal Background - No more painful animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c1d196] via-[#64743f] to-[#8da55c] "></div>

      {/* Subtle Static Elements - No bouncing */}
      <div className="absolute top-32 right-32 w-28 h-28 bg-white/20 rounded-full blur-2xl opacity-60"></div>
      <div className="absolute bottom-32 left-32 w-20 h-20 bg-white/30 rounded-full blur-xl opacity-50"></div>
      <div className="absolute top-1/3 right-10 w-12 h-12 bg-white/25 rounded-full blur-lg opacity-40"></div>

      <div className="relative flex flex-col md:flex-row items-center bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden mt-0 md:mt-[30px] border border-white/20 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] w-full max-w-4xl mx-auto">
        {/* IMAGE */}
        <div className="w-full h-40 sm:h-64 md:h-[400px] md:w-[350px] lg:w-[400px] xl:w-[500px] relative group overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <img
            src="/blisslogo1.png"
            alt="register"
            className="object-cover h-full w-full transition-transform duration-700 ease-in-out transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
        </div>

        {/* FORM */}
        <div className="p-4 sm:p-8 md:p-10 w-full md:w-[350px] lg:w-[400px] xl:w-[500px] relative flex flex-col justify-center">
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-[#9cc960]/20 to-transparent rounded-full blur-sm"></div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-[Poppins] mb-8 bg-gradient-to-r from-[#75954c] to-[#9cc960] bg-clip-text text-transparent animate-pulse">
            Join Our Community
          </h2>

          <div className="space-y-5">
            <div className="relative group">
              <label className="block font-[Poppins] text-gray-600 mb-2 transition-colors duration-300 group-focus-within:text-[#75954c]">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-[#9cc960] transition-all duration-300 bg-gray-50/50 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-lg placeholder-gray-400"
                placeholder="Nabila S."
                onChange={(e) => setName(e.target.value)}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9cc960] to-[#75954c] opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <div className="relative group">
              <label className="block font-[Poppins] text-gray-600 mb-2 transition-colors duration-300 group-focus-within:text-[#75954c]">
                Email
              </label>
              <input
                type="text"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-[#9cc960] transition-all duration-300 bg-gray-50/50 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-lg placeholder-gray-400"
                placeholder="example@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9cc960] to-[#75954c] opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <div className="relative group">
              <label className="block text-gray-600 font-[Poppins] mb-2 transition-colors duration-300 group-focus-within:text-[#75954c]">
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

            <button
              className="w-full py-3 sm:py-4 font-[Poppins] bg-gradient-to-r from-[#75954c] to-[#9cc960] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#75954c]/25 hover:scale-105 transform active:scale-95 relative overflow-hidden group min-h-[44px] min-w-[44px] text-base sm:text-lg"
              aria-label="Create Your Account"
              onClick={handleRegister}
            >
              <span className="relative z-10">Create Your Account</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#9cc960] to-[#75954c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <div className="text-sm font-[Poppins] text-gray-600 text-center mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative bg-white px-4">
                <span>Already have an account?</span>
                <Link
                  to="/login"
                  className="text-[#75954c] hover:text-[#9cc960] font-semibold ml-1 transition-colors duration-300 hover:underline decoration-2 underline-offset-2"
                >
                  Login Here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

// import { Link } from "react-router-dom";

// const Register = () => {
//   return (
//     <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
//       {/* Animated Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#c1d196] via-[#64743f] to-[#8da55c] animate-pulse"></div>

//       {/* Floating Elements */}
//       <div className="absolute top-32 right-32 w-28 h-28 bg-white/12 rounded-full blur-xl animate-bounce delay-700"></div>
//       <div className="absolute bottom-32 left-32 w-20 h-20 bg-white/18 rounded-full blur-lg animate-bounce delay-1200"></div>
//       <div className="absolute top-1/3 right-10 w-12 h-12 bg-white/25 rounded-full blur-md animate-pulse delay-500"></div>

//       <div className="relative flex items-center bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden mt-[30px] border border-white/20 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
//         {/* IMAGE */}
//         <div className="h-[400px] w-[750px] relative group overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
//           <img
//             src="/blisslogo1.png"
//             alt="register"
//             className="object-cover h-full w-full transition-transform duration-700 ease-in-out transform group-hover:scale-110"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
//         </div>

//         {/* FORM */}
//         <div className="p-10 w-[500px] relative">
//           {/* Decorative Elements */}
//           <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-[#9cc960]/20 to-transparent rounded-full blur-sm"></div>

//           <h2 className="text-3xl font-extrabold font-[Poppins] mb-8 bg-gradient-to-r from-[#75954c] to-[#9cc960] bg-clip-text text-transparent animate-pulse">
//             Join Our Community
//           </h2>

//           <div className="space-y-5">
//             <div className="relative group">
//               <label className="block font-[Poppins] text-gray-600 mb-2 transition-colors duration-300 group-focus-within:text-[#75954c]">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-[#9cc960] transition-all duration-300 bg-gray-50/50 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-lg placeholder-gray-400"
//                 placeholder="Nabila S."
//               />
//               <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9cc960] to-[#75954c] opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
//             </div>

//             <div className="relative group">
//               <label className="block font-[Poppins] text-gray-600 mb-2 transition-colors duration-300 group-focus-within:text-[#75954c]">
//                 Email
//               </label>
//               <input
//                 type="text"
//                 className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-[#9cc960] transition-all duration-300 bg-gray-50/50 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-lg placeholder-gray-400"
//                 placeholder="example@example.com"
//               />
//               <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9cc960] to-[#75954c] opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
//             </div>

//             <div className="relative group">
//               <label className="block text-gray-600 font-[Poppins] mb-2 transition-colors duration-300 group-focus-within:text-[#75954c]">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-[#9cc960] transition-all duration-300 bg-gray-50/50 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-lg placeholder-gray-400"
//                 placeholder="••••••••"
//               />
//               <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9cc960] to-[#75954c] opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
//             </div>

//             <button className="w-full py-4 font-[Poppins] bg-gradient-to-r from-[#75954c] to-[#9cc960] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#75954c]/25 hover:scale-105 transform active:scale-95 relative overflow-hidden group">
//               <span className="relative z-10">Create Your Account</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-[#9cc960] to-[#75954c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </button>

//             <div className="text-sm font-[Poppins] text-gray-600 text-center mt-6 relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-200"></div>
//               </div>
//               <div className="relative bg-white px-4">
//                 <span>Already have an account?</span>
//                 <Link
//                   to="/login"
//                   className="text-[#75954c] hover:text-[#9cc960] font-semibold ml-1 transition-colors duration-300 hover:underline decoration-2 underline-offset-2"
//                 >
//                   Login Here
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
