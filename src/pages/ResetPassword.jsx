// import React, { useState } from 'react';
// import axios from 'axios';

// const ResetPassword = () => {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
//       setError('Please enter a valid email address.');
//       return;
//     }
//     setLoading(true);
//     try {
//       // Replace with your actual API endpoint
//       await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, { email });
//       setSuccess('Check your email for password reset instructions.');
//       setEmail('');
//     } catch (err) {
//       setError(
//         err.response?.data?.message || 'Failed to send reset email. Please try again.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Reset Password</h2>
//         {error && <div className="mb-4 text-red-500">{error}</div>}
//         {success && <div className="mb-4 text-green-500">{success}</div>}
//         <label className="block mb-2 text-gray-700 dark:text-gray-200">Email Address</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
//           placeholder="Enter your email"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-primary text-white py-2 rounded hover:bg-orange-600 transition-colors disabled:opacity-50"
//           disabled={loading}
//         >
//           {loading ? 'Sending...' : 'Send Reset Link'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;