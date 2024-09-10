import React,{useState} from "react";
import {Link, useNavigate } from "react-router-dom";
import {handleError,handleSuccess} from'../utils.js'
import { ToastContainer } from 'react-toastify';
function Login(){
    const [loginInfo,setLoginInfo]=useState({
        email:"",
        password:""
    })
    const navigate=useNavigate();
    const handleChange=e=>{
        const {name,value}=e.target;
        const copyLoginInfo={...loginInfo};
        copyLoginInfo[name]=value;
        setLoginInfo(copyLoginInfo);
    }
    const handleLogin=async(e)=>{
       e.preventDefault();
       const {email,password}=loginInfo;
       if(!email||!password){
        return handleError('email and password are required')
       }
       try{
        const url="https://deploy-mern-app-1-api-blush.vercel.app/auth/signup";
        const response=await fetch(url,{
            method:"POST",
            headers:{
                'content-Type':'application/json'
            },
            body:JSON.stringify(loginInfo),
        });
        const result=await response.json();
        const { success, message, jwtToken, name, error } = result;
        if (success) {
            handleSuccess(message);
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('loggedInUser', name);
            setTimeout(() => {
                navigate('/home')
            }, 1000)
        } else if (error) {
            const details = error?.details[0].message;
            handleError(details);
        } else if (!success) {
            handleError(message);
        }
       }catch(err){
            handleError(err);
       }

    }
    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                <label for="email">Email</label>
                <input 
                    onChange={handleChange}
                    type="email" 
                    name="email"
                    id="email"
                    placeholder="enter your email..."
                    value={loginInfo.email}
                    required
                    ></input>
                    </div>
                <div>
                <label for="password">Password</label>
                <input 
                    onChange={handleChange}
                    type="password"
                    name="pasword"
                    id="pasword"
                    placeholder="enter your password..."
                    value={loginInfo.password}
                    required
                ></input>
                </div>
                <button type="submit">
                    Login
                </button>
                <span>
                    Don't have a Account?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}
export default Login 
