
import { React, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/loginpage.css';

const isEmpty = function (inputValue) {
  return inputValue === "" || inputValue === null || inputValue.length === 0;
}

const LoginSignUp = () => {

  const navigate = useNavigate();
  let userLoggedIn = false;
  let isAuthenticated = function (userName, password) {
    if (userName === 'test@test.com' && password === 'Password1')
      userLoggedIn = true;
  }

  let emailAddress = useRef(null);
  let password = useRef(null);

  const onSubmitLogin = () => {
    let emailValue = emailAddress?.current?.value;
    let passwordValue = password?.current?.value;
    const areFieldsEmpty = isEmpty(emailValue) || isEmpty(passwordValue);

    if (!areFieldsEmpty) {
      isAuthenticated(emailValue, passwordValue);
    }


    if (userLoggedIn)
      navigate('/user/tweets');
    else
      navigate('/');
  }

  const goToRegisterPage = () =>{
    navigate('/register');
  }

  return (

    <div className="container">
      <h2>Login to Tweet App</h2>
      <form onSubmit={onSubmitLogin}>
        <div className="form-group">
          <label htmlFor="loginEmail" className="mt-4">Email address</label>
          <input required type="email" className="form-control mt-2" ref={emailAddress} id="loginEmail" aria-describedby="emailHelp" placeholder="Enter email"></input>
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword" className="mt-4">Password</label>
          <input required type="password" className="form-control mt-2" ref={password} id="loginPassword" placeholder="Password"></input>
        </div>
        <button type="submit" className="btn btn-primary mt-4">Login</button>
      </form>
      <div className="container mt-4">
        <button type="submit" className="btn btn-primary" id="SignUpBtn" onClick={goToRegisterPage}>Sign Up</button>
      </div>
    </div>

  );


};

export default LoginSignUp;