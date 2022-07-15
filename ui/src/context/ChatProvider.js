import { createContext, useState, useEffect } from "react";

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {

    const data = {
        chatrooms: [
            {
                name: 'chat1',
                description: 'fun place to talk',
                messages: [{
                    user: 'user1',
                    date: Date.now(),
                    content: 'Hello friends'
                },
                {
                    user: 'user1',
                    date: '2022-01-01',
                    content: 'Hello L'
                }]
            },
            {
                name: 'chat2',
                description: 'Another fun place',
                messages: [{
                    user: 'user3',
                    date: Date.now(),
                    content: 'Hello rhcp'
                },
                {
                    user: 'user4',
                    date: Date.now(),
                    content: 'Hello dude'
                }]
            }
        ],
    };

    const [chatrooms, setChatrooms] = useState(data.chatrooms);
    const [chatroom, setChatroom] = useState({});
    const [messages, setMessages] = useState(data.chatrooms[0].messages);


    return (
        <ChatContext.Provider value={{
            chatrooms, setChatrooms, chatroom, setChatroom, messages, setMessages
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext;