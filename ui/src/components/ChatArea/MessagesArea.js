import React from 'react'
import MessageBlock from './MessageBlock';


const MessagesArea = ({ messages }) => {
    
    return (
        <div className='messages-area'>
        {messages.map(message => (
            <MessageBlock user={message.user} timestamp={message.timestamp} content={message.content} />
            ))}
        </div>
    )
}

export default MessagesArea