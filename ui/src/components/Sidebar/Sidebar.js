import ChatroomCards from './ChatroomCards';
import HeaderCard from './HeaderCard';
import { useContext } from 'react';
import ChatContext from '../../context/ChatProvider';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const { setCreatingChatroom } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleCreate = () => {
    setCreatingChatroom(true);
    navigate('/chat/new', { replace: true })
  }

  return (
    <div className='sidebar'>
      <HeaderCard />
      <button className="btn-hover color-3" onClick={handleCreate}>Create Nucleus</button>
      <h2>Nuclei:</h2>
      <ChatroomCards />
    </div>
  )
}

export default Sidebar;