import { React, useState, createContext, useEffect } from "react";
import { SetToken } from "../services/TokenService";
import { loginUser } from "../services/UserService";


const UserContext = createContext({ user:{}, isLoggedIn: false, onLogout: () => { }, onLogin: (username, password) => { } });

export const UserContextProvider = (props) => {

  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token !== undefined && token !== null && token.trim().length > 0) {
      setIsLoggedIn(true);
      
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser({ username: '' });
  };

  const loginHandler = (username, password) => {
    let credentials = { 'username': username, 'password': password };
    const userLogin = async (credentials) => {
      try {
        let loginResponse = await loginUser(credentials);
        SetToken(loginResponse);
        setIsLoggedIn(true);
        setUser({ username: username });
        //console.log(`user in usercontext ${JSON.stringify(user)}`);
      } catch (error) {
        throw error;
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