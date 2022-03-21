import React from "react";
import { useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/UserService";
import UserContext from "../context/usercontext";

const RegisterComponent = () => {

    const[emailAddress, setEmailAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phonenumber, setPhonenumber] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
    const [isPhonenumberValid, setIsPhonenumberValid] = useState(false);

    const [isEmailAddressTouched, setIsEmailAddressTouched] = useState(false);
    const [isUsernameTouched, setIsUsernameTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false);
    const [isPhonenumberTouched, setIsPhonenumberTouched] = useState(false);

    const [isEmailInputValid, setIsEmailInputValid] = useState(false);
    const [isUsernameInputValid, setIsUsernameInputValid] = useState(false);
    const [isPasswordInputValid, setIsPasswordInputValid] = useState(false);
    const [isConfirmPasswordInputValid, setIsConfirmPasswordInputValid] = useState(false);
    const [isPhonenumberInputValid, setIsPhonenumberInputValid] = useState(false);

    const [user, setUser] = useState(null);
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
    const[isFormSubmitted, setIsFormSubmitted] = useState(false);
    const[isFormValid, setIsFormValid] = useState(false);    
    const navigate = useNavigate();

    const ctx = useContext(UserContext);

    const validateEmail = function (event) {
        let email = event.target.value.trim();
        setEmailAddress(email);
        setIsEmailAddressTouched(false);
        if(email && email.includes('@') && email.includes('.') && email.length >= 6 && email.length <= 254){
            setIsEmailValid(true);
        }else{
            setIsEmailValid(false);
        }
        //console.log(`In validateEmail, isEmailValid: ${isEmailValid}`)
    }

    const emailBlurHandler = function (event) {
        setIsEmailAddressTouched(true);
        //console.log(`In emailBlurHandler, isEmailAddressTouched is: ${isEmailAddressTouched}`);
    }

    const validateUsername = function (event) {
        let username = event.target.value.trim();
        setUsername(username);
        setIsUsernameTouched(false);
        if(username && username.length >= 6){
            setIsUsernameValid(true);
        }else{
            setIsUsernameValid(false);
        }
        //console.log(`In validateUsername, isUsernameValid: ${isUsernameValid}`)
    }

    const usernameBlurHandler = function (event) {
        setIsUsernameTouched(true);
    }

    const validatePassword = function (event) {
        let passwd = event.target.value.trim();
        setPassword(passwd);
        setIsPasswordTouched(false);
        if (passwd && passwd.length >= 6) {
            setIsPasswordValid(true);
        } else {
            setIsPasswordValid(false);
        }
        //console.log(`In validatePassword, isPasswordValid: ${isPasswordValid}`)
    }

    const passwordBlurHandler = function (event) {
        setIsPasswordTouched(true);
     }

    const validateConfirmPassword = function (event) {
        let passwd = event.target.value.trim();
        setConfirmPassword(passwd);
        setIsConfirmPasswordTouched(false);
        if(passwd && passwd.length >= 6){
            setIsConfirmPasswordValid(true);
        }else{
            setIsConfirmPasswordValid(false);
        }
        //console.log(`In validateConfirmPassword, isConfirmPasswordValid: ${isConfirmPasswordValid}`)
    }

    const confirmPasswordBlurHandler = function (event) {
        setIsConfirmPasswordTouched(true);
    }

    const validatePhonenumber = function (event) {
        let phone = event.target.value.trim();
        setPhonenumber(phone);
        setIsPhonenumberTouched(false);
        if(phone && phone.length === 10){
            setIsPhonenumberValid(true);
        }else{
            setIsPhonenumberValid(false);
        }
        //console.log(`In validatePhonenumber, isPhonenumberValid: ${isPhonenumberValid}`)
    }

    const phonenumberBlurHandler = function (event) {
        setIsPhonenumberTouched(true);
    }
 
           
    useEffect(()=>{
        if(isFormSubmitted){
            let userData = { 'name': username, 'emailAddress': emailAddress, 'username': username, 'Password': password };
            
            const userRegister = async (userData) => {
                try {
                    let registerResponse = await registerUser(userData);
                    setUser(registerResponse);
                    ctx.onLogin(username, password);
                    navigate('/username/tweets');

                } catch (error) {
                    console.log(error);
                }
            }
            userRegister(userData);
        }
        
    },[emailAddress, isFormSubmitted, password, username, navigate, ctx])

    useEffect(() => {
        //console.log(`In useEffect for updating form state`);
        setDoPasswordsMatch(password === confirmPassword);
        setIsEmailInputValid(isEmailValid && isEmailAddressTouched);
        setIsUsernameInputValid(isUsernameValid && isUsernameTouched);
        setIsPasswordInputValid(isPasswordValid && isPasswordTouched);
        setIsConfirmPasswordInputValid(isConfirmPasswordValid && isConfirmPasswordTouched);
        setIsPhonenumberInputValid(isPhonenumberValid && isPhonenumberTouched);
    
        setIsFormValid(isEmailInputValid && isUsernameInputValid && isPasswordInputValid && isConfirmPasswordInputValid && isPhonenumberInputValid && doPasswordsMatch);
        //setIsFormValid(isEmailValid && isUsernameValid && isPasswordValid && isConfirmPasswordValid && isPhonenumberValid && doPasswordsMatch);
    }, [isEmailInputValid, isUsernameInputValid, isPasswordInputValid, isConfirmPasswordInputValid, isPhonenumberInputValid, doPasswordsMatch, password, confirmPassword, isEmailValid, isEmailAddressTouched, isUsernameValid, isUsernameTouched, isPasswordValid, isPasswordTouched, isConfirmPasswordValid, isConfirmPasswordTouched, isPhonenumberValid, isPhonenumberTouched])
    
    function onSubmitRegister(event){
        //Browser re-renders the component by default post form-submission. This is to stop re-rendering.
        event.preventDefault();
        if (!doPasswordsMatch) {

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
                    <input required type="email" className="form-control mt-2" id="registerEmail" onChange={validateEmail} onBlur={emailBlurHandler} aria-describedby="Enter email" placeholder="Enter email"></input>
                {!isEmailValid && isEmailAddressTouched && <p className="error-text">Email should be atleast 6 characters</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="registerUsername" className="mt-4">Username</label>
                    <input required type="text" className="form-control mt-2" id="registerUsername" onChange={validateUsername} onBlur={usernameBlurHandler} aria-describedby="Enter username" placeholder="Enter username"></input>
                    {!isUsernameValid && isUsernameTouched && <p className="error-text">Username should be atleast 6 characters</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="registerPassword" className="mt-4">Password</label>
                    <input required type="password" className="form-control mt-2" id="registerPassword" onChange={validatePassword} onBlur={passwordBlurHandler} aria-describedby="Enter password" placeholder="Enter password"></input>
                    {!isPasswordValid && isPasswordTouched && <p className="error-text">Password should be atleast 6 characters</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="registerConfirmPassword" className="mt-4">Confirm Password</label>
                    <input required type="password" className="form-control mt-2" id="registerConfirmPassword" onChange={validateConfirmPassword} onBlur={confirmPasswordBlurHandler} aria-describedby="Confirm password" placeholder="Confirm password"></input>
                    {!isConfirmPasswordValid && isConfirmPasswordTouched && <p className="error-text">Confirmation password should be atleast 6 characters</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="registerPhone" className="mt-4">Phone Number</label>
                    <input required type="tel" className="form-control mt-2" id="registerPhone" onChange={validatePhonenumber} onBlur={phonenumberBlurHandler} aria-describedby="Enter phone number" placeholder="Enter phone number"></input>
                    {!isPhonenumberValid && isPhonenumberTouched && <p className="error-text">Phone number should be numeric and 10 digit long</p>}
                </div>
                <button type="submit" className={`btn btn-primary mt-4 ${isFormValid ? "" : "disabled"}`}>Sign Up</button>
            </form>
        </div>

    );
};

export default RegisterComponent;