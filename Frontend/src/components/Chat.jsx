import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const { ticketId } = useParams();
  const socketRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/users/profile', { withCredentials: true });

        setUser(response.data.user);
        setUserId(response.data.user._id);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const existingChatResponse = await axios.get(`http://localhost:3000/chat?ticketId=${ticketId}`, { withCredentials: true });
        if (existingChatResponse.data.length > 0) {
          setMessages(existingChatResponse.data);
        } else {
          console.log('No chat exists for this ticket.');
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    if (userId) {
      initializeChat();
    }
  }, [userId, ticketId]);

  useEffect(() => {
    if (!userId) return;

    socketRef.current = io('http://localhost:3000', { withCredentials: true, transports: ['websocket'] });

    socketRef.current.on(`chat_${ticketId}`, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, ticketId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (inputMessage.trim() !== '') {
      try {
        await axios.put(`http://localhost:3000/chat?ticketId=${ticketId}`, { message: inputMessage }, { withCredentials: true });

        const newMessage = {
          SenderID: userId,
          Message: inputMessage
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage('');

        socketRef.current.emit('sendMessage', { message: inputMessage, userId: userId, ticketId: ticketId });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const backgroundImageStyle = {
    backgroundImage: `url('https://media.istockphoto.com/id/1311966784/photo/chat-speech-bubble-on-smart-phone-screen.jpg?s=170667a&w=0&k=20&c=TNWz88qi-m1ifi9ft_IaoEtJWEm7PEu9XFfGY9t5RME=')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const messagesEndRef = useRef(null);

  return (
    <div className='flex flex-col h-screen' style={backgroundImageStyle}>
      <div className='flex-1 p-4 sm:p-6 flex flex-col h-screen'>
        <button className='bg-blue-500 text-white p-2 rounded-md mb-4 self-start' onClick={() => navigate(-1)}>
          Back to Tickets
        </button>
        <div id='messages' className='flex flex-col space-y-4 p-3 bg-opacity-75 bg-white rounded-md overflow-y-auto flex-1'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.SenderID === userId ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end ${message.SenderID === userId ? 'justify-end' : 'justify-start'}`}>
                {message.SenderID === userId ? (
                  <FaUser className='w-6 h-6 rounded-full' />
                ) : (
                  <FaRobot className='w-6 h-6 rounded-full' />
                )}
                <div className='flex flex-col space-y-2 text-xs max-w-md mx-2'>
                  <div>
                    <span
                      className={`px-4 py-2 rounded-lg inline-block ${
                        message.SenderID === userId ? 'rounded-br-none bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {message.Message}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
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
