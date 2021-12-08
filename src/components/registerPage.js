import React from "react";

const RegisterComponent = () => {
    return (
        <div class="container">
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="registerEmail" aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="registerPassword" placeholder="Password"></input>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Confirm Password</label>
                    <input type="password" class="form-control" id="registerConfirmPassword" placeholder="Confirm password"></input>
                </div>
                <button type="submit" class="btn btn-primary">Sign Up</button>
            </form>
      </div>       
              
        );
      };
      
      export default RegisterComponent;