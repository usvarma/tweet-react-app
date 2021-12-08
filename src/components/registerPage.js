import React from "react";
import '../styles/register.css';

const RegisterComponent = () => {
    return (
        <div class="container">
            <form>
                <div class="form-group">
                    <label for="emailAddress">Email address</label>
                    <input type="email" class="form-control" id="registerEmail" aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div class="form-group">
                    <label for="Password" >Password</label>
                    <input type="password" class="form-control" id="registerPassword" placeholder="Password"></input>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" class="form-control" id="registerConfirmPassword" placeholder="Confirm password"></input>
                </div>
                <button type="submit" class="btn btn-primary">Sign Up</button>
            </form>
      </div>       
              
        );
      };
      
      export default RegisterComponent;