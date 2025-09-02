import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/authService';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const countWords = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    // Mobile validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    else if (!mobileRegex.test(formData.mobile)) newErrors.mobile = 'Please enter a valid 10-digit mobile number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'mobile') {
      // Only allow numbers and limit to 10 digits
      const numbers = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numbers }));
      return;
    }

    if (errors[name] && name !== 'bio') setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await authAPI.register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone_no: formData.mobile.trim(),
        password: formData.password,
      });
      console.log('Registration successful:', response);
      navigate('/login', { state: { message: 'Registration successful! Please log in with your new account.' } });
    } catch (error) {
      console.error('Registration error:', error);
      setApiError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" bg-[#f9f9f9] text-[#ff5500] flex items-center justify-center py-14 md:py-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm space-y-8 border border-gray-500 m-3 p-6 rounded-2xl shadow-lg">
        <div>
          <div className="flex justify-center items-center gap-3 py-4">
            <img src="/logo.jpg" alt="Umigo" className="w-10 rounded-lg" />
            <span className="text-xl font-semibold">Umigo</span>
          </div>
          <p className="text-center opacity-80 text-black text-[17px]">Create new account and start connecting with others</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {apiError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-700 text-sm">{apiError}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              {/* <label htmlFor="name" className="block text-sm font-semibold mb-2">Full Name</label> */}
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white text-[#ff5500] placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent ${errors.name ? 'border-red-500' : 'border-[#ff5500]/40'}`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              {/* <label htmlFor="email" className="block text-sm font-semibold mb-2">Email Address</label> */}
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white text-[#ff5500] placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent ${errors.email ? 'border-red-500' : 'border-[#ff5500]/40'}`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white text-[#ff5500] placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent ${errors.password ? "border-red-500" : "border-[#ff5500]/40"
                  }`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="relative mt-3">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white text-[#ff5500] placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent ${errors.confirmPassword ? "border-red-500" : "border-[#ff5500]/40"
                  }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              {/* <label htmlFor="mobile" className="block text-sm font-semibold mb-2">Mobile Number</label> */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">+91</span>
                </div>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-3 py-2 border rounded-lg bg-white text-[#ff5500] placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent ${errors.mobile ? 'border-red-500' : 'border-[#ff5500]/40'
                    }`}
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                />
              </div>
              {errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>}
            </div>
          </div>

          <div>
            <button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl bg-[#ff5500] text-white font-semibold disabled:opacity-50 cursor-pointer">
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          <div className="text-center">
            <p className="opacity-80">
              <span className='text-black'>Already have an account?</span>{' '}
              <button type="button" onClick={() => navigate('/login')} className="text-[#ff5500] hover:text-[#e64d00] transition-colors duration-200 cursor-pointer">
                Sign in here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp; 