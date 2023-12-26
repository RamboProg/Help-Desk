import React, { useState, useEffect } from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const { ticketId } = useParams();

  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Check if there's an existing chat
        const existingChatResponse = await axios.get(`http://localhost:3000/chat?ticketId=${ticketId}`, { withCredentials: true });

        if (existingChatResponse.data.length > 0) {
          // If a chat exists, set the messages
          setMessages(existingChatResponse.data);
        } else {
          // If no chat exists, you can handle it here (e.g., display a message)
          console.log('No chat exists for this ticket.');
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    initializeChat();
  }, [ticketId]); // The empty dependency array ensures that this effect runs only once on component mount

  const sendMessage = async () => {
    if (inputMessage.trim() !== '') {
      try {
        const newMessage = { text: inputMessage, sender: 'user' };
        // Send the new message to the server
        await axios.put(`http://localhost:3000/chat?ticketId=${ticketId}`, { message: inputMessage }, { withCredentials: true });
        // Update the local messages state
        setMessages([...messages, newMessage]);
        setInputMessage('');
        // Logic to handle bot responses or API calls can go here
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen'>
        {/* Chat messages */}
        <div id='messages' className='flex flex-col space-y-4 p-3 overflow-y-auto'>
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.sender === 'user' ? <FaUser className='w-6 h-6 rounded-full' /> : <FaRobot className='w-6 h-6 rounded-full' />}
                <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2'>
                  <div>
                    <span
                      className={`px-4 py-2 rounded-lg inline-block ${
                        message.sender === 'user' ? 'rounded-br-none bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {message.text}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Input for typing messages */}
        <div className='border-t-2 border-gray-200 px-4 pt-4'>
          <div className='relative flex'>
            <input
              type='text'
              placeholder='Write your message!'
              className='w-full focus:outline-none text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3'
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <div className='absolute right-0 items-center inset-y-0 hidden sm:flex'>
              {/* Add send button */}
              <button
                type='button'
                onClick={sendMessage}
                className='inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none'
              >
                <span className='font-bold'>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
