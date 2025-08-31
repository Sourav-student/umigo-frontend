import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePostModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Handle click outside
  const handleClickOutside = useCallback((event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  }, [onClose]);

  // Handle escape key press
  const handleEscapeKey = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Handle browser back button
  const handlePopState = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      // Add event listeners when modal is open
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      window.addEventListener('popstate', handlePopState);

      // Push a new state to the history to detect back button press
      window.history.pushState({ modalOpen: true }, '');
    }

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('popstate', handlePopState);

      // If the modal is closing and the current state has modalOpen, go back
      if (isOpen && window.history.state?.modalOpen) {
        window.history.back();
      }
    };
  }, [isOpen, handleClickOutside, handleEscapeKey, handlePopState]);

  const [formData, setFormData] = useState({
    plan: '',
    location: '',
    time: ''
  });

  const [showTimePicker, setShowTimePicker] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    if (!value.trim()) {
      error = 'This field is required';
    } else if (name === 'time' && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      error = 'Please enter a valid time (HH:MM)';
    }
    return error;
  };

  const handleInputChange = (field, value) => {
    // Update field value
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Validate field if it's been touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: error
      }));
    }
  };

  const handleBlur = (field) => (e) => {
    // Mark field as touched
    if (!touched[field]) {
      setTouched(prev => ({
        ...prev,
        [field]: true
      }));
    }

    // Validate field
    const error = validateField(field, formData[field]);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate all fields
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    // Mark all fields as touched to show errors
    const allTouched = {};
    Object.keys(formData).forEach(field => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    return isValid;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log('Form submitted:', formData);
    // Here you would typically make an API call to save the data
    // For example: await api.createPost(formData);

    onClose();
  };

  // Handle Enter key press in form fields
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <form
        onSubmit={handleSubmit}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          ref={modalRef}
          className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >

              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /><path d="M6 12h12" /></svg>
            </button>
            <h2 className="text-lg font-semibold text-gray-900">Make a Plan</h2>
            <div className="w-6"></div> {/* Spacer for centering */}
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-4">
            {/* Plan Description */}
            <div>
              <input
                type="text"
                placeholder="What's the plan..."
                value={formData.plan}
                onChange={(e) => handleInputChange('plan', e.target.value)}
                onBlur={handleBlur('plan')}
                onKeyDown={handleKeyDown}
                className={`w-full px-4 py-3 border ${errors.plan && touched.plan ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent placeholder-gray-400`}
                required
              />
              {errors.plan && touched.plan && (
                <p className="mt-1 text-sm text-red-600">{errors.plan}</p>
              )}
            </div>

            {/* Location */}
            <div className="relative">
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                onBlur={handleBlur('location')}
                className={`w-full px-4 py-3 border ${errors.location && touched.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent placeholder-gray-400 pr-10`}
                required
              />
              {errors.location && touched.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Vibe */}
            {/* <div className="relative">
              <button
                type="button"
                onClick={() => setShowVibeDropdown(!showVibeDropdown)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent bg-white"
              >
                <span className={formData.vibe ? 'text-gray-900' : 'text-gray-400'}>
                  {formData.vibe || 'Vibe'}
                </span>
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showVibeDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {vibes.map((vibe) => (
                    <button
                      key={vibe}
                      onClick={() => {
                        handleInputChange('vibe', vibe);
                        setShowVibeDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {vibe}
                    </button>
                  ))}
                </div>
              )}
            </div> */}

            {/* Privacy */}
            {/* <div className="relative">
              <button
                type="button"
                onClick={() => setShowPrivacyDropdown(!showPrivacyDropdown)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent bg-white"
              >
                <span className={formData.privacy ? 'text-gray-900' : 'text-gray-400'}>
                  {formData.privacy || 'Privacy'}
                </span>
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showPrivacyDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {privacyOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        handleInputChange('privacy', option);
                        setShowPrivacyDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div> */}

            {/* Date */}
            {/* <div className="relative">
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent bg-white"
              >
                <span className={formData.date ? 'text-gray-900' : 'text-gray-400'}>
                  {formData.date ? formatDate(formData.date) : 'Date'}
                </span>
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showDatePicker && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => {
                      handleInputChange('date', e.target.value);
                      setShowDatePicker(false);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent"
                  />
                </div>
              )}
            </div> */}

            {/* Time */}
            <div className="relative">
              {/* <button
                type="button"
                onClick={() => setShowTimePicker(!showTimePicker)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent bg-white"
              >
                <span className={formData.time ? 'text-gray-900' : 'text-gray-400'}>
                  {formData.time ? formatTime(formData.time) : 'Select Time'}
                </span>
                
                {errors.time && touched.time && (
                  <p className="mt-1 text-sm text-red-600">{errors.time}</p>
                )}
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button> */}
              <input
                type="time"
                value={formData.time}
                onChange={(e) => {
                  handleInputChange('time', e.target.value);
                  // if (e.target.value) {
                  //   setShowTimePicker(false);
                  // }
                }}
                onBlur={handleBlur('time')}
                className={`w-full px-3 py-2 border ${errors.time && touched.time ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent`}
                required
              />
              {/* {showTimePicker && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => {
                      handleInputChange('time', e.target.value);
                      if (e.target.value) {
                        setShowTimePicker(false);
                      }
                    }}
                    onBlur={handleBlur('time')}
                    className={`w-full px-3 py-2 border ${errors.time && touched.time ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent`}
                    required
                  />
                </div>
              )} */}
            </div>

            {/* Post Button */}
            <button
              type="submit"
              className="text-2xl w-fit bg-[#ff5500] text-white py-2 px-10 rounded-2xl hover:bg-[#e64d00] transition-colors font-medium mt-6"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreatePostModal;