import { useContext } from "react"
import {AiOutlineClose} from "react-icons/ai"
import {AiFillHeart} from "react-icons/ai"
import {BsCameraFill} from "react-icons/bs"
import { AuthContext } from "../context/AuthContext"
const LightBox = () => {
     const {isLightboxOn,dataLightbox,closeLightbox} = useContext(AuthContext)

    return ( 
        <div className="light-box" style={{
          display: isLightboxOn ? "flex" : "none"
        }}>
       {
          dataLightbox && (
               <div className="wrapper">
            <header>
                <div className="photographer">
                    <i className='bx bxs-camera'><BsCameraFill/></i>
                    <span>{dataLightbox.name}</span>
                 </div>
                 <div className="buttons">
                    <i className='bx bxs-download'><AiFillHeart/></i>
                    <i className='bx bx-x' onClick={closeLightbox}><AiOutlineClose/></i>
                 </div>
            </header>
            <div className="preview-img">
                 <div className="img"><img src={dataLightbox.image.url}/></div>
            </div>
       </div>
          )
       }
    </div>
     );
}
 
export default LightBox;