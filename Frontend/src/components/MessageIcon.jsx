import { useContext } from "react";
import {BiMessageDetail} from "react-icons/bi"
import {Link} from "react-router-dom";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications"
import { ChatContext } from "../context/ChatContext";
const MessageIcon = () => {
    const {notifications} = useContext(ChatContext)
    const unreadNotifications = unreadNotificationsFunc(notifications)
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    return ( <div className="message-icon">
               
              <Link to={user ? "/chat" : "/login"}><BiMessageDetail/> <span>{unreadNotifications?.length}</span></Link>
              
           
    </div> );
}
 
export default MessageIcon;