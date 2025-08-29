import React, { useState } from 'react';

const GlowModeModal = ({ isOpen, onClose, onSave, setGlowEnabled }) => {
  const [formData, setFormData] = useState({
    vibe: '',
    duration: '1 Hour',
    discoverability: 'Public'
  });

  const [isVibe, setIsVibe] = useState(true);

  const durations = ['30 Mins', '1 Hour', '1 Day'];
  const discoverabilityOptions = ['Public', 'Friends'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (formData.vibe === '') {
      setIsVibe(false);
      return;
    }

    setGlowEnabled(prev => !prev);
    onSave?.(formData);
    onClose();
    setIsVibe(true);
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
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" />
                <path d="M6 12h12" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-gray-900">GlowMode</h2>
            <div className="w-6"></div> {/* Spacer for centering */}
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {/* Vibe Section */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Vibe
              </label>
              <input
                type="text"
                placeholder="Netflix & Chill"
                value={formData.vibe}
                onChange={(e) => handleInputChange('vibe', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent placeholder-gray-400"
                required
              />
              {isVibe || formData.vibe !== ''? "" : <p className='text-red-500'>Fill vibe first, It is mandatory</p>}
            </div>

            {/* Duration Section */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Duration
              </label>
              <div className="flex gap-2">
                {durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => handleInputChange('duration', duration)}
                    className={`flex-1 px-4 py-3 rounded-lg border transition-colors ${formData.duration === duration
                        ? 'bg-[#ff5500] text-white border-[#ff5500]'
                        : 'bg-white text-gray-400 border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>

            {/* Discoverability Section */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Discoverability
              </label>
              <div className="flex gap-2">
                {discoverabilityOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleInputChange('discoverability', option)}
                    className={`flex-1 px-4 py-3 rounded-lg border transition-colors relative ${
                      formData.discoverability === option
                        ? 'bg-[#ff5500] text-white border-[#ff5500]'
                        : 'bg-white text-gray-400 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                    {option === 'Friends' && (
                      <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="text-2xl w-fit bg-[#ff5500] text-white py-2 px-10 rounded-2xl hover:bg-[#e64d00] transition-colors font-medium mt-6 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlowModeModal;
