import Message from './Message';

const Messages = ({ messages }) => {
    
    return (
        <div className='messages-area'>
        {messages.map(message => (
            <Message username={message.username} timestamp={message.timestamp} content={message.content} />
            ))}
        </div>
    )
}

export default Messages;