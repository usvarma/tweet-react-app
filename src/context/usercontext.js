import { React, useState, createContext, useEffect } from "react";
import { SetToken } from "../services/TokenService";
import { loginUser } from "../services/UserService";


//const currentState = { user: { username: '' }, isLoggedIn: false };


const UserContext = createContext({ user:{}, isLoggedIn: false, onLogout: () => { }, onLogin: (username, password) => { } });

export const UserContextProvider = (props) => {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token !== undefined && token !== null && token.trim().length > 0) {
      setIsLoggedIn(true);
      
    }
  }, []);

  useEffect(() =>{
    UserContext.user = user;
  },[user])

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser({ username: '' });
  };

  const loginHandler = (username, password) => {
    //console.log(`loginHandler called`);
    let credentials = { 'username': username, 'password': password };
    const userLogin = async (credentials) => {
      try {
        let loginResponse = await loginUser(credentials);
        SetToken(loginResponse);
        setIsLoggedIn(true);
        setUser({ username: username });
        
      } catch (error) {
        console.log(error);
      }
    }
    userLogin(credentials);

  };


  return (
    // the Provider gives access to the context to its children
    <UserContext.Provider value={{user: user,
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler,
      onLogin: loginHandler,
    }}>
      {props.children}
    </UserContext.Provider>
  );

}

export default UserContext;