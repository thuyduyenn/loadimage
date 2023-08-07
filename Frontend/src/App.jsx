import './App.css'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from "./pages/Login"
import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from './components/Navbar'
import Profile from "./pages/Profile"
import Chat from './pages/Chat'
import { ChatContextProvider } from './context/ChatContext'
function App() {
  return (
    <>
     <ChatContextProvider>
     <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/chat" element={<Chat/>}></Route>
          <Route path="*" element={<Navigate to="/"/>}></Route>
      </Routes>
     </ChatContextProvider>
    
 
  
    </>
    
  )
}

export default App
