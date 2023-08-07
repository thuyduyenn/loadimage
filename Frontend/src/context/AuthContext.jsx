 
 import { createContext, useState, useEffect, useCallback } from "react"
 import { postRequest,baseUrl,getRequest } from "../../utils/services"
 import swal from 'sweetalert'
 export const AuthContext = createContext()
 export const AuthContextProvider = ({children}) => {
     const [flatUpload,setFlatUpload] = useState(false)
     const changeFlatUpload = useCallback(()=> {
            setFlatUpload(!flatUpload)
     })
     const [register,setRegister] = useState({
           name:"",
           email:"",
           password:"",
           image:"",
     })
     const [login,setLogin] = useState({
           email:"",
           password:""
     })
     const [registerError,setRegisterError] = useState(null)
     const [user,setUser] = useState(null)
     const [registerLoading,setRegisterLoading] = useState(false)
     const updateRegisterInfo = useCallback ((info)=> {
           setRegister(info)
     })
     const updateLoginInfo = useCallback((info)=> {
        setLogin(info)
     })
     const [loginLoading,setLoginLoading] = useState(false)
     const [loginError,setLoginError] = useState(null)
     useEffect(()=> {
           let user = localStorage.getItem("user") && localStorage.getItem("user") 
            setUser(JSON.parse(user))
      },[])

     const registerUser = useCallback(async(e) => {
                   e.preventDefault();
                   setRegisterLoading(true)
                   setRegisterError(null)
                   const response = await postRequest(`${baseUrl}/users/register`,JSON.stringify(register))
                   setRegisterLoading(false)
                   if(response.error){
                           return setRegisterError(response)
                   }
                   localStorage.setItem("user",JSON.stringify(response))
                   setUser(JSON.parse(localStorage.getItem("user")))
                   swal({
                        title: "Đăng kí thành công",
                    
                        icon: "success",
                        button: "Aww yiss!",
                      });
                      setRegister({
                        name:"",
                       email:"",
                        password:"",
                        image:"",
                      })

     },[register])
     const loginUser = useCallback(async(e)=> {
                e.preventDefault();
              
                setLoginLoading(true)
                setLoginError(null)
                const response = await postRequest(`${baseUrl}/users/login`,JSON.stringify(login))
                
                setLoginLoading(false)
                if(response.error){
                       return setLoginError(response)
                }
               
                localStorage.setItem("user",JSON.stringify(response))
                setUser(JSON.parse(localStorage.getItem("user")))
                swal({
                  title: "Đăng nhập thành công",
                 
                  icon: "success",
                  button: "Aww yiss!",
                });
                setLogin({
                  email:"",
                  password:""
                })
           


     },[login])
   
     const logoutUser = useCallback(()=> {
           localStorage.removeItem("user")
           setUser(null)
          
     })
     //upload image start

       const [uploadText,setUploadText] = useState({
             userId:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : "",
             text:"",
             image:""
       })
       useEffect(()=> {
            setUploadText({
                  userId:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : "",
                  text:"",
                  image:""
            })
          
       },[user])
       
       const updateUploadText = useCallback((info)=> {
            setUploadText(info)
       })
       const [uploadLoading,setUploadLoading] = useState(false)
       const [uploadError,setUploadError] = useState(null)

       const uploadImage = useCallback(async(e)=> {
                 e.preventDefault();
                 setUploadLoading(true)
                 setUploadError(null)
                 const response = await postRequest(`${baseUrl}/gallery/upload`,JSON.stringify(uploadText))
                 setUploadLoading(false)
                 if(response.error){
                      return setUploadError(response)
                 }
              
                 setFlatUpload(!flatUpload)
                 swal({
                  title: "Tải lên thành công",
                  
                  icon: "success",
                  button: "Aww yiss!",
                });
                setUploadText({
                  
                        userId:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : "",
                        text:"",
                        image:""
              
                })
               


       })
       

       
      //upload image end

      //get image start
      const [allImage,setAllImage] = useState([])
        useEffect(()=> {
            const getImages = async() => {
                     const response = await getRequest(`${baseUrl}/gallery/store`)
                     if(response.error){
                        return console.log('Error fetching users', response)
                     }
                     setAllImage(response)
            }
            getImages()
        },[user,flatUpload])
         const [errorImageUser,setErrorImageUser] = useState(null)
         const [dataProfile,setDataProfile] = useState([])//profile

         useEffect(()=> {
            const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : null
            const getImageUser = async()=> {
                  setErrorImageUser(null)
                  if(userId){
                        const response = await getRequest(`${baseUrl}/gallery/find/${userId}`)
                        if(response.error){
                              return setErrorImageUser(response)
                      }
                      setDataProfile(response)
                  }

                


             }
          getImageUser()
         },[user,flatUpload])
    

       
      //get image end


      // handle lightbox start
         const [isLightboxOn,setIsLightboxOn]  = useState(false)
         const [dataLightbox,setDataLightbox] = useState(null)
         const [errLightbox,setErrLightbox] = useState(null)

         const getLightbox = useCallback(async(item)=> {
          
            setIsLightboxOn(true)
            setErrLightbox(null)
            const response = await getRequest(`${baseUrl}/users/${item.userId}`)
            if(response.error){
                    return setErrLightbox(response)
            }
            setDataLightbox({
                  image:item.image,
                  name:response.name,
                  
            })
            
         })
         const closeLightbox = useCallback(()=> {
                setIsLightboxOn(false)
         })

      //handle lightbox end

    //handleDownload
    const [addHeartErr,setAddHeartErr] = useState(null)
    const handleHeart = useCallback(async(e,item)=> {
        e.stopPropagation()
         if(localStorage.getItem("user")){
         
        
            const newHeart = {
                    imageId: item._id,
                    userSender:user?._id,
                    userRe:item.userId

            }
            setAddHeartErr(null)
            const response = await postRequest(`${baseUrl}/heart/add`,JSON.stringify(newHeart))
            if(response.error){
                      return setAddHeartErr(response)
            }
         }else {
            setAddHeartErr({
                  error:true,
                  message:"Bạn cần đăng nhập"
            })
         }
            
     
          
            
          
      
    },[user])
    const [flatHeart,setFlatHeart] = useState(false)
    const [allHeart,setAllHeart] = useState(null)
    useEffect(()=> {
          const getHeart = async() => {
                const response = await getRequest(`${baseUrl}/heart/show`)
                if(response.error){
                  return
                }
                setAllHeart(response)
                
          }
          getHeart()
    },[flatHeart])

    //handleDownload end
  //get all user start
  const [allUser,setAllUser] = useState(null)
  const [allUserError,setAllUserError] = useState(null)
  useEffect(()=> {
      const getAllUser = async() => {
            const response = await getRequest(`${baseUrl}/users/get/all`)
            if(response.error){
                    return setAllUserError(response)
            }
            setAllUser(response)


      }
       getAllUser()

     },[])
  
  //get all user end
  //message start
  const [chatVisible,setChatVisible] = useState(false)//show icons
  const [responsiveChat,setResponseChat] = useState(false)//response


   //message end 



     return (<AuthContext.Provider value={
        {
        

            register,
            updateRegisterInfo,
            registerUser,
            user,
            registerError,
            registerLoading,
            allUser,
            allUserError,




            login,
            updateLoginInfo,
            loginUser,
            loginLoading,
            loginError,

            logoutUser,

            flatUpload,
            changeFlatUpload,

            uploadText,
            updateUploadText,
            uploadImage,
            uploadLoading,
            uploadError,
        


            allImage,

            errorImageUser,
            dataProfile,
           

            getLightbox,
            isLightboxOn,
            dataLightbox,
            errLightbox,
            closeLightbox,


            handleHeart,
            setFlatHeart,
            flatHeart,
            allHeart,
            addHeartErr,
            setAddHeartErr,



            chatVisible,
            setChatVisible,
            responsiveChat,
            setResponseChat


        }
         }>
        {children}
     </AuthContext.Provider>

     )
 }
