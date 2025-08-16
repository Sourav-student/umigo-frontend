import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still redirect even if logout API fails
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-primary font-montserrat font-bold text-xl">
              UmiGo
            </h1>
            <button
              onClick={() => navigate('/')}
              className="text-white hover:text-primary transition-colors duration-200"
            >
              Home
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            <h2 className="heading-primary text-3xl mb-2">
              {user.name || 'User Profile'}
            </h2>
            <p className="body-text text-secondary">
              Welcome to your UmiGo profile
            </p>
          </div>

          {/* User Information */}
          <div className="space-y-6">
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="heading-secondary text-xl mb-4">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <p className="body-text text-white">
                    {user.name || 'Not provided'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <p className="body-text text-white">
                    {user.email || 'Not provided'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Member Since
                  </label>
                  <p className="body-text text-white">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="heading-secondary text-xl mb-4">Account Actions</h3>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/edit-profile')}
                  className="w-full bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate('/change-password')}
                  className="w-full bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Logging Out...
                    </div>
                  ) : (
                    'Logout'
                  )}
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="heading-secondary text-xl mb-4">Your Activity</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {user.eventsCreated || 0}
                  </div>
                  <div className="text-sm text-gray-300">Events Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {user.eventsAttended || 0}
                  </div>
                  <div className="text-sm text-gray-300">Events Attended</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {user.connections || 0}
                  </div>
                  <div className="text-sm text-gray-300">Connections</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 