import SearchForm from "../components/SearchForm"
import ChatBox from "../components/ChatBox"
import Result from "../components/Result"
import Potiental from "../components/Potiental"
import Friend from "../components/Friend"
import Invitation from "../components/Invitation"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import {BiMessageSquareDetail} from "react-icons/bi"
import {SlEnvolopeLetter} from "react-icons/sl"
import { ChatContext } from "../context/ChatContext"
import { unreadNotificationsFunc } from "../../utils/unreadNotifications"

const Chat = () => {
    const {responsiveChat,setResponseChat} = useContext(AuthContext)
    const {markAllNotificationAsRead,notifications,updateCurrentChat,currentChat} = useContext(ChatContext)
    const unreadNotifications = unreadNotificationsFunc(notifications)
    const handleDeleteCurrentChat = (responsiveChat) => {
        responsiveChat ?  updateCurrentChat(currentChat) : updateCurrentChat(null) 
    }

    return ( 
        <div className="chat">
              <div className="chat-container">
                       <div className="response">
                              <ul>
                                    <li onClick={()=>{
                                          handleDeleteCurrentChat(responsiveChat)
                                          setResponseChat(!responsiveChat)
                                         
                                          }}><BiMessageSquareDetail/></li>
                                    <li onDoubleClick={()=>markAllNotificationAsRead(notifications)}><SlEnvolopeLetter/> <span>{
                                          unreadNotifications?.length
                                          }</span></li>
                              </ul>
                       </div>
                       <div className={responsiveChat ? "chat-left visibility" : "chat-left hide"}>
                              <SearchForm/> 
                              <Result/> 
                              <Invitation/>
                              <Potiental/>
                              <Friend/>
                       </div>
                       <div className={responsiveChat ? "chat-right hide" : "chat-right visibility"}>
                             <ChatBox/>
                       </div>
              </div>
        </div>
     );
}
 
export default Chat;