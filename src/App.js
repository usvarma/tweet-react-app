import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignUp from './components/loginPage';
import TweetAppComponent from './components/tweetApp';
import RegisterComponent from './components/registerPage';

import './App.css';


function App() {
  return (
    <Router><div className="App">
      
      <Routes>
        <Route exact path="/" element={<LoginSignUp/>} />
        <Route path="/login" element={<LoginSignUp/>} />
        <Route path="/user/tweets" element={<TweetAppComponent/>} />
        <Route path="/user/register" element={<RegisterComponent/>} />
      </Routes>
    
    </div>
    </Router>
  );
}

export default App;
