import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatroomCard = ({ chatroom, setChatroom }) => {

  const navigate = useNavigate();

  const handleSelection = async () => {
    await setChatroom(chatroom)
    navigate(`/chat/${chatroom.name}`);
  }

  return (
    <div className='chatroom-card' onClick={handleSelection}>
      <h1>{chatroom.name}</h1>
      <p>Last message: {chatroom.messages.length > 0 ? chatroom.messages[chatroom.messages.length - 1].timestamp : 'No messages'}</p>
    </div>
  )
}

export default ChatroomCard;