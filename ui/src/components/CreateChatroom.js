import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useContext } from 'react';
import ChatContext from '../context/ChatProvider';

const CHATROOM_URL = '/chatrooms'

const CreateChatroom = () => {

    const userRef = useRef();
    const errRef = useRef();
    const { setCreatingChatroom, setChatroom } = useContext(ChatContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(CHATROOM_URL,
                JSON.stringify({ name }),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
        
            await setChatroom(response.data)
            await setCreatingChatroom(false);
            navigate(`/chat/${name}`, { replace: true });
            setName('');
        
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 409) {
                setErrMsg('Chatroom with that name already exists');
            } else {
                setErrMsg('Login failed');
            }
            
            errRef.current.focus();
        }
    }

    return (
    <section className='create-chatroom'>
        <p ref={errRef} className={errMsg ? 'errmsg' : "offscreen"} 
        aria-live="assertive">{errMsg}</p>
        <h1>Create Chatroom</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Name:</label>
            <input 
                type="text" 
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                value={name} 
                required
            />
            <button disabled={name.length < 1 ? true : false}>Create</button>
        </form>
    </section>
  )
}

export default CreateChatroom;