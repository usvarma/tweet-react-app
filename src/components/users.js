import registeredusers from '../data/users.json';

function Users({ tweets }) {
  
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
                <tr>
                    <td>username1</td>
                    <td>2</td>
                    <td>72</td>
                </tr>
            
                <tr>
                    <td>username1</td>
                    <td>12</td>
                    <td>45</td>
                </tr>
            </tbody>
        </table>
    </div>
    )
  }
  
  export default Users