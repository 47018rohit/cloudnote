import React from 'react'
import { Link } from 'react-router-dom'
import Notes from './Notes'

export default function Home(props) {
  const { showAlert } = props

  return (
    <div className='container mb-3 my-4'>
      {
        localStorage.getItem('token') ?
          <Notes showAlert={showAlert} /> :
          <div className='d-flex justify-content-center'>
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary" to="/signup" role="button">Sign Up</Link>
          </div>
      }
    </div>
  )
}
