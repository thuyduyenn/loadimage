import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Invitation = () => {
     const {dataWait,updateRep} = useContext(ChatContext)
     const {allUser} = useContext(AuthContext)
     
    return ( 
        <div className="invitation" style={{
            display: dataWait?.length > 0 ? "block" : "none" 
        }}>
                <ul className="invitation-container">
                    {
                         dataWait?.map((item)=> {
                              const data = allUser?.filter((item1)=> item1._id === item.members[0])
                              if(data?.length > 0)
                                   return (
                                   <div key={item._id}>
                                   <li>
                          <div className="image">
                               <img src={data[0].image  ? data[0].image.url : "https://res.cloudinary.com/doquwihm4/image/upload/v1689860507/imageGallery/user_sfyjwb.png"}/>
                          </div>
                          <div className="content">
                               <p>{data[0].name}</p>
                               <p>{data[0].email}</p>
                          </div>
                          <button className="rep" onClick={()=>updateRep(item,data)}>
                               Chấp nhận 
                          </button>
                             </li>
                                   </div>
                              
                              
                              )
                         })
                    }
                    
                   
                </ul>
        </div>
     );
}
 
export default Invitation;