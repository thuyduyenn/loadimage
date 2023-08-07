import {BiSearchAlt} from "react-icons/bi"
 import {AiOutlineUserAdd} from "react-icons/ai"
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
const SearchForm = () => {
     const {handTextForAddF,searchTextForAddF,handleResult} = useContext(ChatContext)
    return ( 
    <div className="chat-search">
           <form>
                <input type="email" placeholder="Bạn cần tìm ai" onChange={(e)=> handTextForAddF({
                      ...searchTextForAddF,
                      email:e.target.value

                })} value={handTextForAddF.text}></input>
                <button onClick={(e)=>handleResult(e)}><BiSearchAlt/></button>
                <button><AiOutlineUserAdd/></button>
           </form>  
           <form style={{display:"none"}}>
                <input type="text" placeholder="Bạn cần tìm ai"></input>
                <button><BiSearchAlt/></button>
                <button><AiOutlineUserAdd/></button>
           </form>    
    </div> );
}
 
export default SearchForm;