import React from 'react';
import ChatroomCard from './ChatroomCard';
import { useContext } from 'react';
import ChatContext from '../../context/ChatProvider';

const ChatroomCards = () => {

  const { chatrooms, setChatrooms } = useContext(ChatContext);

  return (
    <div className='chatroom-cards'>
      {chatrooms.map(chatroom => (
        <ChatroomCard name={chatroom.name} description={chatroom.description} lastUpdated={chatroom.messages[chatroom.messages.length - 1].date} /> 
      ))}
    </div>
  )
}

export default ChatroomCards