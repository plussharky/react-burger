import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main';
import Login from './pages/login';
import Register from './pages/register';
import FogotPassword from './pages/forgot-password';
import ResetPassword from './pages/reset-password';
import Profile from './pages/profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/fogot-password" element={<FogotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
