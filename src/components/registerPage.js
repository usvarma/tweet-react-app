import React from "react";
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";

const isEmpty = function(inputValue){
    return inputValue === "" || inputValue === null || inputValue.length === 0;
}

const RegisterComponent = () => {
    
    let emailAddress = useRef(null);
    let password = useRef(null);
    let confirmPassword = useRef(null);

    const navigate = useNavigate();
    const onSubmitRegister = () => {
                
        let emailValue = emailAddress?.current?.value;
        let passwordValue = password?.current?.value;
        let confirmPasswordValue = confirmPassword?.current?.value;
        
        const areFieldsEmpty = isEmpty(emailValue) || isEmpty(passwordValue) || isEmpty(confirmPasswordValue);
        const doPasswordsMatch = ( passwordValue === confirmPasswordValue );
        
        if( areFieldsEmpty || !doPasswordsMatch ){
            navigate('/login');
        }
        else{
            navigate('/user/tweets');
        }
            
        
    }
    
    return (
        <div className="container">
            <form onSubmit={onSubmitRegister}>
                <div className="form-group">
                    <label htmlFor="emailAddress" className="mt-4">Email address</label>
                    <input required  type="email" className="form-control mt-2" ref={emailAddress} id="registerEmail" aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="Password" className="mt-4">Password</label>
                    <input required type="password" className="form-control mt-2" ref={password} id="registerPassword" placeholder="Password"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword" className="mt-4">Confirm Password</label>
                    <input required type="password" className="form-control mt-2" ref={confirmPassword} id="registerConfirmPassword" placeholder="Confirm password"></input>
                </div>
                <button type="submit" className="btn btn-primary mt-4">Sign Up</button>
            </form>
      </div>       
              
        );
      };
      
      export default RegisterComponent;