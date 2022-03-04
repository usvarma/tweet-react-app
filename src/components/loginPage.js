
import { React, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SetToken } from "../services/TokenService";
import { loginUser } from "../services/UserService";
import '../styles/loginpage.css';

const isEmpty = function (inputValue) {
  return inputValue === null || inputValue === undefined || inputValue.trim().length === 0;
}

const LoginSignUp = () => {
  
  const [areInputFieldsEmpty, setAreInputFieldsEmpty] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();
  

  let username = useRef(null);
  let password = useRef(null);
  
  let areFieldsEmpty = function(){ 
    setAreInputFieldsEmpty(isEmpty(emailAddress?.current?.value) || isEmpty(password?.current?.value));
    return;
  }

  const onSubmitLogin = () => {
    
    if (!areInputFieldsEmpty) {
      setIsFormSubmitted(true);
    }
    
  }

  const goToRegisterPage = () =>{
    navigate('/register');
  }

  useEffect(()=>{
    if(isFormSubmitted){
        let credentials = {'Username': username?.current?.value, 'Password': password?.current?.value };
        
        const userLogin = async (credentials) => {
            try {
                let registerResponse = await loginUser(credentials);
                SetToken(registerResponse);
                setIsLoggedIn(true);
            } catch (error) {
                console.log(error);
            }
        }
        userLogin(credentials);
    }
},[isFormSubmitted])

  return (

    <div className="container">
      <h2>Login to Tweet App</h2>
      <form onSubmit={onSubmitLogin}>
        <div className="form-group">
          <label htmlFor="loginEmail" className="mt-4">Username</label>
          <input required type="text" className="form-control mt-2" ref={username} id="loginUsername" onChange={areFieldsEmpty} aria-describedby="emailHelp" placeholder="Enter username"></input>
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword" className="mt-4">Password</label>
          <input required type="password" className="form-control mt-2" ref={password} id="loginPassword" onChange={areFieldsEmpty} placeholder="Enter password"></input>
        </div>
        <button type="submit" className={`btn btn-primary mt-4 ${areInputFieldsEmpty ? "disabled": ""}`} id="loginBtn">Login</button>
      </form>
      <div className="container mt-4">
        <button type="submit" className="btn btn-primary" id="signUpBtn" onClick={goToRegisterPage}>Sign Up</button>
      </div>
    </div>

  );


};

export default LoginSignUp;