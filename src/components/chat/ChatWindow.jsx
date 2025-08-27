import React, { useState, useRef, useEffect } from 'react';

const ChatWindow = ({ selectedChat, onBack, isMobile }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Mock messages for the selected chat
  useEffect(() => {
    if (selectedChat) {
      // Generate different messages based on chat ID
      const mockMessages = generateMockMessages(selectedChat.id);
      setMessages(mockMessages);
    }
  }, [selectedChat]);

  const generateMockMessages = (chatId) => {
    const baseMessages = [
      {
        id: 1,
        sender: 'other',
        text: 'Hi there! How are you doing?',
        timestamp: '10:30 AM',
        avatar: selectedChat?.avatar
      },
      {
        id: 2,
        sender: 'me',
        text: 'I\'m doing great! Thanks for asking. How about you?',
        timestamp: '10:32 AM',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: 3,
        sender: 'other',
        text: 'Pretty good! Just working on some new projects.',
        timestamp: '10:35 AM',
        avatar: selectedChat?.avatar
      },
      {
        id: 4,
        sender: 'me',
        text: 'That sounds exciting! What kind of projects?',
        timestamp: '10:37 AM',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      }
    ];

    // Add chat-specific messages
    if (chatId === 1) {
      baseMessages.push({
        id: 5,
        sender: 'other',
        text: 'Mostly web development and mobile apps. Are you interested in tech?',
        timestamp: '10:40 AM',
        avatar: selectedChat?.avatar
      });
    } else if (chatId === 2) {
      baseMessages.push({
        id: 5,
        sender: 'other',
        text: 'I\'m working on some AI projects. Machine learning is fascinating!',
        timestamp: '10:40 AM',
        avatar: selectedChat?.avatar
      });
    }

    return baseMessages;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'me',
        text: message.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 overflow-hidden">
        <div className="text-center text-gray-500 max-w-md">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-xl font-medium mb-2">Select a chat to start messaging</p>
          <p className="text-base text-gray-400">Choose from your conversations on the left</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-w-0 h-full overflow-hidden">
      {/* Header - Always visible, fixed at top */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-white flex-shrink-0">
        {isMobile && (
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <img
          src={selectedChat.avatar}
          alt={selectedChat.name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0 text-justify">
          <h2 className="font-semibold text-gray-900 truncate text-lg">{selectedChat.name}</h2>
          {/* {selectedChat.title && (
            <p className="text-sm text-gray-500 truncate mt-1">{selectedChat.title}</p>
          )} */}
        </div>

        {/* <div className="flex items-center gap-2 flex-shrink-0">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a6 6 0 016 6v7a1 1 0 11-2 0v-7a4 4 0 00-8 0v7a1 1 0 11-2 0v-7a6 6 0 016-6z" />
            </svg>
          </button>
        </div> */}
      </div>

      {/* Messages - Only this area is scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-gray-50 min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
              {/* {msg.sender === 'other' && (
                <img
                  src={msg.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
              )} */}

              <div className={`relative px-4 py-3 pb-1 rounded-2xl ${msg.sender === 'me'
                ? 'bg-[#ffc59b] text-black'
                : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                }`}>
                <p className="text-sm break-words leading-relaxed text-left">{msg.text}</p>
                <span className={`text-[9px] mt-1 block opacity-60 text-right ${msg.sender === 'me' ? 'text-stone-900' : 'text-gray-500'
                  }`}>
                  {msg.timestamp}
                </span>

                {/* Message tail */}
                <div className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 ${msg.sender === 'me'
                  ? '-right-1 bg-[#ffc59b] rotate-45'
                  : '-left-1 bg-white border-l border-b border-gray-200 rotate-45'
                  }`}></div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input - Always visible at bottom, fixed */}
      <div className="w-full px-3 py-4 border-t border-gray-200 bg-white">
        <div className="flex gap-3 w-full">
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Write a message..."
              rows={1}
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:border-transparent resize-none text-sm"
            />

            {/* Input Icons */}
            {/* <div className="flex items-center gap-5 mt-3 text-gray-400">
        <button className="hover:text-gray-600 transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        <button className="hover:text-gray-600 transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
        <span className="text-sm font-medium">GIF</span>
        <button className="hover:text-gray-600 transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div> */}
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="px-5 py-3 mb-2 bg-[#ff5500] text-white rounded-xl hover:bg-[#e64d00] disabled:bg-[#ff550032] disabled:cursor-not-allowed transition-colors font-medium shadow-sm flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
              <path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div >
  );
};

export default ChatWindow;
