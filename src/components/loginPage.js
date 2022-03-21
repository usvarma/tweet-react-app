
import { React, useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/usercontext";
import '../styles/loginpage.css';

const isEmpty = function (inputValue) {
  return inputValue === null || inputValue === undefined || inputValue.trim().length === 0;
}


const LoginSignUp = (props) => {

  const ctx = useContext(UserContext);
  const [areInputFieldsEmpty, setAreInputFieldsEmpty] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    
  const navigate = useNavigate();

  let username = useRef(null);
  let password = useRef(null);

  let areFieldsEmpty = function () {
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

  const goToRegisterPage = () => {
    navigate('/register');
  }

  useEffect(() => {
    if (isFormSubmitted) {
      ctx.onLogin(username?.current?.value, password?.current?.value);
    }
    
  }, [isFormSubmitted, ctx, navigate])

  useEffect(() => {
    if (ctx.isRequestProcessed && !ctx.hasError) {
      navigate('/username/tweets');
    } else {
      navigate('/');
    }
  }, [ctx, navigate])

  return (

    <div className="container">
      <h2>Login to Tweet App</h2>
      <form onSubmit={event => { onSubmitLogin(event) }}>
        <div className="form-group">
          {ctx.hasError && <p className="error-text">{ctx.errorMsg}</p>}
          <label htmlFor="loginEmail" className="mt-4">Username</label>
          <input required type="text" className="form-control mt-2" ref={username} id="loginUsername" onChange={areFieldsEmpty} aria-describedby="emailHelp" placeholder="Enter username"></input>
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword" className="mt-4">Password</label>
          <input required type="password" className="form-control mt-2" ref={password} id="loginPassword" onChange={areFieldsEmpty} placeholder="Enter password"></input>
        </div>
        <button type="submit" className={`btn btn-primary mt-4 ${areInputFieldsEmpty ? "disabled" : ""}`} id="loginBtn">Login</button>
      </form>
      <div className="container mt-4">
        <button type="submit" className="btn btn-primary" id="signUpBtn" onClick={goToRegisterPage}>Sign Up</button>
      </div>
    </div>

  );


};

export default LoginSignUp;