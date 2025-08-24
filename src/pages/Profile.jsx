import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.jpg';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('plans');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Mock user data for testing
  const mockUser = {
    name: 'Rachel Fox',
    email: 'rachel@example.com',
    avatar: logo,
    status: 'Available Now',
    interests: ['Movies', 'Coffee', 'Gym', 'Walk'],
    plans: [
      {
        id: 1,
        title: 'Evening Walk',
        time: '6:00 PM - Gandhi Maidan',
        icon: '🚶',
        type: 'walk'
      },
      {
        id: 2,
        title: 'Saiyaara',
        time: 'Friday - 9:00 PM - Cinepolis',
        icon: '🎬',
        type: 'movie'
      },
      {
        id: 3,
        title: 'Winter Shopping',
        time: 'Sunday - 4:00 PM - City Centre',
        icon: '🛍️',
        type: 'shopping'
      }
    ],
    glowTime: [
      {
        id: 1,
        title: 'Morning Yoga',
        time: '7:00 AM - Home',
        icon: '🧘',
        type: 'wellness'
      },
      {
        id: 2,
        title: 'Reading Session',
        time: '8:00 PM - Library',
        icon: '📚',
        type: 'learning'
      }
    ]
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const currentUser = user || mockUser;

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="bg-white border border-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700">Bangalore</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-4 py-6">
        <div className="text-center">
          {/* Profile Picture */}
          <div className="relative mx-auto mb-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
          
          {/* Status Badge */}
          <div className="inline-block bg-[#ff5500] text-white text-xs px-3 py-1 rounded-full mb-3">
            {currentUser.status}
          </div>
          
          {/* Name */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {currentUser.name}
          </h1>
          
          {/* Interests */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {currentUser.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 bg-[#ff5500] text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              My People
            </button>
            <button className="flex-1 bg-[#ff5500] text-white py-3 px-4 rounded-lg">
              Message
            </button>
          </div>
        </div>
      </div>

      {/* Tabbed Section */}
      <div className="px-4">
        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab('plans')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors ${
              activeTab === 'plans'
                ? 'border-[#ff5500] text-gray-900'
                : 'border-transparent text-gray-500'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Plans
            </div>
          </button>
          <button
            onClick={() => setActiveTab('glowTime')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors ${
              activeTab === 'glowTime'
                ? 'border-[#ff5500] text-gray-900'
                : 'border-transparent text-gray-500'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              GlowTime
            </div>
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'plans' && (
          <div className="space-y-3">
            {currentUser.plans.map((plan) => (
              <div key={plan.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{plan.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{plan.title}</h3>
                    <p className="text-sm text-gray-600">{plan.time}</p>
                  </div>
                </div>
                <button className="bg-[#ff5500] text-white text-sm px-3 py-1 rounded-full hover:bg-[#e64d00] transition-colors">
                  Join
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'glowTime' && (
          <div className="space-y-3">
            {currentUser.glowTime.map((activity) => (
              <div key={activity.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{activity.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.time}</p>
                  </div>
                </div>
                <button className="bg-[#ff5500] text-white text-sm px-3 py-1 rounded-full hover:bg-[#e64d00] transition-colors">
                  Join
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default Profile; 