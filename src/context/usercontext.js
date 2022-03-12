import { React, useState, createContext } from "react";

const currentState = {user: null, isLoggedIn: false};
export const UserContext = createContext({state:{},setCurrentState:()=>{}});

export const UserContextProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const setUserState = (user, isLoggedIn)=>{
      setUser(user);
      setIsLoggedIn(isLoggedIn);
    }

    //UserContext = {state: currentState, setCurrentState: setUserState};

    return (
        // the Provider gives access to the context to its children
        <UserContext.Provider value={{state: currentState, setCurrentState: setUserState}}>
          {children}
        </UserContext.Provider>
      );
    
}