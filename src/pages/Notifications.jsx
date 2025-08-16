import React, { useState, useEffect } from 'react';

// Helper function to format date
const formatDate = (date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const notificationDate = new Date(date);
  
  // Reset time part for date comparison
  const todayStr = today.toDateString();
  const yesterdayStr = yesterday.toDateString();
  const notificationDateStr = notificationDate.toDateString();
  
  if (notificationDateStr === todayStr) return 'Today';
  if (notificationDateStr === yesterdayStr) return 'Yesterday';
  
  // For older dates, return formatted date (e.g., "Aug 14, 2023")
  return notificationDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Sample notifications data with timestamps
const sampleNotifications = [
  { 
    id: 1,
    name: 'Selmon Bhai', 
    text: 'just posted a coffee plan near Dakbanglow. Wanna join?',
    timestamp: new Date().toISOString() // Now
  },
  { 
    id: 2,
    name: 'Rahul', 
    text: "turned on GlowMode — he's down to hang near KFC.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
  },
  { 
    id: 3,
    name: 'New feature', 
    text: 'You can now chat before joining a plan!',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  { 
    id: 4,
    name: 'BeanStreet', 
    text: 'is offering 20% off today for Umigo users.',
    timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString() // 25 hours ago
  },
  { 
    id: 5,
    name: 'Kriti', 
    text: 'viewed your profile through Spotlight.',
    timestamp: new Date(2023, 7, 14).toISOString() // Specific date (Aug 14, 2023)
  },
  { 
    id: 6,
    name: 'New feature', 
    text: 'You can now chat before joining a plan!',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  { 
    id: 7,
    name: 'BeanStreet', 
    text: 'is offering 20% off today for Umigo users.',
    timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString() // 25 hours ago
  },
  { 
    id: 8,
    name: 'Kriti', 
    text: 'viewed your profile through Spotlight.',
    timestamp: new Date(2023, 7, 14).toISOString() // Specific date (Aug 14, 2023)
  },
  { 
    id: 9,
    name: 'Reminder', 
    text: 'Your plan starts in 1 hour. Don’t forget!',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  { 
    id: 10,
    name: 'Movie Night at PVR', 
    text: 'got 2 new join requests.',
    timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString() // 25 hours ago
  },
  { 
    id: 11,
    name: 'Streak', 
    text: 'It’s been 3 days since your last plan. Post one now?',
    timestamp: new Date(2023, 7, 14).toISOString() // Specific date (Aug 14, 2023)
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  
  // Group notifications by date
  const groupedNotifications = notifications.reduce((groups, notification) => {
    const date = new Date(notification.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {});
  
  // Sort groups by date (newest first)
  const sortedGroups = Object.entries(groupedNotifications)
    .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA));
  
  // Initialize with sample data (in a real app, this would come from an API)
  useEffect(() => {
    setNotifications(sampleNotifications);
  }, []);
  
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-extrabold text-[#ff5500]">Notifications</h1>
        {notifications.length > 0 && (
          <button 
            onClick={clearAllNotifications}
            className="text-sm text-[#ff5500] hover:underline"
          >
            Clear All
          </button>
        )}
      </div>
      
      {notifications.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No notifications yet
        </div>
      ) : (
        <div className="space-y-6">
          {sortedGroups.map(([date, dateNotifications]) => (
            <section key={date} className="space-y-3">
              <div className="text-left font-semibold text-[#ff5500] pl-2">
                {formatDate(date)}
              </div>
              {dateNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="relative text-sm bg-white rounded-xl border border-[#ff5500]/20 p-4 hover:bg-orange-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="font-semibold text-[#ff5500] pr-6">
                      {notification.name}
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">
                        {new Date(notification.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="text-gray-400 hover:text-[#ff5500] transition-colors"
                        aria-label="Delete notification"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-700 mt-1">
                    {notification.text}
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
