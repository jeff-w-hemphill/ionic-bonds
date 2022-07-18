import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.js";

const Home = () => {

    return (
        <div className="home">
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Home;