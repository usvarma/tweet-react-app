import { React, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignUp from './components/loginPage';
import TweetAppComponent from './components/tweetApp';
import RegisterComponent from './components/registerPage';
import Users from './components/users';
import UserContext from "./context/usercontext";
import './App.css';


function App() {
    const userContext = useContext(UserContext);
    
    return (
    <Router><div className="App">
      <Routes>
        <Route exact path="/" element={!userContext.isLoggedIn && <LoginSignUp/>} />
        <Route path="/login" element={!userContext.isLoggedIn && <LoginSignUp/>} />
        <Route path={`/username/tweets`} element={userContext.isLoggedIn && <TweetAppComponent/>} />
        <Route path="/register" element={!userContext.isLoggedIn && <RegisterComponent/>} />
        <Route path="/users" element={userContext.isLoggedIn && <Users/>} />
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
