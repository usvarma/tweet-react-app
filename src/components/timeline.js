import PropTypes from 'prop-types';
import Tweet from './tweet.js';
import '../styles/timeline.css';

function Timeline({ tweets }) {
  
  return (
    <ul className="timeline">
  {tweets.sort((a,b) => parseInt(b.tweetId) - parseInt(a.tweetId)).map(({ tweetId, username, postedon, message, repliedByUsers, likedByUsers }) => (
      <li key={parseInt(tweetId)} className="timeline-item">
        <Tweet user={username} createdOn={postedon} comments_count={repliedByUsers?.length || 0} retweets_count={repliedByUsers?.length || 0} favorites_count={likedByUsers?.length || 0}>
          {message} 
        </Tweet>
      </li>
    ))}
</ul>
  )
}

Timeline.propTypes = {
  tweets: PropTypes.array,
}

export default Timeline