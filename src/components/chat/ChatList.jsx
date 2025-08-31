import React, { useState } from 'react';

const ChatList = ({ onSelectChat, selectedChatId, isMobile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  // Mock chat data
  const chats = [
    {
      id: 1,
      name: 'Priya Nair',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Hey! How was your day today?',
      timestamp: 'Now',
      isOnline: true,
      unreadCount: 1,
      title: 'Loves coffee & long walks'
    },
    {
      id: 2,
      name: 'Rahul Verma',
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'I just finished watching a series on Netflix, do you watch thrillers?',
      timestamp: 'Jul 15',
      isOnline: false,
      unreadCount: 0,
      title: 'Movie buff & foodie'
    },
    {
      id: 3,
      name: 'Sneha Kapoor',
      avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Haha that’s funny 😂 where are you from?',
      timestamp: 'Jul 12',
      isOnline: true,
      unreadCount: 3,
      title: 'Loves music & beach sunsets'
    },
    {
      id: 4,
      name: 'Arjun Mehta',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'We should definitely try that café this weekend!',
      timestamp: 'Jul 8',
      isOnline: true,
      unreadCount: 0,
      title: 'Traveler at heart'
    },
    {
      id: 5,
      name: 'Meera Iyer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'That’s sweet of you to say 🙂',
      timestamp: 'Jul 5',
      isOnline: false,
      unreadCount: 0,
      title: 'Book lover 📚'
    },
    {
      id: 6,
      name: 'Kunal Sharma',
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Do you like dogs? I have a Labrador.',
      timestamp: 'Jul 3',
      isOnline: true,
      unreadCount: 2,
      title: 'Dog person 🐶'
    },
    {
      id: 7,
      name: 'Ishita Gupta',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Good morning! Did you have breakfast?',
      timestamp: 'Jul 1',
      isOnline: false,
      unreadCount: 0,
      title: 'Smiles a lot 😄'
    },
    {
      id: 8,
      name: 'Rohit Singh',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Haha you’re hilarious 😂',
      timestamp: 'Jun 28',
      isOnline: true,
      unreadCount: 5,
      title: 'Gym & fitness freak 💪'
    },
    {
      id: 9,
      name: 'Neha Agarwal',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'So what kind of music do you usually listen to?',
      timestamp: 'Jun 20',
      isOnline: false,
      unreadCount: 0,
      title: 'Music & dance lover'
    },
    {
      id: 10,
      name: 'Siddharth Rao',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'That’s interesting, I’d love to know more!',
      timestamp: 'Jun 18',
      isOnline: true,
      unreadCount: 1,
      title: 'Adventure seeker 🌍'
    },
    {
      id: 11,
      name: 'Ananya Sen',
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'You have a great sense of humor 😅',
      timestamp: 'Jun 15',
      isOnline: false,
      unreadCount: 0,
      title: 'Loves art & painting 🎨'
    }
  ];

  const filteredChats = chats.filter(chat => {
    // Filter by search query first
    const matchesSearch =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    // Then filter by active tab
    if (activeTab === 'All') return matchesSearch;
    if (activeTab === 'Unread') return matchesSearch && chat.unreadCount > 0;
    if (activeTab === 'Read') return matchesSearch && chat.unreadCount === 0;

    return matchesSearch;
  });

  const handleChatSelect = (chat) => {
    onSelectChat(chat);
  };

  return (
    <div className={`${isMobile ? 'w-full' : 'min-w-[320px] max-w-[500px] flex-shrink-0'} border-r border-gray-200 bg-white flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900 mb-3">Messaging</h1>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent placeholder:text-gray-500"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Action Icons */}
        {/* <div className="flex items-center justify-end gap-2 mt-3">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div> */}
      </div>

      {/* Tabs */}
      <div className="px-4 py-2 border-b border-gray-200">
        <div className="flex space-x-4 border-b border-gray-200 px-4">
          {['All', 'Unread', 'Read'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 text-sm font-medium border-b-2 ${activeTab === tab
                ? 'border-[#ff5500] text-[#ff5500]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab}
              {tab === 'Unread' && (
                <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-[#ff5500] text-white">
                  {chats.filter(chat => chat.unreadCount > 0).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatSelect(chat)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedChatId === chat.id ? 'bg-blue-50 border-l-4 border-l-[#ff5500]' : ''
              }`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}

              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                  {/* <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{chat.timestamp}</span> */}
                </div>
                <p className="text-sm text-gray-600 text-left line-clamp-2 leading-relaxed">{chat.lastMessage}</p>
              </div>

              <div className='flex flex-col items-center justify-center gap-5'>
                {/* Options */}
                <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                  {chat.unreadCount > 0 ? (
                    <div>
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-[#ff5500] text-white text-xs rounded-full">
                        {chat.unreadCount}
                      </span>
                    </div>
                  ) :
                    <div>
                      <span className="inline-flex items-center justify-center w-5 h-5 text-white text-xs rounded-full">
                      </span>
                    </div>
                  }
                </button>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{chat.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
