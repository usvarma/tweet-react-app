
import React from "react";
import { Link } from "react-router-dom";

const LoginSignUp = () => {
  return (
            <><h1>Log In</h1><div>
            <label id="userNameLbl">User Name</label>
            </div>
            <div>
              <input type="text" id="userName"></input>
            </div>
            
            <div>
              <label id="passwordLbl">Password</label>
            </div>
            
            <div>
              <input type="password" id="password"></input>
            </div>
            
            <Link to="/user/tweets">
              <div>
                <button type="submit" id="submitBtn">Log In</button>
              </div>
            </Link>
            <div>
              Not registered?
              <Link to="/user/register">
              <button type="submit" id="signUpBtn">Sign Up</button>
              </Link>
            </div></>
      );
    };
    
    export default LoginSignUp;