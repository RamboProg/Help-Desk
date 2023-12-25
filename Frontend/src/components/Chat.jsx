import React, { useState, useEffect } from 'react';
import { FaUser, FaRobot } from 'react-icons/fa'; // Import icons from react-icons

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Fetch messages from an API or use a predefined set of messages
  useEffect(() => {
    // Fetch messages or set predefined messages
    const initialMessages = [
      { text: 'Hello!', sender: 'user' },
      { text: 'Hi there!', sender: 'bot' },
      // Add more messages as needed
    ];
    setMessages(initialMessages);
  }, []);

  // Function to send a message
  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = { text: inputMessage, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      // Logic to handle bot responses or API calls can go here
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen">
        {/* Chat messages */}
        <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {/* Display user or bot profile image */}
                {message.sender === 'user' ? (
                  <FaUser className="w-6 h-6 rounded-full" />
                ) : (
                  <FaRobot className="w-6 h-6 rounded-full" />
                )}
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2">
                  {/* Display the message */}
                  <div>
                    <span className={`px-4 py-2 rounded-lg inline-block ${message.sender === 'user' ? 'rounded-br-none bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                      {message.text}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Input for typing messages */}
        <div className="border-t-2 border-gray-200 px-4 pt-4">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Write your message!"
              className="w-full focus:outline-none text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
              {/* Add send button */}
              <button
                type="button"
                onClick={sendMessage}
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <span className="font-bold">Send</span>
                {/* Your send icon here */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
