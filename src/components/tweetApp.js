import React from "react";
import { useState, useContext, useEffect } from 'react';
import ComposeForm from './composeform';
import Timeline from './timeline';
import HeaderNav from './headernav';
import { FaTwitter } from 'react-icons/fa';
import '../styles/tweetapp.css';
import { getAllTweetsOfUser, addTweetsForUser } from "../services/TweetService";
import UserContext from "../context/usercontext";


const TweetAppComponent = () => {

  const userContext = useContext(UserContext);
  //console.log(userContext);
  //const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({});
  const[isFormSubmitted, setIsFormSubmitted] = useState(false);
  const[isTweetAdded, setIsTweetAdded] = useState(false);
  const [isTweetDeleted, setIsTweetDeleted] = useState(false);

  let loggedInUser = JSON.parse(localStorage.getItem("username")) || "";
  // if (user == null && userContext?.user !== null) {
  //   setUser(userContext.user); console.log(user);
  // }
  
  const updateIsTweetDeleted = (updatedValue) =>{
    setIsTweetDeleted(updatedValue);
  }
  useEffect(() => {
    //console.log(userContext);

    const getTweets = async () => {
      try {
        if (loggedInUser?.trim().length > 0 || isTweetAdded || isTweetDeleted) {
          //console.log(userContext?.user?.username);
          let getTweetsResponse = await getAllTweetsOfUser(loggedInUser);
          //console.log(`getTweetsResponse in useEffect is ${getTweetsResponse}`);
          setTweets(getTweetsResponse);
          setIsTweetAdded(false);
          setIsTweetDeleted(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getTweets();

  }, [loggedInUser, isTweetAdded, isTweetDeleted])

  useEffect(()=>{
    if(loggedInUser?.trim().length > 0 && isFormSubmitted){
        //let userData = { 'name': username, 'emailAddress': emailAddress, 'username': username, 'Password': password };
        
        const postTweet = async (tweet) => {
            try {
                let addTweetResponse = await addTweetsForUser(tweet, loggedInUser);
                setIsTweetAdded(true);
                //setUser(addTweetResponse);
            } catch (error) {
                console.log(error);
            }
        }
        postTweet(tweet);
    }
    
},[isFormSubmitted, tweet, loggedInUser])

  const handlePostTweet = (content) => {
    const newTweet = {
      message: content,
      Tweetid: 1,
      postedon: new Date(Date.now()).toJSON(),
      username: loggedInUser
    }

    setTweet(newTweet);
    setIsFormSubmitted(true);
  }


  return (
    <div className="app">
      <HeaderNav />
      <FaTwitter className="app-logo" size="2em" />
      <ComposeForm onSubmit={handlePostTweet} />
      <div className="separator"></div>
      <Timeline tweets={tweets} tweetDeletedHandler={updateIsTweetDeleted}/>
    </div>
  )
};

export default TweetAppComponent;