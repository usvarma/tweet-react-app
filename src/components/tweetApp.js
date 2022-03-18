import React from "react";
import { useState, useContext, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ComposeForm from './composeform';
import Timeline from './timeline';
import HeaderNav from './headernav';
import { FaTwitter } from 'react-icons/fa';
import '../styles/tweetapp.css';
import { getAllTweetsOfUser } from "../services/TweetService";
import UserContext from "../context/usercontext";


const TweetAppComponent = () => {

  const userContext = useContext(UserContext);
  //console.log(userContext);
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);

  if (user == null && userContext?.user !== null) {
    setUser(userContext.user); console.log(user);
  }

  useEffect(() => {
    //console.log(userContext);

    const getTweets = async () => {
      try {
        let getTweetsResponse = await getAllTweetsOfUser(user?.username);
        console.log(`getTweetsResponse in useEffect is ${getTweetsResponse}`);
        setTweets(getTweetsResponse);

      } catch (error) {
        console.log(error);
      }
    }

    getTweets();

  }, [])

  const handlePostTweet = (content) => {
    const newTweet = {
      content,
      id: nanoid(),
      created_on: Date(Date.now()),
      user: user?.username,
      comments_count: 0,
      retweets_count: 0,
      favorites_count: 0,
    }

    setTweets([...tweets, newTweet])
  }


  return (
    <div className="app">
      <HeaderNav />
      <FaTwitter className="app-logo" size="2em" />
      <ComposeForm onSubmit={handlePostTweet} />
      <div className="separator"></div>
      <Timeline tweets={tweets} />
    </div>
  )
};

export default TweetAppComponent;