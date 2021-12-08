import React from "react";
import { useState } from 'react';
import { nanoid } from 'nanoid';
import ComposeForm from './composeform';
import Timeline from './timeline';
import HeaderNav from './headernav';
import { FaTwitter } from 'react-icons/fa';
import '../styles/tweetapp.css';
import initialTweets from '../data/tweets.json';

const CURRENT_USER = 'twitterbot'

const TweetAppComponent = () => {
  
  const [tweets, setTweets] = useState(initialTweets)
  
  const handlePostTweet = (content) => {
                                          const newTweet = {  content, 
                                                              id: nanoid(), 
                                                              created_on: Date(Date.now()), 
                                                              user: CURRENT_USER,      
                                                              comments_count: 0,      
                                                              retweets_count: 0,      
                                                              favorites_count: 0,    
                                                            }
                                                            
                                          setTweets([...tweets, newTweet])  
                                        }
  return (
            <div className="app">
              <HeaderNav/>
              <FaTwitter className="app-logo" size="2em" />
              <ComposeForm onSubmit={handlePostTweet} />      
              <div className="separator"></div>
              <Timeline tweets={tweets} />
            </div>
          )
};

export default TweetAppComponent;