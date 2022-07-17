import React from 'react';
import ChatroomCard from './ChatroomCard';
import { useContext } from 'react';
import ChatContext from '../../context/ChatProvider';

const ChatroomCards = () => {

  const { chatrooms, setChatroom } = useContext(ChatContext);

  return (
    <div className='chatroom-cards'>
      {chatrooms.map(chatroom => (
        <ChatroomCard key={chatroom.name} chatroom={chatroom} setChatroom={setChatroom} /> 
      ))}
    </div>
  )
}

export default ChatroomCards