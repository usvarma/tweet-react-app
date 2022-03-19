import moment from 'moment';
import Avatar from './avatar';
import '../styles/tweet.css';
import { FaRegComment, FaRetweet } from 'react-icons/fa';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { deleteTweetsForUser } from "../services/TweetService";

function Tweet(props) {
  const { tweetId, user, createdOn, children, comments_count, retweets_count, favorites_count, onTweetDelete } = props
  const [isDeleteTweetClicked, setIsDeleteTweetClicked] = useState(false);
  //const navigate = useNavigate();

  useEffect(() => {
    if (isDeleteTweetClicked) {

      const deleteTweet = async (user, tweetId) => {
        try {
          let deleteResponse = await deleteTweetsForUser(user, tweetId);
          //console.log(`Deleted tweet with id: ${tweetId}`);
          //navigate('/username/tweets');
          onTweetDelete(true);
          setIsDeleteTweetClicked(false);
        } catch (error) {
          console.log(error);
        }
      }
      deleteTweet(user, tweetId);
    }

  }, [user, tweetId, isDeleteTweetClicked])

  const deleteTweetHandler = (event) => {
    event.preventDefault();
    setIsDeleteTweetClicked(true);

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
          <MdOutlineFavoriteBorder className="favorites-count" size='2em'></MdOutlineFavoriteBorder> {favorites_count}
          <button type="submit" className="compose-form-submit" onClick={deleteTweetHandler}> Delete</button>
          <button type="submit" className="compose-form-submit"> Edit</button>
        </div>
      </div>

    </div>
  )
}

export default Tweet