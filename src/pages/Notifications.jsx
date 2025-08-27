import React, { useState, useEffect } from 'react';
import { FiX, FiCheck, FiClock, FiBell } from 'react-icons/fi';

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

// Format time to 12-hour format
const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
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

const NotificationItem = ({ notification, onDelete }) => {
  const [isRead, setIsRead] = useState(false);

  return (
    <div
      className={`relative p-4 rounded-xl mb-3 transition-all duration-200 ${isRead ? 'bg-white/50' : 'bg-white shadow-md'
        }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold">
              {notification.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0"
              onClick={() => setIsRead(true)}>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900 truncate">{notification.name}</span>
                {/* <span className="text-gray-500">•</span> */}
              </div>
              <p className="text-gray-600 text-sm text-start mt-1">{notification.text}</p>
              <span className="text-[9px] absolute right-0 pt-2 p-1 bottom-1 text-gray-500 flex items-center">
                <FiClock className="mr-1" size={12} />
                {formatTime(notification.timestamp)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* {!isRead && (
            <button 
              onClick={() => setIsRead(true)}
              className="p-1 text-gray-400 hover:text-green-500 transition-colors"
              aria-label="Mark as read"
            >
              <FiCheck size={18} />
            </button>
          )} */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notification.id);
            }}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete notification"
          >
            <FiX size={18} />
          </button>
        </div>
      </div>

      {!isRead && (
        <div className="absolute top-4 right-4 w-2 h-2 bg-orange-500 rounded-full"></div>
      )}
    </div>
  );
};

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

  // Initialize with sample data
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
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="text-sm text-orange-500 hover:text-orange-600 font-medium"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
            <FiBell className="text-orange-500" size={28} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
          <p className="text-gray-500 text-sm">You're all caught up!</p>
        </div>
      ) : (
        <div className="p-4">
          {sortedGroups.map(([date, dateNotifications]) => (
            <section key={date} className="mb-6">
              <div className="text-sm text-left font-medium text-gray-500 mb-3 px-1">
                {formatDate(date)}
              </div>
              <div className="space-y-2">
                {dateNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onDelete={deleteNotification}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
