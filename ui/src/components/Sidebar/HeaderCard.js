import AuthContext from "../../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import Logo from '../../components/Logo';

const HeaderCard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
      setAuth({});
      navigate('/login');
  }
  return (
    <div className='header-card' onClick={() => navigate('/chat')}>
      <Logo className='logo' />
      <p>Chatting as: <b style={{ color: 'black' }}>{auth.username}</b></p>
      <a onClick={logout}>logout</a>
    </div>
  )
}

export default HeaderCard;