import React from "react";

const RegisterComponent = () => {
    return (
              <>
              <form>
                <h1>Register</h1>
                <div>
                    <label id="userNameLbl">User Name</label>
                </div>
                <div>
                    <input type="text" required minlength="4" id="userName"></input>
                </div>
                <div>
                    <label id="passwordLbl">Password</label>
                </div>
                <div>
                    <input type="password" required minlength="4" id="password"></input>
                </div>
                <div>
                    <button type="submit" id="signUpBtn">Sign Up</button>
                </div>
            </form></>
              
              
        );
      };
      
      export default RegisterComponent;