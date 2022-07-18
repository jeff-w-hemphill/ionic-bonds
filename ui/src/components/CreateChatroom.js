import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import ChatContext from '../context/ChatProvider';

const CHATROOM_URL = '/chatrooms';
const CHATROOM_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_ ]{2,23}$/; 
const CreateChatroom = () => {

    const userRef = useRef();
    const errRef = useRef();
    const { setCreatingChatroom, setChatroom } = useContext(ChatContext);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [validName, setValidName] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = CHATROOM_NAME_REGEX.test(name);
        name.toLowerCase() === 'new' ? setErrMsg('Name cannot be "new"') : setErrMsg('');
        setValidName(result);
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRoom = {
            name: name,
            messages: [
                {
                    user: auth.username,
                    timestamp: Date(),
                    content: `Room created by ${auth.username}`
                }
            ]
        }
        try {
            const response = await axios.post(CHATROOM_URL,
                JSON.stringify( newRoom ),
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
                setErrMsg('Failed to create chatroom.');
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
            <label htmlFor="name">Name:</label>
            <input 
                type="text" 
                id="name"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                value={name} 
                required
            />
            <p id="pwdnote" className={ !validName ? 
                "instructions" : "offscreen"}>
                3 to 24 characters. <br />
                Must only include uppercase and lowercase letters, a number, and a special character. <br />
                Allowed special characters: <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p> 
            <button disabled={!validName || name.length < 1 || errMsg ? true : false}>Create</button>
        </form>
    </section>
  )
}

export default CreateChatroom;