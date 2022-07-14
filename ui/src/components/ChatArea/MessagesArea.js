import React from 'react'
import MessageBlock from './MessageBlock'

const MessagesArea = () => {
  return (
    <div className='messages-area'>
        <MessageBlock />
        <MessageBlock />
        <MessageBlock />
    </div>
  )
}

export default MessagesArea