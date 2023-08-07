import { useContext,useState } from "react";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Potiental = () => {
    const [isOpenNotifications,setIsOpenNotifications] = useState(false)
    const {user,allUser} = useContext(AuthContext)
    const {notifications,allListFriendFilter,markNotificationAsRead} = useContext(ChatContext)
    const unreadNotifications = unreadNotificationsFunc(notifications)
    const modifiedNotifications = unreadNotifications.map((n)=>{
         const sender = allUser?.find((user)=> user._id === n.senderId) 
         return ({
              ...n,
              senderImage:  sender?.image ? sender.image.url : "https://res.cloudinary.com/doquwihm4/image/upload/v1689860507/imageGallery/user_sfyjwb.png"
         })
                

    })
    return ( 
        <div className="potiental">
             <ul className="potiental-container">
                  {
                     modifiedNotifications && modifiedNotifications.map((n,index)=>{
                         return (
                           <div key={index} onClick={()=>markNotificationAsRead(n,allListFriendFilter,user,notifications)}>
                           <li>
                      <div className="image">
                      <img src={n.senderImage}/>
                      </div>
                      <span>1</span>
                          </li> 
                           </div>
                         )
                     })
                  }
                   
             </ul>
        </div>
     );
}
 
export default Potiental;