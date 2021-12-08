import React from "react";

const RegisterComponent = () => {
    return (
        <div className="container">
            <form>
                <div className="form-group">
                    <label htmlFor="emailAddress" className="mt-4">Email address</label>
                    <input type="email" className="form-control mt-2" id="registerEmail" aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="Password" className="mt-4">Password</label>
                    <input type="password" className="form-control mt-2" id="registerPassword" placeholder="Password"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword" className="mt-4">Confirm Password</label>
                    <input type="password" className="form-control mt-2" id="registerConfirmPassword" placeholder="Confirm password"></input>
                </div>
                <button type="submit" className="btn btn-primary mt-4">Sign Up</button>
            </form>
      </div>       
              
        );
      };
      
      export default RegisterComponent;