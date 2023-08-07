import Messages from "./Messages";
import { useEffect } from "react"
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import {BsFillSendFill} from "react-icons/bs"
import {CiFaceSmile} from "react-icons/ci"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useFetchRecipientUser } from "../hooks/useFetchRecipientUser";

const ChatBox = () => {
      const {chatVisible,setChatVisible,user} = useContext(AuthContext)
      const {currentChat,textMessage,updateTextMessage,sendTextMessage} = useContext(ChatContext)
      const { recipientUser } = useFetchRecipientUser(currentChat,user)
      useEffect(()=>{
            if(currentChat){
                  localStorage.setItem("currentChat",JSON.stringify(currentChat))
            }
       },[currentChat])
      if(!recipientUser) return (
            <p style={{textAlign: "center",width: "100%"}}>
                No conversation selected yet....
            </p>
     )

    return ( 
    <div className="chat-box">
          <div className="chat-box-top">
                <div className="image">
                      <img src={recipientUser.image ? recipientUser.image?.url : "https://res.cloudinary.com/doquwihm4/image/upload/v1689860507/imageGallery/user_sfyjwb.png"}/>
                </div>
                <div className="content">
                    <p>{recipientUser.name}</p>
                    <p>{recipientUser.email}</p>
                </div>
          </div>
          <div className="chat-box-container">
               <Messages/>
           
          </div>
          <div className="chat-box-end">
              <div style={{display:chatVisible ? "block" : "none"}} id="icons">
                 <Picker data={data} previewPosition="none" onEmojiSelect={(e)=> {
                        updateTextMessage({
                           ...textMessage,
                           text:textMessage.text + e.native
                        })
                 }}/>

                </div>   
             <form onSubmit={sendTextMessage}>
               <i onClick={()=> setChatVisible(!chatVisible)}><CiFaceSmile/></i>
               <input type="text" name="text" placeholder="Typing messages" onChange={(e)=>updateTextMessage({
                     ...textMessage,
                     text:e.target.value
               })} value={textMessage.text}/>
                 
               <button><BsFillSendFill/></button>
             </form>
            </div> 
    </div> );
}
 
export default ChatBox;