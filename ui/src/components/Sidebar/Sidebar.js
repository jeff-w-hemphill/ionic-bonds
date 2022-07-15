import React from 'react';
import ChatroomCards from './ChatroomCards';
import HeaderCard from './HeaderCard';
import { useContext } from 'react';
import ChatContext from '../../context/ChatProvider';

const Sidebar = () => {

  const { chatrooms, setChatrooms } = useContext(ChatContext);
  return (
    <div className='sidebar'>
      <HeaderCard />
      <button>Create Room</button>
      <ChatroomCards />
    
    </div>

  )
}

export default Sidebar;