const Message = ({ username, timestamp, content }) => {
  return (
    <div className='message-block'>
      <div className='message-block-meta'>
        <h2>{username}</h2>
        <date>{new Date(timestamp).toLocaleString()}</date>
      </div>
      <p>{content}</p> 
    </div>
  )
}

export default Message;