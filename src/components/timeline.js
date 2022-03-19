import PropTypes from 'prop-types';
import Tweet from './tweet.js';
import '../styles/timeline.css';

function Timeline({ tweets }) {
  
  return (
    <ul className="timeline">
  {tweets.sort((a, b) => new Date(a.postedon) - new Date(b.postedon)).map(({ tweetid, username, postedon, message, repliedbyusers, likedbyusers }) => (
      <li key={tweetid} className="timeline-item">
        <Tweet user={username} createdOn={postedon} comments_count={repliedbyusers?.length || 0} retweets_count={repliedbyusers?.length || 0} favorites_count={likedbyusers?.length || 0}>
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