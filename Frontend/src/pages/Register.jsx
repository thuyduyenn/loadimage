import { useContext,useState,useEffect } from "react";
import {AuthContext} from "../context/AuthContext"
import {useNavigate} from "react-router-dom"
const Register = () => {
      const {updateRegisterInfo,register,registerUser,registerLoading,user,flat,registerError} = useContext(AuthContext)
      const navigate = useNavigate()
      
   useEffect(()=> {
         if(user?._id){
               navigate("/")
         }
   },[user,navigate,flat])

   const [nameImage,setNameImage] = useState({
      imageName:"",

   })
   const handleChangeImage = (e) => {
      setNameImage({
            ...nameImage,
            imageName:e.target.files[0].name
      })
      const file = e.target.files[0]
      TransformFile(file)
      
   }
   const TransformFile = (file) => {
           const reader = new FileReader()
           if(file){
                reader.readAsDataURL(file)
                reader.onloadend = () => {
                  updateRegisterInfo({
                          ...register,
                          image:reader.result
                  }) 
                }
           }
   }
 
    return ( 
        <div className="form">
        <form onSubmit={registerUser}>
              <h1>Register</h1>
              <input type="text" name="name" placeholder="enter your name..." onChange={(e)=> {
                    updateRegisterInfo({
                          ...register,
                          name:e.target.value
                    })
              }}/>
              <input type="email" name="email" placeholder="enter your email...."
                 onChange={(e)=> {
                    updateRegisterInfo({
                          ...register,
                          email:e.target.value
                    })
              }}
              />
              <input type="password" name="password" placeholder="enter your password...."
                 onChange={(e)=> {
                    updateRegisterInfo({
                          ...register,
                          password:e.target.value
                    })
              }}
              />
              <input type="file" accept="image/" name="file" hidden id="file-id" 
                 onChange={
                  handleChangeImage
               }
              />
              <div>
              <label htmlFor="file-id"> chọn avatar</label>
              <p>{nameImage.imageName ? nameImage.imageName : null}</p>
              </div>
              <button>{registerLoading ? "Loading...." : "register"}</button>
             <div className="error">{registerError?.message}</div>
        </form>
    </div>
     );
}
 
export default Register;