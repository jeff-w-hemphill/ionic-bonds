import React from 'react'

const ChatroomCard = ({ name, description, lastUpdated }) => {
  return (
    <div className='chatroom-card'>
      <h1>{name}</h1>
      <h2>{description}</h2>
      <p>Last message: {lastUpdated}</p>
    
    </div>
  )
}

export default ChatroomCard;