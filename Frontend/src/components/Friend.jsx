import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications"
import moment from "moment"
const Friend = () => {
     const {allListFriendFilter,updateCurrentChat,markThisUserNotificationAsRead,notifications,allMessages,onlineUsers} = useContext(ChatContext)
     const {allUser,responsiveChat,setResponseChat,user} = useContext(AuthContext)
     const unreadNotifications = unreadNotificationsFunc(notifications)
    
    return ( 
        <div className="list-friend">
           <h3>List Friend</h3>
           <ul>



            {
               allListFriendFilter?.map((item)=> {
                     
                     const  itemFilter = item.members[0] === user?._id ? allUser?.filter((item1)=> item1._id === item.members[1]) : allUser?.filter((item1)=> item1._id === item.members[0])

                     //get latest Messages
                     const messageCurrentChat = allMessages?.filter((item1)=> item1.chatId === item._id)
                     const latestMessage = messageCurrentChat[messageCurrentChat?.length -1 ]
                    
                    // get online user
                      const recipientUser = item.members.find((id)=> id !== user?._id)
                      
                      const isOnlineUser = onlineUsers?.find(id => id.userId === recipientUser)
                      const isMessageUnRead = unreadNotifications?.filter((item2) => item2.senderId === latestMessage?.senderId)

               

                    return (
                        <div key={item._id} onClick={()=>{
                           
                               markThisUserNotificationAsRead(item,notifications)
                               updateCurrentChat(item)
                               setResponseChat(!responsiveChat)
                            

                            

                        }

}>
                        {
                           itemFilter?.map((i)=> {
                              return (
                                   <div key={i._id}>
                                   <li>
                            
                             
                            <div>
                
                                     <div className={item.status === "Đã gửi lời mời kết bạn" ? "image active" : "image"}>
                                          <img src={i.image ? i.image.url : "https://res.cloudinary.com/doquwihm4/image/upload/v1689860507/imageGallery/user_sfyjwb.png"}/>
                                          
                                     </div>
                                     <div className="content">
                                          <p>{i.name}</p>
                                          <p className={isMessageUnRead?.length > 0 ? "wait" : "seen"}>{!latestMessage ? "" : latestMessage?.senderId === user?._id  ? "you: " : "" }{latestMessage ? latestMessage?.text : "No messages"}</p>
                                     </div>
                               </div>
                            <div className="time">
                                <div className={isOnlineUser ?  "online-on" : "online-off"}></div>
                                {moment(latestMessage?.createdAt).calendar()}
                               </div>
                          
                    
                    
                              </li>
                                   </div>
                              )
                           }
                              
                         )
                        }
                       
                        </div>
                    )
               })
            }
                  
                  
                  
                 
                  
                  
                  
                  
            </ul>
        </div>
     );
}
 
export default Friend;