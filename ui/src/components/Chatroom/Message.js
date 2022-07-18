import React from 'react'

const Message = ({ user, timestamp, content }) => {
  return (
    <div className='message-block'>
        <h5>{user}</h5>
        <p>{content}</p>
        <p>{timestamp}</p>
    </div>
  )
}

export default Message;