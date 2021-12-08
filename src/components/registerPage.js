import React from "react";
import { useNavigate } from "react-router-dom";


const RegisterComponent = () => {
    
    const navigate = useNavigate();
    const onSubmitRegister = () => {
    
        navigate('/user/tweets');
        
    }
    
    return (
        <div className="container">
            <form onSubmit={onSubmitRegister}>
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