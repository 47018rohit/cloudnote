import React from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'

export default function NavBar(props) {
  const { showAlert, user } = props
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
    showAlert("Logged Out Successfully", "success")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span style={{ color: 'magenta' }}>Cloud</span><span className='px-1 rounded-1 text-dark' style={{ backgroundColor: "magenta" }}>Note</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
              {/* <NavLink className="nav-link" to="/user">User</NavLink> */}
              <NavLink className="nav-link" to="/about">About</NavLink>
            </div>
            {
              localStorage.getItem('token') ?
                <div className='d-flex justify-content-between' >
                  <div className='d-flex justify-content-center mx-2'>
                    <i className="fa-solid fa-user d-flex justify-content-center align-items-center rounded-circle" style={{ width: '40px', height: '40px', backgroundColor: 'white' }}></i>
                    <span className="navbar-text mx-2">
                      {user}
                    </span>
                  </div>
                  <button className="btn btn-primary mx-2" onClick={handleLogOut}>Log out</button>
                </div> :
                <div >
                  <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                  <Link className="btn btn-primary" to="/signup" role="button">Sign Up</Link>
                </div>
            }

          </div>
        </div>
      </nav>

    </div>
  )
}
