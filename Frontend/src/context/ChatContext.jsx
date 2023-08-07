import { useContext } from "react";
import {createContext,useState,useEffect, useCallback} from "react"
import { postRequest,baseUrl,getRequest } from "../../utils/services"
import { AuthContext } from "./AuthContext";
import { io } from "socket.io-client"
import {useFetchRecipientUser} from "../hooks/useFetchRecipientUser"
import {unreadNotificationsFunc} from "../../utils/unreadNotifications"
export const ChatContext  = createContext();
export const ChatContextProvider = ({children}) => {
    const [allPotiental,setAllPotiental] = useState(null)
    const [errorGetPotiental,setErrorGetPotiental] = useState(null)
    const [currentChat,setCurrentChat]  = useState(null)
    const {user,responsiveChat,setResponseChat} = useContext(AuthContext)
    const [socket,setSocket] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState(null)
    const [errorAddListF,setErrorAddListF] = useState(null)
    const [isLoadingAdd,setIsLoadingAdd] = useState(false)
    const [allListFriend,setAllListFriend] = useState(null)
    const [allListFriendFilter,setAllListFriendFilter] = useState(null)
    const [newChat,setNewChat] = useState(null)
    const [dataWait,setDataWait] = useState(null)
    const [isMessageLoading,setIsMessageLoading] = useState(false)
    const [messageError,setMessageError] = useState(null)
    const [sendTextMessageError,setSendTextMessageError] = useState(null)
    const [newMessage,setNewMessage] =  useState(null)
    const [userIsValidOfEmail,setUserIsValidOfEmail] = useState(null)
    const [errorValid,setErrorValid] = useState(null)
    const [notifications,setNotifications] = useState([])
    const [messages,setMessages] = useState(null)
    const {recipientUser} = useFetchRecipientUser(currentChat,user)
    const [allMessagesError,setAllMessagesError] = useState(null)
    const [allMessages,setAllMessages] = useState(null)
    const unreadNotifications = unreadNotificationsFunc(notifications)
    const thisUserNotifications = unreadNotifications?.filter(
         n => n.sender === recipientUser?._id
    )
    // socket starts
    //initial socket

    useEffect(()=>{
        const newSocket = io("http://localhost:3000")
        setSocket(newSocket)
        return () => {
             newSocket.disconnect()
        }
    },[user])
    useEffect(()=> {
        if(socket === null) return;
        if(user){
            socket.emit("addNewUser",user?._id)
            socket.on("getOnlineUsers",(res)=> {
                setOnlineUsers(res)
            })
        }
      
       
        return () => {
            socket.off("getOnlineUsers")
        }
    },[socket,user])
    useEffect(()=> {
              if(socket === null) return;
              const recipientId = currentChat?.members.find((id)=> id !== user?._id)
              socket.emit("sendMessage", {
                ...newMessage,recipientId})

    },[newMessage,socket])

    useEffect(()=> {
       if(socket === null) return
       socket.on("getMessage",res => {
             if(currentChat?._id !== res.chatId) return
             setMessages((prev)=> [...prev,res])
       })
       socket.on("getNotification",(res)=> {
        const isChatOpen = currentChat?.members.some(id => id === res.senderId)
        if(isChatOpen){
             setNotifications((prev) => [{...res, isRead:true},...prev])
        }else {
             setNotifications((prev) => [res,...prev])
        }
          
   })
   return () => {
         socket.off("getMessage")
         socket.off("getNotification")
   }
    },[socket,currentChat])

   


    //socket ends

    //add friend + search form start





    useEffect(()=> {


          const getAllUser = async() => {
            const response = await getRequest(`${baseUrl}/users/get/all`)
            if(response.error){
                    return setErrorGetPotiental(response)
            }
            // const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : null
            const pChats = response.filter((u)=> u._id !== user?._id)
            setAllPotiental(pChats)
            


          }
          getAllUser()
    },[user])
    const [searchTextForAddF,setSearchTextForAddF] = useState({
            email:""
    })
    const handTextForAddF = useCallback((info) => {
           setSearchTextForAddF(info)
    })

    const handleResult = useCallback((e)=> {
           e.preventDefault();
           const result = allPotiental.filter((item)=> item.email === searchTextForAddF.email)
           if(!searchTextForAddF.email){
               return setErrorValid("Something went wrong with email")
           }
           if(result.length === 0 ){
            return setErrorValid("không tìm thấy người bạn cần tìm")
           }

           setUserIsValidOfEmail(result)

    })

    //add friend + search form end
    //handle list Friend start
      
      const handleCreateChat = useCallback(async(item)=> {
            setErrorAddListF(null)
            setIsLoadingAdd(false)
            const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : "null"  
            const newCreateChat = {
                  senderId: userId,
                  ReceiveId: item._id,
                  status:"Đã gửi lời mời kết bạn"
            }         
            const response = await postRequest(`${baseUrl}/chats/create-chat`,JSON.stringify(newCreateChat))
            if(response.error){
                return setErrorAddListF(response)
            }
            setNewChat(response)
            setSearchTextForAddF({
               email:""
            })
            setUserIsValidOfEmail(null)
              

          


      },[])
     
      useEffect(()=> {
        const getChats = async() =>{
          if(user?._id){
            const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : "null" 
       
            const listFriendRes = await getRequest(`${baseUrl}/chats/${user?._id}`)
            if(listFriendRes.error){
               return  setErrorAddListF(listFriendRes)
            }
            const dataFilter = listFriendRes.filter((item)=> item.members[0] === userId || item.status === "Chấp nhận")
            const dataWait = listFriendRes.filter((item)=>item.members[1] === userId && item.status === "Đã gửi lời mời kết bạn")
            setAllListFriendFilter(dataFilter)
            setAllListFriend(listFriendRes)
            setDataWait(dataWait)
          }
        }
        getChats()
   
      },[user,newChat,allListFriendFilter])
  

    //handle list Friend end

    const updateCurrentChat = useCallback((chat)=> {
           setCurrentChat(chat)
    })
    const [textMessage,setTextMessage] = useState({
            text:""
    })
    const updateTextMessage = useCallback((info)=> {
        setTextMessage(info)
    })


    useEffect(()=> {
         const getMessage = async()=> {
               setIsMessageLoading(true)
               setMessageError(null)
               const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`)
               setIsMessageLoading(false)
               if(response.error){
                    return setMessageError(response)
               }
               setMessages(response)
         }
        getMessage()
  },[currentChat])
  const updateMessageFromLocalStorage = useCallback((response)=> {
       setMessages(response)
  },[])

  const sendTextMessage = useCallback(async(e)=>{
       e.preventDefault();
      if(textMessage?.text === "") return console.log("You must type something....")
      const response = await postRequest(`${baseUrl}/messages/`,JSON.stringify({
            senderId:user?._id,
            chatId:currentChat?._id,
            text:textMessage.text
      }))
      if(response.error){
        return setSendTextMessageError(response)

      }
      setNewMessage(response)
      setMessages((prev)=>[...prev,response])
      setTextMessage({
        text:""
      }
    )

      

  },[textMessage,currentChat,user])
  const [repError,setRepError] = useState(null)
  const updateRep = useCallback(async(item,data)=> {
       setRepError(null)
       const info = {
          senderId: item.members[0],
          RecieveId: item.members[1],

       }
       const response = await postRequest(`${baseUrl}/chats/rep`,JSON.stringify(info))
       if(response.error){
            return setRepError(response) 
       }
       const responseRep = {
             ...response,
             status:"Chấp nhận"
       }
       setDataWait(null)
       setAllListFriendFilter((prev)=> [...prev,responseRep])

       
  },[])

  const markAllNotificationAsRead = useCallback((notifications)=> {
       const mNotifications = notifications.map((n)=> {
              return {
                   ...n,
                   isRead:true
              }
       })
       setNotifications(mNotifications)
  })
  const markThisUserNotificationAsRead = useCallback((thisUserNotifications,notifications)=>{
        if(thisUserNotifications){


          const mNotifications = notifications?.map((el)=> {
                 let notification
                 const recipientId = thisUserNotifications?.members.find(id => id !== user?._id)
                 if(recipientId){
                     if(recipientId === el.senderId){
                             notification = {...el,isRead:true}
                     }else {
                           notification = el 
                     }

                     
                 }
                 return notification
          })
          setNotifications(mNotifications)

        }

 
},[thisUserNotifications,user])
const markNotificationAsRead = useCallback((n,allListFriendFilter,user,notifications)=> {
     //find chat to open
     const desiredChat = allListFriendFilter.find(chat => {
          const chatMembers = [user?._id,n.senderId]
          const isDesiredChat = chat?.members.every((member)=> {
            return chatMembers.includes(member)
          })
          return  isDesiredChat
     })

     //mark notification as read
     
     const mNotifications = notifications.map((el)=>{
             if(n.senderId === el.senderId){
                    return {...n,isRead:true}
             }else {
                  return el
             }
     })
  
     updateCurrentChat(desiredChat)
     setNotifications(mNotifications)
     setResponseChat(false)

   
     
},[])


//get all messages

useEffect(()=> {
     const getAllMessages = async()=> {
            setAllMessagesError(null)
           const response = await getRequest(`${baseUrl}/messages/all/messages`)
           if(response.error){
                 return setAllMessagesError(response)
           }
           setAllMessages(response)

     }
     getAllMessages()
},[newMessage,notifications])



    return (
        <ChatContext.Provider value={
            {
                allPotiental,
                errorGetPotiental,
                searchTextForAddF,
                handTextForAddF,
                userIsValidOfEmail,
                errorValid,
                handleResult,
                handleCreateChat,
                allListFriend,
                allListFriendFilter,

                updateCurrentChat,
                currentChat,
                textMessage,
                setTextMessage,
                updateTextMessage,
                sendTextMessage,
                messages,
                updateMessageFromLocalStorage,


                dataWait,
                updateRep,
                notifications,
                markAllNotificationAsRead,
                markThisUserNotificationAsRead,
                markNotificationAsRead,



                allMessages,
                allMessagesError,
                onlineUsers







               

            }
        }>
              {children}
        </ChatContext.Provider>
    )
}