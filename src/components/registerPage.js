import React from "react";
import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const isEmpty = function (inputValue) {
    return inputValue === null || inputValue === undefined || inputValue.trim().length === 0;
  }


const RegisterComponent = () => {
    
    let emailAddress = useRef(null);
    let username = useRef(null);
    let password = useRef(null);
    let confirmPassword = useRef(null);

    const [areInputFieldsEmpty, setAreInputFieldsEmpty] = useState(true);
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
    const navigate = useNavigate();

    let areFieldsEmpty = function(){ 
        setAreInputFieldsEmpty(isEmpty(emailAddress?.current?.value) || isEmpty(username?.current?.value) || isEmpty(password?.current?.value) || isEmpty(confirmPassword?.current?.value));
        return;
      }
    
    let doPasswordFieldsMatch = function() {
        setDoPasswordsMatch( !(isEmpty(password?.current?.value) || isEmpty(confirmPassword?.current?.value)) && ( password?.current?.value === confirmPassword?.current?.value ));
        return;
    }

    let validateInputs = function(){
        areFieldsEmpty();
        doPasswordFieldsMatch();
    }

    const onSubmitRegister = () => {
        
        if( areInputFieldsEmpty || !doPasswordsMatch ){
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
                    <label htmlFor="registerEmail" className="mt-4">Email address</label>
                    <input required  type="email" className="form-control mt-2" ref={emailAddress} id="registerEmail" onChange={validateInputs} aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="registerUsername" className="mt-4">Username</label>
                    <input required  type="text" className="form-control mt-2" ref={username} id="registerUsername" onChange={validateInputs} aria-describedby="emailHelp" placeholder="Enter username"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="registerPassword" className="mt-4">Password</label>
                    <input required type="password" className="form-control mt-2" ref={password} id="registerPassword" onChange={validateInputs} placeholder="Enter password"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="registerConfirmPassword" className="mt-4">Confirm Password</label>
                    <input required type="password" className="form-control mt-2" ref={confirmPassword} id="registerConfirmPassword" onChange={validateInputs} placeholder="Confirm password"></input>
                </div>
                <button type="submit" className={`btn btn-primary mt-4 ${areInputFieldsEmpty || !doPasswordsMatch ? "disabled": ""}`}>Sign Up</button>
            </form>
        </div>       
              
        );
      };
      
      export default RegisterComponent;