import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate , useNavigate} from 'react-router-dom'
import { UseTodoContext } from '../context/TodoContext'
import axios from 'axios'



const Login = () => {
  const {isUserLogin,setIsUserLogin,fetchTodos,setUserEmail } = UseTodoContext();
  const navigate = useNavigate();

 const [emailValue,setEmailValue] = useState("")
  const [passwordValue,setPasswordValue] = useState("")


  const submitHandler = async (e) => {
      e.preventDefault();


    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`,{email:emailValue,password:passwordValue});
      if(response.data.status){
        setIsUserLogin(true);
        setUserEmail(emailValue);  
        navigate("/");
        fetchTodos();
      }
    } catch (error) {
        alert(error.response?.data?.message || "Client error");
    }
}

  return (
    <>
    { isUserLogin ? <Navigate to="/" /> : (
    <div className='bg-login-page'>
    <div className='login-page-div'>
      <h3>Login</h3>
      <form onSubmit={submitHandler}>
          <div className='email-block'>
            <h4 className='email-password-h4'>Email Address</h4>
            <input name='email' value={emailValue} onChange={(e) => {setEmailValue(e.target.value)}} type="email"className='input-design' id='email-value' required/><br/>
            <p className='email-error'>Enter a valid email</p>
          </div>
          <br />
          <br />
          <div className='password-block'>
            <h4 className='email-password-h4'>Password</h4>
            <input name='password' value={passwordValue} onChange={(e) => {setPasswordValue(e.target.value)}} type="password" className='input-design' required/><br/>
            <p className='password-error'>Incorrect password</p>
          </div><br />
          <input type="submit" className='submit-btn' value={"Login"}/><br/><br/><br/>
          <h4 className='forgot-password'>Forgot password?</h4>
          <h4  style={{color:" rgba(0, 174, 255, 1)",cursor:"pointer"}} onClick={() => navigate("/signup")} className='dont-have-account'>New to Todolist ? Create an account !</h4>
      </form>
    </div>
    </div>
)}
    </>
  )
}

export default Login
