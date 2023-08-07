import {Link} from "react-router-dom";
import {HiOutlinePhotograph} from "react-icons/hi"
import { AuthContext } from "../context/AuthContext";
import { useContext,useEffect,useState } from "react";
import {useNavigate} from "react-router-dom"
import {BiCloudUpload} from "react-icons/bi"

const Navbar = () => {
      const [userId,setUserId] = useState(null)
      const {logoutUser,user,changeFlatUpload} = useContext(AuthContext)
    const navigate = useNavigate()
      useEffect(()=> {
        if(localStorage.getItem("user")){
            let userId = JSON.parse(localStorage.getItem("user"))  
            setUserId({
               ...userId
            })
        }else {
            setUserId(null)
            navigate("/")


        }
         
      },[user])
      
      
     
    return ( 
        <div className="header">
             <Link to="/" className="logo">Cap <HiOutlinePhotograph id="logo"/></Link>
             <div className="navbar">
                   <ul>
                      
                      {userId ?  <><Link onClick={logoutUser}>Logout</Link><Link style={{display:"none"}}></Link></> : (
                        <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        </>
                      )}
                     
                     
                      <Link to={userId ? "/profile" : "/login"} className="avatar">
                            <div className="image-avatar">
                                {
                                    userId ? (
                                      <img src={userId.image ? userId.image : "https://res.cloudinary.com/doquwihm4/image/upload/v1689860507/imageGallery/user_sfyjwb.png"} alt="avatar" />
                              
                                    
                                    ) : (<img src="https://res.cloudinary.com/doquwihm4/image/upload/v1689860507/imageGallery/user_sfyjwb.png" alt="avatar" />)
                                }
                            </div>
                      </Link>
                      {userId && <Link id="upload" onClick={changeFlatUpload}> upload <BiCloudUpload/></Link> }
                      
                   </ul>
             </div>
           
        </div>
     );
}
 
export default Navbar;