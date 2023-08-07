import { useContext,useRef,useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {baseUrl,getRequest } from "../../utils/services"
import moment from "moment"
const Messages = () => {
     const {messages,currentChat,newMessage,updateMessageFromLocalStorage} = useContext(ChatContext)
     const {user,allUser,responsiveChat} = useContext(AuthContext)
     const scroll = useRef()
     useEffect(()=>{
          scroll.current?.scroll({ top:"100%",
               behavior: 'smooth' })
     },[newMessage,scroll])
     useEffect(()=> {
          const getMessageFromLocal = async() => {
               if(responsiveChat === false){
                    const currentChatTempId = localStorage.getItem("currentChat") ? JSON.parse(localStorage.getItem("currentChat"))._id : "null"
                    const response = await getRequest(`${baseUrl}/messages/${currentChatTempId}`)
                    if(!response.error){
                         updateMessageFromLocalStorage(response)
                    }
                }
          }
          getMessageFromLocal()
     },[responsiveChat])
    return ( 
        <div className="messages" ref={scroll}>
            <ul>
                {
                    messages?.map((message,index)=> {
                         const recipientId = currentChat?.members.find(id=> id !== user?._id)
                         const response = allUser?.filter((item)=> item._id === recipientId)
                         if(message.senderId === user?._id){
                              return (
                                  <div key={index} className="outcome-message">
                                  <li >
                                     <p>{message?.text}</p>
                                      <p>{moment(message?.createdAt).calendar()}</p>
                                  </li>
                                  </div>
                              )
                         }
                         return (
                              <div key={index} className="income-message">
                              <li >
                     <div className="image">
                         {
                              response?.map((item,index)=> {
                                   return (
                                        <div key={index} style={{width:"100%",height:"100%"}}>
                                             <img src={item.image ? item.image.url : ""} />
                                        </div>
                                   )
                              })
                         }
                    
                     </div>
                     <div className="content">
                           <p>{message?.text}</p>
                          <p>{moment(message?.createdAt).calendar()}</p>
                     </div>
                    
                       </li>
                              </div>
                         )

                    })
                }
                
            
            </ul>
        </div>
     );
}
 
export default Messages;