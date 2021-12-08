function HeaderNav({ tweets }) {
  
    return (
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link active" href="/login">Login</a>
                    <a class="nav-item nav-link" href="/register">Register</a>
                    <a class="nav-item nav-link" href="/user/tweets">Tweets</a>
                    <a class="nav-item nav-link" href="/users">All Users</a>
                    <a class="nav-item nav-link" href="/login">Log Out</a>
                </div>
            </div>
        </nav>
    </div>
    )
  }
  
  export default HeaderNav


