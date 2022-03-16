
import { React, useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/usercontext";
import { SetToken } from "../services/TokenService";
import { loginUser } from "../services/UserService";
import '../styles/loginpage.css';

const isEmpty = function (inputValue) {
  return inputValue === null || inputValue === undefined || inputValue.trim().length === 0;
}


const LoginSignUp = (props) => {
  
  const userContext = useContext(UserContext);
  const [areInputFieldsEmpty, setAreInputFieldsEmpty] = useState(true);
  //const {state, setCurrentState } = useContext(UserContext);
  const[isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();
  
  //console.log(state);
  //console.log(JSON.stringify(setCurrentState));

  let username = useRef(null);
  let password = useRef(null);
  
  let areFieldsEmpty = function(){ 
    setAreInputFieldsEmpty(isEmpty(username?.current?.value) || isEmpty(password?.current?.value));
    return;
  }

  const onSubmitLogin = (event) => {
    //Browser re-renders the component by default post form-submission. This is to stop re-rendering.
    event.preventDefault();
    if (!areInputFieldsEmpty) {
      setIsFormSubmitted(true);
    }
    
  }

  const goToRegisterPage = () =>{
    navigate('/register');
  }

  useEffect(()=>{
    if(isFormSubmitted){
        //let credentials = {'username': username?.current?.value, 'password': password?.current?.value };
        console.log(userContext);
        userContext.onLogin(username?.current?.value, password?.current?.value);
      //   const userLogin = async (credentials) => {
      //       try {
      //           let loginResponse = await loginUser(credentials);
      //           SetToken(loginResponse);
      //         } catch (error) {
      //           console.log(error);
      //       }
      //   }
      //   userLogin(credentials);
       }
},[isFormSubmitted, userContext])


  return (
    
    <div className="container">
      <h2>Login to Tweet App</h2>
      <form onSubmit={event => {onSubmitLogin(event)}}>
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