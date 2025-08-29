import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { BsChatDots } from 'react-icons/bs';
import { IoLocation } from "react-icons/io5";

function SpotlightDetailCard({ user, onClose, onApproach, onChat, approach = false }) {
  if (!user) return null;

  const handleApproach = (e) => {
    e.stopPropagation();
    if (!approach && onApproach) {
      onApproach();
    }
  };

  const handleChat = (e) => {
    e.stopPropagation();
    if (onChat) onChat();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 p-1"
            aria-label="Back"
          >
            <IoArrowBackOutline className="w-5 h-5" />
          </button>

          <div className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-700">
            <IoLocation className="w-5 h-5 mr-1 text-red-500" />
            <span>{user.location || 'Central Park'}</span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-6 text-center">
          {/* Profile Picture */}
          <div className="relative mx-auto w-65 h-65 mb-4">
            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop'}
              alt={user.name}
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>

          {/* Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-1">{user.name || 'Mia Daniels'}</h3>

          {/* Status Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange-50 text-orange-600 border border-orange-200 mb-6">
            {user.note || 'Open to anything!'}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleApproach}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer ${approach
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
            >
              {approach ? 'Approached' : 'Approach'}
            </button>
            <button
              onClick={handleChat}
              className="flex-1 py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer"
            >
              <BsChatDots className="w-5 h-5 mr-2" />
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpotlightDetailCard;
