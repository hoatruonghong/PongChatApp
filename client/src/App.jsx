import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />

      </Routes>
    </>
  );
}

export default App
