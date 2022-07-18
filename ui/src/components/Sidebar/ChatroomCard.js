import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ChatContext from '../../context/ChatProvider';

const ChatroomCard = ({ name, lastMessageTime }) => {

  const { getAndSetChatroom } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleSelection = async () => {
    await getAndSetChatroom(name)
    navigate(`/chat/${name}`);
  }

  return (
    <div className='chatroom-card' onClick={handleSelection}>
      <h1>{name}</h1>
      <p>Last message: {new Date(lastMessageTime).toLocaleString()}</p>
    </div>
  )
}

export default ChatroomCard;