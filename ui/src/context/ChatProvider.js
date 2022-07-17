import { createContext, useState, useEffect } from "react";
import axios from '../api/axios';

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {

    const getAndSetChatrooms = async (url) => {
        try {
            const response = await axios.get(url);
            console.log(response.data)
            setChatrooms(response.data)
        } catch (err) {
            console.log(err);
        }
    }
    
    const [chatrooms, setChatrooms] = useState([]);
    const [chatroom, setChatroom] = useState({});
    const [creatingChatroom, setCreatingChatroom] = useState(false);

    useEffect(() => {
        getAndSetChatrooms('http://localhost:3500/chatrooms');
    }, [creatingChatroom])


    return (
        <ChatContext.Provider value={{
            chatrooms, setChatrooms, chatroom, setChatroom, creatingChatroom, setCreatingChatroom
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext;