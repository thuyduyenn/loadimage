import { useContext,useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {useNavigate} from "react-router-dom"

const Login = () => {
     const navigate = useNavigate()
     const {login,updateLoginInfo,loginUser,user,loginLoading,loginError} = useContext(AuthContext)
     useEffect(()=> {
          if(user?._id){
               navigate("/")
          }
     },[user,navigate])
    
    return ( 
        <div className="form">
        <form onSubmit={loginUser}>
              <h1>Login</h1>

              <input type="email" name="email" placeholder="enter your email...." onChange={(e)=> {
                   updateLoginInfo({
                        ...login,
                        email:e.target.value
                   })
              }}/>
              <input type="password" name="password" placeholder="enter your password...." 
                onChange={(e)=> {
                   updateLoginInfo({
                        ...login,
                        password:e.target.value
                   })
              }}
              />
             
             <button>{loginLoading ? "Loading..." : "login"}</button>
             <div className="error">{loginError?.message}</div>
        </form>
    </div>
     );
}
 
export default Login;