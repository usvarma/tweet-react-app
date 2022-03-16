import { React, useState, createContext, useEffect } from "react";

const currentState = {user: {username: ''}, isLoggedIn: false};
export const UserContext = createContext({state:currentState, onLogout:()=>{}, onLogin:()=>{}});

export const UserContextProvider = (props) =>{
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
  
      if (storedUserLoggedInInformation === '1') {
        setIsLoggedIn(true);
      }
    }, []);
  
    const logoutHandler = () => {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      setUser({username: ''});
    };
  
    const loginHandler = () => {
      localStorage.setItem('isLoggedIn', '1');
      setIsLoggedIn(true);
      setUser({username: ''});
    };
  

    //UserContext = {state: currentState, setCurrentState: setUserState};

    return (
        // the Provider gives access to the context to its children
        <UserContext.Provider value={{
          isLoggedIn: isLoggedIn,
          onLogout: logoutHandler,
          onLogin: loginHandler,
        }}>
          {props.children}
        </UserContext.Provider>
      );
    
}