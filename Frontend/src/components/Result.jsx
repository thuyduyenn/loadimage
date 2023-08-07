import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";




const Result = () => {
    const {userIsValidOfEmail,handleCreateChat} = useContext(ChatContext) 
    return ( 
    <div className="result" style={{
         display: userIsValidOfEmail ? "flex" : "none" 
    }}>
          <div className="result-container">
               {
                  userIsValidOfEmail?.map((item)=>{
                          return (
                              <div key={item._id}>
                              <div className="result-user">
                                     <div className="image">
                                           <img src={item.image ? item.image.url : "https://res.cloudinary.com/doquwihm4/image/upload/v1689860507/imageGallery/user_sfyjwb.png"}/>
                                     </div>
                              <div className="content">
                                   <p>{item.name}</p>
                                   <p>{item.email}</p>
                               </div>
                               <div className="btn-add" onClick={()=> handleCreateChat(item)} style={{cursor:"pointer"}}>Kết bạn</div>
                           </div>
                          
                              </div>
                           
                          )
                  }
                         
                  )
               }

               <div className="line"></div>
          </div>
        
    </div> );
}
 
export default Result;