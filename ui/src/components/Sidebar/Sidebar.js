import React from 'react'
import ChatroomCards from './ChatroomCards'
import HeaderCard from './HeaderCard'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <HeaderCard />
      <button>Create Room</button>
      <ChatroomCards />
    
    </div>

  )
}

export default Sidebar;