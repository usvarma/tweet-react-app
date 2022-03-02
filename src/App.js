import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignUp from './components/loginPage';
import TweetAppComponent from './components/tweetApp';
import RegisterComponent from './components/registerPage';
import Users from './components/users';
import './App.css';


function App() {
  

  return (
    <Router><div className="App">
      
      <Routes>
        <Route exact path="/" element={<LoginSignUp/>} />
        <Route path="/login" element={<LoginSignUp/>} />
        <Route path="/user/tweets" element={<TweetAppComponent/>} />
        <Route path="/register" element={<RegisterComponent/>} />
        <Route path="/users" element={<Users/>} />
      </Routes>
    
    </div>
    </Router>
  );
}

export default App;
