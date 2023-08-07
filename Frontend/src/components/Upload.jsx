import { useEffect, useState } from "react";
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import {AiOutlinePicture} from "react-icons/ai"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {FcPicture} from "react-icons/fc"

const Upload = () => {
      const [isPickerVisible,setIsPickerVisible] = useState(false)
      const [currentEmoji,setCurrentEmoji] = useState(null)
      const {flatUpload,changeFlatUpload,uploadText,updateUploadText,uploadImage,uploadError,uploadLoading} =  useContext(AuthContext)
      const [nameImage,setNameImage] = useState({
            name:""
      })

    
      const handleImage = (e) => {
            setNameImage ({
                  ...nameImage,
                  name:e.target.files[0].name
            }
            )
            const file = e.target.files[0]
            TransformFile(file)
      }
      const  TransformFile = (file)=> {
            const reader = new FileReader();
            if(file){
                  reader.readAsDataURL(file)
                  reader.onloadend = () => {
                        updateUploadText({
                              ...uploadText,
                              image:reader.result
                        }) 
                  }
            }
      }
 
   
      
    return ( 
    <div className="uploads" style={{
      display: flatUpload ? "block" : "none"
 }}>
         <div className={isPickerVisible ? "upload-container wrap" : "upload-container"}>
                <div className="upload-left">
                       <form>
                             <h2>Bạn muốn đăng gì ???</h2>
                            
                             <div id="status">
                                 <input type="text" placeholder="bạn đang nghĩ gì..." onChange={(e)=> updateUploadText({
                                        ...uploadText,
                                        text:e.target.value
                                 })} value={uploadText.text}/>
                                 <label onClick={()=> setIsPickerVisible(!isPickerVisible)}>😀</label>
                                 
                             </div>
                             <div style={{
                                     display: isPickerVisible ? "block" : "none"
                                   }}>
                                   <Picker data={data} previewPosition="none" onEmojiSelect={(e)=> {
                                    setCurrentEmoji(e.native);
                                    updateUploadText({
                                        ...uploadText,
                                        text:uploadText.text +  e.native
                                 })

                              }}/>
                             </div>
                             <input type="file" accept="/image" hidden id="upload-image" onChange={handleImage} />
                             <label htmlFor="upload-image" id="label-upload-image" onClick={()=> setIsPickerVisible(false)}>{
                                    nameImage.name ? nameImage.name : <>Chọn ảnh <AiOutlinePicture/></>
                             }

</label>
                              <div className="error">{uploadError?.message}</div>
                             <button onClick={
                              uploadImage
                            
                              
                              }>{
                              uploadLoading ? "uploading" : "upload"
                             }</button>
                       </form> 
                   
                </div>
                <div className="upload-between"></div>
                <div className="upload-right">
                       <button onClick={changeFlatUpload}>Quay lại</button>
                        <div className="upload">
                                     <div className="top">
                                        <div className="image">
                                        {
                                          localStorage.getItem("user") &&   <img src={JSON.parse(localStorage.getItem("user")).image ? JSON.parse(localStorage.getItem("user")).image : "https://res.cloudinary.com/doquwihm4/image/upload/v1689860507/imageGallery/user_sfyjwb.png"}/>
                                        }
                                            
                                          
                                        </div>  
                                        <div className="content">
                                        {
                                          localStorage.getItem("user") && <p>{JSON.parse(localStorage.getItem("user")).name}</p>
                                        }
                                            

                                              <p>Ngày đăng</p>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                          {uploadText.text}
                                    </div>
                                    <div className={isPickerVisible ? "end wrapper" : "end"}>
                                    {
                                          uploadText.image ?
                                         <img src={uploadText.image && uploadText.image}/> : <div id="upload-icon-picture"><FcPicture /></div>
                                    }
                                    {

                                    }

                                    </div>
                        </div>
                </div>
         </div>
    </div> );
}
 
export default Upload;