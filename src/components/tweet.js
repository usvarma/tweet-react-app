import moment from 'moment';
import Avatar from './avatar';
import '../styles/tweet.css';
import { FaRegComment, FaRetweet } from 'react-icons/fa';
import { useState, useEffect, useContext} from "react";
import { deleteTweetsForUser, likeTweet } from "../services/TweetService";
import UserContext from '../context/usercontext';

function Tweet(props) {
  const context = useContext(UserContext);
  const { tweetId, user, createdOn, children, comments_count, retweets_count, favorites_count, onTweetDelete, onLikeTweet } = props
  const [isDeleteTweetClicked, setIsDeleteTweetClicked] = useState(false);
  const [isLikeTweetClicked, setIsLikeTweetClicked] = useState(false);
  let loggedInUser = JSON.parse(localStorage.getItem("username")) || "";
  
  useEffect(() => {
    if (isDeleteTweetClicked) {

      const deleteTweet = async (user, tweetId) => {
        try {
          await deleteTweetsForUser(user, tweetId);
          onTweetDelete(true);
          setIsDeleteTweetClicked(false);
        } catch (error) {
          setIsDeleteTweetClicked(false);
          console.log(error);
        }
      }
      deleteTweet(user, tweetId);
    }

  }, [user, tweetId, isDeleteTweetClicked])

  useEffect(() => {
    if (isLikeTweetClicked) {
      const likeATweet = async (user, tweetId) => {
        try {
          await likeTweet(user, tweetId);
          onLikeTweet(true);
          setIsLikeTweetClicked(false);
        } catch (error) {
          setIsLikeTweetClicked(false);
          console.log(error);
        }
      }
      likeATweet(loggedInUser, tweetId);
    }

  }, [user, tweetId, isLikeTweetClicked])

  const deleteTweetHandler = (event) => {
    event.preventDefault();
    setIsDeleteTweetClicked(true);
  }

  const likeTweetHandler = (event) =>{
    event.preventDefault();
    setIsLikeTweetClicked(true);
  }

  return (
    <div className="tweet">
      <Avatar name={user} />
      <div>
        <div className="tweet-header">
          <span className="tweet-user">@{user}</span>·
          <span className="tweet-created-on">{moment(createdOn).fromNow()} </span>
        </div>
        <div className="tweet-content">{children}</div>
        <div className="tweet-attributes">
          <span><FaRegComment className="comments-count" size='2em'></FaRegComment>{comments_count}</span>
          <FaRetweet className="retweets-count" size='2em'></FaRetweet> {retweets_count}
          {loggedInUser === user && <button type="submit" className="compose-form-submit" onClick={deleteTweetHandler}> Delete</button>}
          {loggedInUser !== user && <button type="submit" className="compose-form-submit" onClick={likeTweetHandler}> Like </button>} <span>{favorites_count} likes!</span>
        </div>
      </div>

    </div>
  )
}

export default Tweet