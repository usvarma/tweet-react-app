import React from "react";
//import TweetList from "./tweetList";
import ComposeForm from './composeform'
import Timeline from './timeline'
import { FaTwitter } from 'react-icons/fa'
import '../styles/tweetapp.css'
import tweets from '../data/tweets.json';

const TweetAppComponent = () => {
  return (
    <div className="app">
    <FaTwitter className="app-logo" size="2em" />
    <ComposeForm />
    <div className="separator"></div>
    <Timeline tweets={tweets} />
  </div>
  );
};

export default TweetAppComponent;