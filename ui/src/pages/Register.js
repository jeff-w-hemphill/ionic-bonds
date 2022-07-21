import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { faCheck,faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'
import axios from '../api/axios';
import Logo from '../components/Logo';

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const REGISTER_URL = '/register';


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [name, setName] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USERNAME_REGEX.test(username);
        setValidUsername(result)
    },[username])

    useEffect(() => {
      setErrMsg('');
    }, [username, name])

    const handleSubmit = async (e) => {
      e.preventDefault();
      // if button enabled with JS hack

      try {
        const response = await axios.post(REGISTER_URL, 
          JSON.stringify({ username, name }), 
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        setSuccess(true);
        // clear input fields 
        setUsername('');
        setName('');

      } catch (err) {
          if (!err?.response) {
              setErrMsg('No server response')
          } else if (err.response?.status === 409) {
              setErrMsg('Username taken')
          } else {
              setErrMsg('Registration Failed')
          }
          errRef.current.focus();
      }
    }

  return (
    <div className='auth'>
      <Logo className='auth-logo' />
      <section>
       {success ? (
         <section>
           <h1> Success!</h1>
           <p>
             <Link to="/login">Sign In</Link>
           </p>
         </section>
       ) : (
         <section>
           <p ref={errRef} className={errMsg ? "errmsg":
           "offscreen" } aria-live="assertive">{errMsg}</p>
           <h1>Register</h1>
           <form onSubmit={handleSubmit}>
             <label htmlFor="username">
               Username:
               <span className={validUsername ? "valid" : "hide"}>
                 <FontAwesomeIcon icon={faCheck} />
               </span>
               <span className={validUsername || !username ? "hide": "invalid"}>
                 <FontAwesomeIcon icon={faTimes} />
               </span>
             </label>
             <input 
               type="text"
               id="username"
               ref={userRef}
               autoComplete="off"
               onChange={(e) => setUsername(e.target.value)}
               required
               aria-describedby="uidnote"
               onFocus={() => setUserFocus(true)}
               onBlur={() => setUserFocus(false)}
             />
             <p id="uidnote" className={userFocus && username && !validUsername ? 
               "instructions" : "offscreen"}>
                 <FontAwesomeIcon icon={faInfoCircle} />
                 4 to 24 characters. <br />
                 Must begin with a letter. <br />
                 Letters, numbers, underscores, hyphens allowed.
             </p> 
   
             <label htmlFor="name">
               Name:
               <span className={name.length > 0 ? "valid": "hide"}>
                 <FontAwesomeIcon icon={faCheck} />
               </span>
               <span className="hide">
                 <FontAwesomeIcon icon={faTimes} />
               </span>
             </label>
             <input 
               type="name"
               id="name"
               onChange={(e) => setName(e.target.value)}
               required
             />
   
             <button disabled={name.length < 1 || !validUsername ? true : false}>Sign Up</button>
           </form>
           <p>
             Already Registered? <br />
             <span className="line">
               <Link to="/login">Sign In</Link>
             </span>
           </p>
         </section>
       )}
     </section>
    </div>
  )
}

export default Register;