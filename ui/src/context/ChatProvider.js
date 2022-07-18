import { createContext, useState, useEffect } from "react";
import axios from '../api/axios';


const URL = 'http://localhost:3500/chatrooms';

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
        
    const [chatrooms, setChatrooms] = useState([]);
    const [chatroom, setChatroom] = useState({});
    const [creatingChatroom, setCreatingChatroom] = useState(false);


    const getAndSetChatrooms = async (url) => {
        try {
            const response = await axios.get(url);
            setChatrooms(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    const getAndSetChatroom = async (name) => {
        try {
            const response = await axios.get(`${URL}/${name}`);
            setChatroom(response.data);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getAndSetChatrooms(URL);
    }, [creatingChatroom, chatroom]);


    return (
        <ChatContext.Provider value={{
            chatrooms, setChatrooms, chatroom, setChatroom, creatingChatroom, setCreatingChatroom, getAndSetChatroom
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext;