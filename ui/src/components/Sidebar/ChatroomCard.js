import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import ChatContext from '../../context/ChatProvider';

const ChatroomCard = ({ name, lastMessageTime }) => {

  const { chatroom, getAndSetChatroom } = useContext(ChatContext);
  const navigate = useNavigate();
  
  const [selected, setSelected] = useState(false);

  const handleSelection = async () => {
    setSelected(true);
    await getAndSetChatroom(name)
    navigate(`/chat/${name}`);
  }

  useEffect(() => {
    if ( chatroom.name !== name) {
      setSelected(false)
    } else setSelected(true)
  }, [chatroom])

  return (
    <div className={selected ? 'chatroom-card-selected' : 'chatroom-card'} onClick={handleSelection}>
      <h1>{name}</h1>
      <p>Last message: {new Date(lastMessageTime).toLocaleString()}</p>
    </div>
  )
}

export default ChatroomCard;