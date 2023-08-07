import {useEffect, useState} from "react";
import {getRequest, baseUrl} from "../../utils/services";
export const useFetchRecipientUser = (currentChat,user) => {
    const [recipientUser,setRecipientUser] = useState(null)
    const [error,setError] = useState(null)
    const recipientId = currentChat?.members.find((id) => id !== user?._id)
    useEffect(()=> {
          const getUser = async()=> {
             if(!recipientId) return null
             const response = await getRequest(`${baseUrl}/users/find/${recipientId}`)
             if(response.error){
                    return setError(response)
             }
             setRecipientUser(response)
          }
          getUser()
    },[recipientId])
    return {recipientUser}
}
