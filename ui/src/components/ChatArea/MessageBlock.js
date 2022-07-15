import React from 'react'

const MessageBlock = ({ user, date, content }) => {
  return (
    <div className='message-block'>
        <h7>{user}</h7>
        <p>{content}</p>
        <p>{date}</p>
    </div>
  )
}

export default MessageBlock