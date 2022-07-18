import { useState, useEffect } from 'react';
import Messages from './Messages';
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatContext from '../../context/ChatProvider';
import AuthContext from '../../context/AuthProvider';
import { useContext } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3500');

const Chatroom = () => {
  
  const { chatroom } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    const messageObj = { username: auth.username, content: newMessage, timestamp: Date() }
    socket.emit('send_message', { messageObj, room: chatroom.name });
    setMessages(messages => messages.concat(messageObj).slice(-50)); // just show the last 50 messages
    setNewMessage('');
  }
  
  // turn socket off after each render to avoid redundant messages received
  useEffect(() => {
    return () => socket.off('receive_message', console.log('sock off'));
  }, []);
  
  // change sockets when joining new chatroom
  useEffect(() => {
    setMessages(chatroom.messages);
    socket.emit('join_room', { username: auth.username, room: chatroom.name });
    return () => socket.emit('leave_room', { username: auth.username, room: chatroom.name });
  }, [chatroom]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages(messages => messages.concat(data.messageObj).slice(-50)); // just show the last 50 messages
      return () => socket.off('receive_message', console.log('socket off'))
    })
  }, [])
    
  return (
    <div className='chat-area'>
      <ScrollToBottom className="messages-area">
        <Messages messages={messages} />
      </ScrollToBottom>
      <div className='send-message'>
        <textarea rows="1" placeholder="Message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} />
        <button className="btn-hover color-3" onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Chatroom;