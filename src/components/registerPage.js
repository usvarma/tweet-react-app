import React from "react";
import { useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/UserService";

const isEmpty = function (inputValue) {
    return inputValue === null || inputValue === undefined || inputValue.length > 0;
}


const RegisterComponent = () => {

    let emailAddress = useRef(null);
    let username = useRef(null);
    let password = useRef(null);
    let confirmPassword = useRef(null);
    let phonenumber = useRef(null);

    const [isEmailAddressTouched, setIsEmailAddressTouched] = useState(false);
    const [isUsernameTouched, setIsUsernameTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false);
    const [isPhonenumberTouched, setIsPhonenumberTouched] = useState(false);

    let isEmailValid, isUsernameValid, isPasswordValid, isConfirmPasswordValid, isPhonenumberValid;
    isEmailValid = isUsernameValid = isPasswordValid = isConfirmPasswordValid = isPhonenumberValid = false;

    const [user, setUser] = useState(null);
    const [areInputFieldsEmpty, setAreInputFieldsEmpty] = useState(true);
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
    const[isFormSubmitted, setIsFormSubmitted] = useState(false);    
    const navigate = useNavigate();

    const areFieldsEmpty = function () {
        setAreInputFieldsEmpty(isEmpty(emailAddress) || isEmpty(username) || isEmpty(password) || isEmpty(confirmPassword) || isEmpty(phonenumber));
        return;
    }

    const doPasswordFieldsMatch = function () {
        setDoPasswordsMatch(isPasswordValid && isConfirmPasswordValid && password?.current?.value === confirmPassword?.current?.value);
        return;
    }

    const areInputsValidAndTouched = function(){
        let isEmailInputValid = isEmailValid && isEmailAddressTouched;
        let isUsernameInputValid = isUsernameValid && isUsernameTouched;
        let isPasswordInputValid = isPasswordValid && isPasswordTouched;
        let isConfirmPasswordInputValid = isConfirmPasswordValid && isConfirmPasswordTouched;
        let isPhonenumberInputValid = isPhonenumberValid && isPhonenumberTouched;

        return  isEmailInputValid && isUsernameInputValid && isPasswordInputValid && isConfirmPasswordInputValid && isPhonenumberInputValid;
    }
    const isFormValid = function(){
        !areFieldsEmpty() && doPasswordFieldsMatch() && areInputsValidAndTouched();
    }
    const validateEmail = function () {
        let email = emailAddress?.current?.value.trim();
        if(email && email.includes('@') && email.length >= 6 && email.length <= 254){
            isEmailValid = true;
        }
    }

    const emailBlurHandler = function () {
        setIsEmailAddressTouched(true);
    }

    const validateUsername = function () {
        let name = username?.current?.value.trim();
        if(name && name.length >= 6){
            isPasswordValid = true;
        }
    }

    const usernameBlurHandler = function () {
        setIsUsernameTouched(true);
    }

    const validatePassword = function () {
        let passwd = password?.current?.value.trim();
        if(passwd && passwd.length >= 6){
            isPasswordValid = true;
        }
    }

    const passwordBlurHandler = function () {
        setIsPasswordTouched(true);
    }

    const validateConfirmPassword = function () {
        let passwd = confirmPassword?.current?.value.trim();
        if(passwd && passwd.length >= 6){
            isPasswordValid = true;
        }
    }

    const confirmPasswordBlurHandler = function () {
        setIsConfirmPasswordTouched(true);
    }

    const validatePhonenumber = function () {
        let phone = phonenumber?.current?.value.trim();
        if(phone && phone.length === 10){
            isPhonenumberValid = true;
        }
    }

    const phonenumberBlurHandler = function () {
        setIsPhonenumberTouched(true);
    }

           
    useEffect(()=>{
        if(isFormSubmitted){
            let userData = { 'name': username?.current?.value, 'emailAddress': emailAddress?.current?.value, 'username': username?.current?.value, 'Password': password?.current?.value };
            
            const userRegister = async (userData) => {
                try {
                    let registerResponse = await registerUser(userData);
                    setUser(registerResponse);
                } catch (error) {
                    console.log(error);
                }
            }
            userRegister(userData);
        }
    },[isFormSubmitted])
    
    function onSubmitRegister(event){
        //Browser re-renders the component by default post form-submission. This is to stop re-rendering.
        event.preventDefault();
        if (areInputFieldsEmpty || !doPasswordsMatch) {

            navigate('/register');
        }
        else {
            setIsFormSubmitted(true);
        }
    }


    return (
        <div className="container">
            <form onSubmit={onSubmitRegister}>
                <div className="form-group">
                    <label htmlFor="registerEmail" className="mt-4">Email address</label>
                    <input required type="email" className="form-control mt-2" id="registerEmail" ref={emailAddress} onChange={validateEmail} aria-describedby="Enter email" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="registerUsername" className="mt-4">Username</label>
                    <input required type="text" className="form-control mt-2" id="registerUsername" ref={username} onChange={validateUsername} aria-describedby="Enter username" placeholder="Enter username"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="registerPassword" className="mt-4">Password</label>
                    <input required type="password" className="form-control mt-2" id="registerPassword" ref={password} onChange={validatePassword} aria-describedby="Enter password" placeholder="Enter password"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="registerConfirmPassword" className="mt-4">Confirm Password</label>
                    <input required type="password" className="form-control mt-2" id="registerConfirmPassword" ref={confirmPassword} onChange={validateConfirmPassword} aria-describedby="Confirm password" placeholder="Confirm password"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="registerPhone" className="mt-4">Phone Number</label>
                    <input required type="text" className="form-control mt-2" id="registerPhone" ref={phonenumber} onChange={validatePhonenumber} aria-describedby="Enter phone number" placeholder="Enter phone number"></input>
                </div>
                <button type="submit" className={`btn btn-primary mt-4 ${isFormValid ? "disabled" : ""}`}>Sign Up</button>
            </form>
        </div>

    );
};

export default RegisterComponent;