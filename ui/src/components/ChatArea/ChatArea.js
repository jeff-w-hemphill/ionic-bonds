import React from 'react';
import { useState, useEffect } from 'react';
import MessagesArea from './MessagesArea';
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatContext from '../../context/ChatProvider';
import AuthContext from '../../context/AuthProvider';
import { useContext } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3500');

const ChatArea = () => {
  
  const { chatroom } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  
  // turn socket off after each render to avoid redundant messages received
  useEffect(() => {
    return () => socket.off('receive_message', console.log('sock off'))
  }, []);
  
  // // // temp..
  useEffect(() => {
    setMessages([]);
    socket.emit('join_room', { username: auth.username, room: chatroom.name });
  }, [chatroom])
  // // //

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = async () => {
    const messageObj = { user: auth.username, content: newMessage, timestamp: Date() }
    socket.emit('send_message', { messageObj, room: chatroom.name });
    setMessages(messages => messages.concat(messageObj))
    setNewMessage('');
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages(messages => messages.concat(data.messageObj));
      console.log('received message')
      return () => socket.off('receive_message', console.log('off'))
    })
  }, [socket])
    
  return (
    <div className='chat-area'>
      <ScrollToBottom className="messages-area">
        <MessagesArea messages={messages} />
      </ScrollToBottom>
      
      <div className='send-message'>
        <textarea rows="2" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} />
        <button className="btn-hover color-3" onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default ChatArea