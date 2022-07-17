import React from 'react';
import ChatroomCard from './ChatroomCard';
import { useContext } from 'react';
import ChatContext from '../../context/ChatProvider';

const ChatroomCards = () => {

  const { chatrooms, setChatrooms, setChatroom } = useContext(ChatContext);
  chatrooms.sort( 
    (objA, objB) => 
      (new Date(objB.messages[objB.messages.length - 1].timestamp).getTime()
       - new Date(objA.messages[objA.messages.length - 1].timestamp).getTime())
  )

  return (
    <div className='chatroom-cards'>
      {chatrooms.map(chatroom => (
        <ChatroomCard key={chatroom.name} chatroom={chatroom} setChatroom={setChatroom} /> 
      ))}
    </div>
  )
}

export default ChatroomCards