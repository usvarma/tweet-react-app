
import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/usercontext";
import '../styles/loginpage.css';


const LoginSignUp = (props) => {

  const ctx = useContext(UserContext);
    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const[isFormValid, setIsFormValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isUsernameTouched, setIsUsernameTouched] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isUsernameInputValid, setIsUsernameInputValid] = useState(false);
  const [isPasswordInputValid, setIsPasswordInputValid] = useState(false);

  const navigate = useNavigate();


  const validateUsername = function (event) {
    let username = event.target.value.trim();
    setUsername(username);
    setIsUsernameTouched(false);
    if(username && username.length >= 6){
        setIsUsernameValid(true);
    }else{
        setIsUsernameValid(false);
    }
    //console.log(`In validateUsername, isUsernameValid: ${isUsernameValid}`)
}

const validatePassword = function (event) {
  let passwd = event.target.value.trim();
  setPassword(passwd);
  setIsPasswordTouched(false);
  if (passwd && passwd.length >= 6) {
      setIsPasswordValid(true);
  } else {
      setIsPasswordValid(false);
  }
  //console.log(`In validatePassword, isPasswordValid: ${isPasswordValid}`)
}

const usernameBlurHandler = function (event) {
  setIsUsernameTouched(true);
}

const passwordBlurHandler = function (event) {
  setIsPasswordTouched(true);
}

  

  const onSubmitLogin = (event) => {
    //Browser re-renders the component by default post form-submission. This is to stop re-rendering.
    event.preventDefault();
    if (isFormValid) {
      setIsFormSubmitted(true);
    }

  }

  const goToRegisterPage = () => {
    navigate('/register');
  }

  useEffect(() => {
    if (isFormSubmitted) {
      ctx.onLogin(username, password);
    }
    
  }, [isFormSubmitted, ctx, username, password])

  useEffect(() => {
    if (ctx.isRequestProcessed && !ctx.hasError) {
      navigate('/username/tweets');
    } else {
      navigate('/');
    }
  }, [ctx, navigate])

  useEffect(() => {
    //console.log(`In useEffect for updating form state`);
    setIsUsernameInputValid(isUsernameValid && isUsernameTouched);
    setIsPasswordInputValid(isPasswordValid && isPasswordTouched);
    
    setIsFormValid(isUsernameInputValid && isPasswordInputValid);
}, [isUsernameValid, isUsernameTouched, isPasswordValid, isPasswordTouched, isPasswordInputValid, isUsernameInputValid])

  return (

    <div className="container">
      <h2>Login to Tweet App</h2>
      <form onSubmit={event => { onSubmitLogin(event) }}>
        <div className="form-group">
          {ctx.hasError && <p className="error-text">{ctx.errorMsg}</p>}
          <label htmlFor="loginEmail" className="mt-4">Username</label>
          <input required type="text" className="form-control mt-2" id="loginUsername" onChange={validateUsername} onBlur={usernameBlurHandler} aria-describedby="emailHelp" placeholder="Enter username"></input>
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword" className="mt-4">Password</label>
          <input required type="password" className="form-control mt-2" id="loginPassword" onChange={validatePassword} onBlur={passwordBlurHandler} placeholder="Enter password"></input>
        </div>
        <button type="submit" className={`btn btn-primary mt-4 ${isFormValid ? "": "disabled"}`} id="loginBtn">Login</button>
      </form>
      <div className="container mt-4">
        <button type="submit" className="btn btn-primary" id="signUpBtn" onClick={goToRegisterPage}>Sign Up</button>
      </div>
    </div>

  );


};

export default LoginSignUp;