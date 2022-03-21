
import { useState, useEffect} from 'react';
import { getAllUsers } from "../services/UserService";
import { getAllTweetsOfUser } from "../services/TweetService";

function Users() {
    const[users, setUsers] = useState([]);
    const [tweetCountsForUser, setTweetCountsForUser] = useState([]);
   
    useEffect(() => {
        const getUsers = async () => {
            try {
                let response = await getAllUsers();
                setUsers(response.map(u => u.username));
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();
        
    }, [])

    useEffect( () => {
        let allUsers = users;
        let tweetCountsForUser = [];
        const getTweetCountForUsers = async (users) =>{
            try {
                for(const user of allUsers){
                    let response = await getAllTweetsOfUser(user);
                    tweetCountsForUser.push({username: user, tweetCount: response?.length, retweetCount: 0});
                }
                setTweetCountsForUser(tweetCountsForUser);
            } catch (error) {
                console.log(error);
            }
        }
        getTweetCountForUsers(allUsers);
    }, [users])

    return (
    <div className="container">
        <div className="mb-4"></div>
        <table className="table table-striped table-bordered mt-4">
            <thead>
            <tr>
                <th>Username</th>
                <th>Tweets</th>
                <th>Retweets</th>
            </tr>
            </thead>
            <tbody>
                    {tweetCountsForUser.map((user, i) =>(
                        <tr key={i}>
                            <td>{user.username}</td>
                            <td>{user.tweetCount}</td>
                            <td>{user.retweetCount}</td>
                        </tr>
                    ))}
                
            </tbody>
        </table>
    </div>
    )
  }
  
  export default Users