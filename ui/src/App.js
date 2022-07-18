import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './components/Layout';
import Missing from './pages/Missing';
import RequireAuth from './components/RequireAuth';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChatProvider } from './context/ChatProvider';
import Chatroom from "./components/Chatroom/Chatroom.js";
import CreateChatroom from "./components/CreateChatroom";
import JoinRoom from './components/JoinRoom';


function App() {

  return (
    <div className='App'>
      <ChatProvider>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Navigate replace to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="chat" element={<Home />}>
              <Route path="" element={<JoinRoom />} />
              <Route path="new" element={<CreateChatroom />} />
              <Route path=":name" element={<Chatroom />} />
            </Route>
            {/* catch all */}
          </Route>
          <Route path="*" element={<Missing />} />
        </Routes>
      </ChatProvider>
    </div>
  );
}

export default App;
