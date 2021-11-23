import PropTypes from 'prop-types';
import Tweet from './tweet.js';
import '../styles/timeline.css';

function Timeline({ tweets }) {
  
  return (
    <ul className="timeline">
  {tweets.sort((a, b) => new Date(b.created_on) - new Date(a.created_on)).map(({ id, user, created_on, content, comments_count, retweets_count, favorites_count }) => (
      <li key={id} className="timeline-item">
        <Tweet user={user} createdOn={created_on} comments_count={comments_count} retweets_count={retweets_count} favorites_count={favorites_count}>
          {content} 
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