import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
const LOGIN_URL = '/login';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    //const from = location.state?.from?.pathname || "/chat";

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username])
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username }),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );           

            setAuth({ username, name: response.data.name })
            setUsername('');
            navigate('/chat', { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username');
            } else if (err.response?.status === 401) {
                setErrMsg('Username not found');
            } else {
                setErrMsg('Login failed');
            }
            
            errRef.current.focus();
        }
    }

  return (
        <section className='auth'>
            <p ref={errRef} className={errMsg ? 'errmsg' : "offscreen"} 
                aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username} 
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account? <br />
                    <span className="line">
                        {/* put router link here */}
                        <Link to="/register">Sign Up</Link>
                    </span>
                </p>
        </section>
  )
}

export default Login