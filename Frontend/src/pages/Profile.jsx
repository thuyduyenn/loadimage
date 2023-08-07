import { useContext,useEffect,useState } from "react";
import { AuthContext } from "../context/AuthContext";
import moment from "moment"
import Upload from "../components/Upload"
const Profile = () => {
    const {errorImageUser,dataProfile} =  useContext(AuthContext)
     const [userId,setUserId] = useState(null)
    useEffect(()=> {
        if(localStorage.getItem("user")){
            let userId = JSON.parse(localStorage.getItem("user"))  
            setUserId({
               ...userId
            })
        }else {
            setUserId(null)
        }
    },[])

    return ( <div className="profile">
          <div className="profile-container">
                 <div className="profile-left">
                          
                            <div className="profile-background">{
                                userId && (
                                    <img src={userId.image ? userId.image : "https://res.cloudinary.com/doquwihm4/image/upload/v1689860507/imageGallery/user_sfyjwb.png"}/>
                                )
                            }
                            

                                <div className="shadow"></div>
                                <div className="image-user">
                                {
                                userId && (
                                    <img src={userId.image ? userId.image : "https://res.cloudinary.com/doquwihm4/image/upload/v1689860507/imageGallery/user_sfyjwb.png"}/>
                                )
                            }

                                </div>
                            </div>
                       
                         
                     
                         <div className="user-content">
                         {
                            userId && (
                                <>
                                   <p>{userId.name}</p>
                                   <p>{userId.email}</p>
                                </>
                                  
                            )
                         }
                            

                             
                                   
                        </div>
                 </div>
                 <div className="line-between"></div>
                 <div className="profile-right">
                       <h1>Dòng sự kiện của bạn</h1>
                       <div className="profile-right-container">
                            <ul>
                            {
                                dataProfile.length === 0 && (
                                    <li>Bạn chưa hoạt động nào</li>
                                )
                            }
                                

                          {
                            dataProfile.map((item)=> (
                                <div key={item._id}>
                                <li>
                                    <div className="top">
                                        <div className="image">
                                        {
                                          userId && (
                                              <img src={userId.image ? userId.image : "https://res.cloudinary.com/doquwihm4/image/upload/v1689860507/imageGallery/user_sfyjwb.png"}/>
                                            )
                                        }
                                        </div>  
                                        <div className="content">
                                            {
                                             userId && (
                                               <>
                                               <p>{userId.name}</p>
                                                <p>{moment(item.createdAt).calendar()}</p>
                                               </>
                                               
                                             )
                                            }
                                              
                                        </div>
                                    </div>
                                    <div className="bottom">
                                          {item.status}
                                    </div>
                                    <div className="end">
                                         <img src={item.image.url}/>
                                    </div>
                                </li>
                                </div>
                            ))
                          }
                               
                               
                            </ul>
                       </div>
                 </div>
          </div>
          <Upload/>
    </div>);
}
 
export default Profile;