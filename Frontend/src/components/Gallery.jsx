import {AiFillHeart} from "react-icons/ai"
import {BsCameraFill} from "react-icons/bs"
import LightBox from "../components/LightBox";
import Upload from "../components/Upload"
import MessageIcon from  "../components/MessageIcon";
import { useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

const Gallery = () => {
     const {allImage, getLightbox,handleHeart,allUser,setFlatHeart,flatHeart,allHeart,addHeartErr,setAddHeartErr} = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=> {
        if(addHeartErr?.message === "Bạn cần đăng nhập"){
            setAddHeartErr(null)
             navigate("/login")
        }

    },[addHeartErr])



    return ( 
        <section className="gallery">
            <ul className="images">
         
           {
            
            allImage?.map((item)=> {
               const userLogin = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : null
               const user = allUser ? allUser.filter((item1)=> item1._id === item.userId) : null
               const heartQuantity = allHeart ? allHeart.filter((item1)=> item1.imageId === item._id) : null
               const heartOfUser = allHeart &&  userLogin ? allHeart.filter((item1)=>item1.userSender === userLogin) :null
                const heartRed = heartOfUser ? heartOfUser.filter((item1)=>item1.imageId === item._id) : null
               const image = item.image
               return (
                  <div key={item._id} onClick={()=>getLightbox(item)}>
                  <li className="card">
                 <img src={image.url} alt="img"/>
                  <div className="details">
                  <div className="photographer">
                     <i className='bx bxs-camera'><BsCameraFill/></i>
                     <span>{
                        user?.length > 0 ? <>{user[0].name}</> : null
                        }</span>
                  </div>
                  <button  onClick={(e)=> {

                          handleHeart(e,item),
                          setFlatHeart(!flatHeart)
                       }}>
                         <span>{heartQuantity ? heartQuantity.length : 0}</span>
                         <i className={heartRed?.length > 0 ? "bx bxs-download red" : "bx bxs-download"}><AiFillHeart/></i>
                  </button>
                  </div>
                  </li>
            </div>
               )
            })
           }

            </ul>
            {/* <button className="load-more">Load more</button> */}
            <MessageIcon/>
            <LightBox/>
            <Upload/>
      </section>
     );
}
 
export default Gallery;