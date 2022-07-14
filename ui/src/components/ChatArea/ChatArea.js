import React from 'react';
import MessagesArea from './MessagesArea';
import SendMessage from './SendMessage';

const ChatArea = () => {
  return (
    <div className='chat-area'>
      <MessagesArea />
      <SendMessage />
    </div>
  )
}

export default ChatArea