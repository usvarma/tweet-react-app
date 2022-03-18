import { React, useState, createContext, useEffect } from "react";
import { GetUserInfo, SetToken } from "../services/TokenService";
import { loginUser } from "../services/UserService";


const UserContext = createContext({ user:{}, isLoggedIn: false, onLogout: () => { }, onLogin: (username, password) => { } });

export const UserContextProvider = (props) => {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  
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
    console.log(`logoutHandler called`);
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("username");
  };

  const loginHandler = (username, password) => {
    let credentials = { 'username': username, 'password': password };
    const userLogin = async (credentials) => {
      try {
        let loginResponse = await loginUser(credentials);
        SetToken(loginResponse);
        setIsLoggedIn(true);
        setUser({ username: username });
        if(username?.trim().length > 0){
          localStorage.setItem("username", JSON.stringify(username));
        }
        
        //UserContext.user = user;
        //console.log(`user in usercontext after login ${UserContext.user}`);
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