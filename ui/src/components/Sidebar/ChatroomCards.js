import ChatroomCard from './ChatroomCard';
import { useContext } from 'react';
import ChatContext from '../../context/ChatProvider';

const ChatroomCards = () => {

  const { chatrooms } = useContext(ChatContext);
  chatrooms.sort( 
    (objA, objB) => 
      (new Date(objB.lastMessageTime).getTime() - new Date(objA.lastMessageTime).getTime())
  );

  return (
    <div className='chatroom-cards'>
      {chatrooms.map(chatroom => (
        <ChatroomCard key={chatroom.name} name={chatroom.name} lastMessageTime={chatroom.lastMessageTime} /> 
      ))}
    </div>
  )
}

export default ChatroomCards;