import React, { useState, useRef, useEffect } from 'react';

const GlowModeModal = ({ isOpen, onClose, onSave, setGlowEnabled }) => {
  const [formData, setFormData] = useState({
    vibe: '',
    duration: 60, // Store duration in minutes
    durationDisplay: '1 Hour',
    discoverability: 'Public'
  });

  const [isVibe, setIsVibe] = useState(true);
  const durationContainerRef = useRef(null);

  // Generate duration options: 5 min to 60 min in 5 min steps, then 2h to 24h in 1h steps
  const durationOptions = [];
  for (let i = 5; i <= 60; i += 5) {
    durationOptions.push({
      value: i,
      label: i < 60 ? `${i} Min` : '1 Hour'
    });
  }
  for (let i = 2; i <= 24; i++) {
    durationOptions.push({
      value: i * 60,
      label: i === 1 ? '1 Hour' : `${i} Hours`
    });
  }

  const discoverabilityOptions = ['Public', 'Friends'];

  const handleInputChange = (field, value) => {
    if (field === 'duration') {
      const selectedOption = durationOptions.find(opt => opt.value === value);
      setFormData(prev => ({
        ...prev,
        duration: value,
        durationDisplay: selectedOption?.label || '1 Hour'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Scroll to selected duration on mount
  useEffect(() => {
    if (durationContainerRef.current) {
      const selectedElement = durationContainerRef.current.querySelector('.duration-option.selected');
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isOpen]);

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
              <div className="relative">
                <div 
                  ref={durationContainerRef}
                  className="h-26 overflow-y-auto rounded-lg p-2 scrollbar-hide"
                  style={{
                    scrollbarWidth: 'none',  /* Firefox */
                    msOverflowStyle: 'none',  /* IE and Edge */
                  }}
                >
                  <div className="space-y-1">
                    {durationOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => handleInputChange('duration', option.value)}
                        className={`duration-option px-4 py-2 rounded-md cursor-pointer transition-colors text-center ${
                          formData.duration === option.value
                            ? ' bg-gradient-to-r from-white-500 via-white-500 to-white-500 text-[#ff5500]'
                            : 'hover:bg-gray-100 text-gray-700'
                        } ${formData.duration === option.value ? 'selected' : ''}`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              </div>
              <div className="mt-2 text-center text-sm text-gray-500">
                Selected: {formData.durationDisplay}
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
