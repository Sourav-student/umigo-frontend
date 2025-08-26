import React, { useState, useEffect } from 'react';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleBackToChatList = () => {
    setSelectedChat(null);
  };

  // On mobile/tablet, show either chat list or chat window
  if (isMobile) {
    if (selectedChat) {
      return (
        <div className="h-[calc(100vh-80px)] mt-0 bg-white px-4 pb-4 overflow-hidden max-md:px-0">
          <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
            <ChatWindow
              selectedChat={selectedChat}
              onBack={handleBackToChatList}
              isMobile={true}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="h-[calc(100vh-80px)] mt-0 bg-white px-4 pb-4 overflow-hidden max-md:px-0">
          <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
            <ChatList
              onSelectChat={handleChatSelect}
              selectedChatId={selectedChat?.id}
              isMobile={true}
            />
          </div>
        </div>
      );
    }
  }

  // On desktop, show both components side by side with proper margins
  return (
    <div className="h-[calc(100vh-80px)] mt-0 bg-gray-50 px-4 pb-4">
      <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden flex">
        <div className="w-1/3 border-r border-gray-200">
          <ChatList
            onSelectChat={handleChatSelect}
            selectedChatId={selectedChat?.id}
            isMobile={false}
          />
        </div>
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            <ChatWindow
              selectedChat={selectedChat}
              onBack={handleBackToChatList}
              isMobile={false}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a chat</h3>
              <p className="text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
