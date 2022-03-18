import {useContext} from "react";
import UserContext from "../context/usercontext"


function HeaderNav({ tweets }) {
let userContext = useContext(UserContext);  
    return (
    <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="/login">Login</a>
                    <a className="nav-item nav-link" href="/register">Register</a>
                    <a className="nav-item nav-link" href="/user/tweets">Tweets</a>
                    <a className="nav-item nav-link" href="/users">All Users</a>
                    <a className="nav-item nav-link" href="/" onClick={userContext.onLogout}>Log Out</a>
                </div>
            </div>
        </nav>
    </div>
    )
  }
  
  export default HeaderNav


