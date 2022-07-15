import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './components/Layout';
import Missing from './pages/Missing';
import RequireAuth from './components/RequireAuth';
import { Routes, Route, Link } from 'react-router-dom';
import { ChatProvider } from './context/ChatProvider';

function App() {
  return (
  <ChatProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Home />} />
      </Route>
       {/* catch all */}
       <Route path="*" element={<Missing />} />
     </Route>
   </Routes>
  </ChatProvider>

  );
}

export default App;
