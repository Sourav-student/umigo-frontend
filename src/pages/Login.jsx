// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { authAPI } from "../services/api";

// const Login = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [apiError, setApiError] = useState("");

//   const successMessage = location.state?.message;

//   useEffect(() => {
//     if (successMessage) {
//       setTimeout(() => {
//         navigate(location.pathname, { replace: true });
//       }, 5000);
//     }
//   }, [successMessage, navigate, location]);

//   const validateForm = () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email) newErrors.email = "Email is required";
//     else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address";
//     if (!formData.password) newErrors.password = "Password is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setApiError("");
//     if (!validateForm()) return;
//     setIsLoading(true);
//     try {
//       const response = await authAPI.login({
//         email: formData.email.trim(),
//         password: formData.password,
//       });
//       console.log("Login successful:", response);
//       navigate("/profile");
//     } catch (error) {
//       console.error("Login error:", error);
//       setApiError(error.message || "Login failed. Please check your credentials and try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f9f9f9] text-[#ff5500] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="text-center text-2xl font-extrabold mb-2">Welcome Back</h2>
//           <p className="text-center opacity-80">Sign in to your UmiGo account</p>
//         </div>

//         {successMessage && (
//           <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
//             <p className="text-green-700 text-sm">{successMessage}</p>
//           </div>
//         )}

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {apiError && (
//             <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
//               <p className="text-red-700 text-sm">{apiError}</p>
//             </div>
//           )}

//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-semibold mb-2">Email Address</label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg bg-white text-[#ff5500] placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent ${
//                   errors.email ? "border-red-500" : "border-[#ff5500]/40"
//                 }`}
//                 placeholder="Enter your email address"
//               />
//               {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg bg-white text-[#ff5500] placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent ${
//                   errors.password ? "border-red-500" : "border-[#ff5500]/40"
//                 }`}
//                 placeholder="Enter your password"
//               />
//               {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[#ff5500] focus:ring-[#ff5500] border-[#ff5500]/40 rounded bg-white" />
//               <label htmlFor="remember-me" className="ml-2 block text-sm opacity-80">Remember me</label>
//             </div>
//             <div className="text-sm">
//               <button type="button" onClick={() => navigate("/reset-password")} className="text-[#ff5500] hover:text-[#e64d00] transition-colors duration-200">
//                 Forgot your password?
//               </button>
//             </div>
//           </div>

//           <div>
//             <button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl bg-[#ff5500] text-white font-semibold disabled:opacity-50">
//               {isLoading ? 'Signing In...' : 'Sign In'}
//             </button>
//           </div>

//           <div className="text-center">
//             <p className="opacity-80">
//               Don't have an account?{' '}
//               <button type="button" onClick={() => navigate("/signup")} className="text-[#ff5500] hover:text-[#e64d00] transition-colors duration-200">
//                 Sign up here
//               </button>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
