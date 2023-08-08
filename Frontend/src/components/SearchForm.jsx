import {BiSearchAlt} from "react-icons/bi"
 import {AiOutlineUserAdd} from "react-icons/ai"
 import {FaTimes} from "react-icons/fa"
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
const SearchForm = () => {
     const {handTextForAddF,searchTextForAddF,handleResult,searchFriend,changeSearch,textFriend,searchFriendText,handleFriend } = useContext(ChatContext)
    return ( 
    <div className="chat-search">
           <form style={{
               display: searchFriend ? "none" : "flex"
           }}>
                <input type="email" placeholder="Bạn cần tìm ai" onChange={(e)=> handTextForAddF({
                      ...searchTextForAddF,
                      email:e.target.value

                })} value={handTextForAddF.text}></input>
                <button onClick={(e)=>handleResult(e)}><BiSearchAlt/></button>
                <button onClick={(e)=> changeSearch(e)}><AiOutlineUserAdd /></button>
           </form>  
           <form style={{display: searchFriend ? "flex" : "none"}}>
                <input type="text" placeholder="tìm người quen..." onChange={(e)=> searchFriendText({
                      ...textFriend,
                      text: e.target.value
                })}></input>
                <button onClick={(e)=> handleFriend(e)}><BiSearchAlt/></button>
                <button onClick={(e)=> changeSearch(e)}>{textFriend?.text === "" ? <AiOutlineUserAdd/> : <FaTimes/>}</button>
           </form>    
    </div> );
}
 
export default SearchForm;