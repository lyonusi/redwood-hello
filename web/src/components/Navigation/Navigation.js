import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
// import SignoutBtn from 'src/components/SignoutBtn/SignoutBtn'

const Navigation = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <div>
      <nav>
        {/* {isAuthenticated ? (
          // signed in - show the Sign Out button
          <>
            <div className="flex-between">
              <Link className="rw-button rw-button-grey" to={routes.home()}>
                Home
              </Link>
              <Link className="rw-button rw-button-grey" to={routes.posts()}>
                Posts
              </Link>
              <Link className="rw-button rw-button-grey" to={routes.newPost()}>
                Create New Post
              </Link>
              <div>
                <span className="rw-main">
                  Logged in as {currentUser.email}
                </span>
                <button
                  className="rw-button rw-button-grey"
                  type="button"
                  onClick={logOut}
                >
                  Logout
                </button>
                <Toaster toastOptions={{ duration: 60000 }} />
              </div>
            </div>
          </>
        ) : (
          // signed out - show the Sign Up and Sign In links */}
        <>
          <div className="flex-between">
            <Link to={routes.signup()} className="rw-button rw-button-blue">
              Sign Up
            </Link>
            <Link to={routes.login()} className="rw-button rw-button-green">
              Login
            </Link>
          </div>
        </>
        {/* )} */}
      </nav>
    </div>
  )
}

export default Navigation
