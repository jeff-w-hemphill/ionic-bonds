import React from 'react'
import Message from './Message';


const Messages = ({ messages }) => {
    
    return (
        <div className='messages-area'>
        {messages.map(message => (
            <Message user={message.user} timestamp={message.timestamp} content={message.content} />
            ))}
        </div>
    )
}

export default Messages;