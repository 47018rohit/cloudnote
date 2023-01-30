import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span style={{color:'magenta'}}>Cloud</span><span className='px-1 rounded-1' style={{backgroundColor:"magenta",color:'white'}}>Note</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/user">User</NavLink>
              <NavLink className="nav-link" to="/about">About</NavLink>
            </div>
          </div>
        </div>
      </nav>

    </div>
  )
}
