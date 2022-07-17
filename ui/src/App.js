import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './components/Layout';
import Missing from './pages/Missing';
import RequireAuth from './components/RequireAuth';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChatProvider } from './context/ChatProvider';
import ChatArea from "./components/ChatArea/ChatArea.js";
import CreateChatroom from "./components/CreateChatroom";


function App() {

  return (
  <ChatProvider>
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Navigate replace to="login" />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="chat" element={<Home />}>
        <Route path="" element={<h1>join a room</h1>} />
        <Route path="new" element={<CreateChatroom />} />
        <Route path=":name" element={<ChatArea />} />
      </Route>
       {/* catch all */}
       <Route path="*" element={<Missing />} />
     </Route>
   </Routes>
  </ChatProvider>

  );
}

export default App;
