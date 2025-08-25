import React, { useState, useRef } from 'react';

const CreatePostModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    plan: '',
    location: '',
    vibe: '',
    privacy: '',
    date: '',
    time: ''
  });

  const [showVibeDropdown, setShowVibeDropdown] = useState(false);
  const [showPrivacyDropdown, setShowPrivacyDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const vibes = ['Chill', 'Lit', 'Aesthetic', 'Music', 'Sports'];
  const privacyOptions = ['Public', 'Private', 'My People'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission here
    onClose();
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
           
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7"/><path d="M6 12h12"/></svg>
            </button>
            <h2 className="text-lg font-semibold text-gray-900">Make A Plan</h2>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent placeholder-gray-400"
              />
            </div>

            {/* Location */}
            <div className="relative">
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent placeholder-gray-400 pr-10"
              />
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
              <button
                type="button"
                onClick={() => setShowTimePicker(!showTimePicker)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent bg-white"
              >
                <span className={formData.time ? 'text-gray-900' : 'text-gray-400'}>
                  {formData.time ? formatTime(formData.time) : 'Time'}
                </span>
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showTimePicker && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => {
                      handleInputChange('time', e.target.value);
                      setShowTimePicker(false);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {/* Post Button */}
            <button
              onClick={handleSubmit}
              className="w-fit bg-[#ff5500] text-white py-3 px-4 rounded-lg hover:bg-[#e64d00] transition-colors font-medium mt-6"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostModal;