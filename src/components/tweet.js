import moment from 'moment';
import Avatar from './avatar';
import '../styles/tweet.css';
import { FaRegComment, FaRetweet } from 'react-icons/fa';
import {MdOutlineFavoriteBorder} from 'react-icons/md';

function Tweet(props) {
  const { user, createdOn, children, comments_count, retweets_count, favorites_count} = props
  
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
        </div>
      </div>
      
    </div>
  )
}
  
  export default Tweet