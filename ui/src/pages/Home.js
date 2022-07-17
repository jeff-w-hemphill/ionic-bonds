import { useNavigate, Routes, Route, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Sidebar from "../components/Sidebar/Sidebar.js";
import ChatArea from "../components/ChatArea/ChatArea.js";

const Home = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/login');
    }

    return (
        <div className="home">
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Home