import React from 'react'
import MessageBlock from './MessageBlock';
import ChatContext from '../../context/ChatProvider';
import { useContext } from 'react';

const MessagesArea = () => {

    const { messages, setMessages } = useContext(ChatContext);
    return (
        <div className='messages-area'>
        {messages.map(message => (
            <MessageBlock user={message.user} date={message.date} content={message.content} />
        ))}
        </div>
    )
}

export default MessagesArea