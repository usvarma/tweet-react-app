import { React, useState, createContext, useEffect } from "react";
import { SetToken } from "../services/TokenService";
import { loginUser, registerUser } from "../services/UserService";


const UserContext = createContext({ user:{}, isLoggedIn: false, onLogout: () => { }, onLogin: (username, password) => { }, onRegister: (emailAddress, username, password) => { }, hasError: false, errorMsg: null, isRequestProcessed: false });

export const UserContextProvider = (props) => {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isRequestProcessed, setIsRequestProcessed] = useState(false);
  const [isRegisterRequestProcessed, setIsRegisterRequestProcessed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    //Need to validate token using tokenservice; for now any token will be valid
    if (token !== undefined && token !== null && token.trim().length > 0) {
      setIsLoggedIn(true);

      // const getUserFromToken = async () => {
      //   try {
      //     let response = await GetUserInfo(token);
      //     //let userFromToken = await response.json();
      //     console.log(response);
      //   } catch (error) {
      //     console.log(error);
      //   }

      // }
      // getUserFromToken();
      // console.log();
    }

    //setUser(UserContext.user)
  }, []);

  const logoutHandler = () => {
    //console.log(`logoutHandler called`);
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("username");
    localStorage.removeItem('hasError');
    localStorage.removeItem('errorMsg');
  };

  const loginHandler = (username, password) => {
    let credentials = { 'username': username, 'password': password };
    const userLogin = async (credentials) => {
      try {
        let loginResponse = await loginUser(credentials);
        SetToken(loginResponse);
        if(username?.trim().length > 0){
          localStorage.setItem("username", JSON.stringify(username));
        }
        setIsRequestProcessed(true);
        setIsLoggedIn(true);
        setUser({ username: username });
        } catch (error) {
        setHasError(true);
        setErrorMsg(error.message);
        setIsRequestProcessed(true);
      }
    }
    userLogin(credentials);

  };

  const registerHandler = (emailAddress, username, password) => {
    let userData = { 'name': username, 'emailAddress': emailAddress, 'username': username, 'Password': password };
    const userRegister = async (userData) => {
      try {
        await registerUser(userData);
        setHasError(false);
        setErrorMsg(null);
        setIsRegisterRequestProcessed(true);
      } catch (error) {
        setHasError(true);
        setErrorMsg(error.message);
        setIsRegisterRequestProcessed(true);
      }
    }
    userRegister(userData);
  };

  return (
    // the Provider gives access to the context to its children
    <UserContext.Provider value={{user: user,
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler,
      onLogin: loginHandler,
      onRegister: registerHandler,
      hasError: hasError,
      errorMsg: errorMsg,
      isRequestProcessed: isRequestProcessed,
      isRegisterRequestProcessed: isRegisterRequestProcessed
    }}>
      {props.children}
    </UserContext.Provider>
  );

}

export default UserContext;