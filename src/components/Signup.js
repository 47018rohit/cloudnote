import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  const [credential, setCredential] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  let navigate = useNavigate()

  const { showAlert } = props

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
    });
    const json = await response.json();

    if (json.success) {
      //save token and redirect to notes
      navigate('/login')
      showAlert("Account created Successfully", 'success')
    }
    else {
      // Show alert for Email already exist
      // alert('Email already exist')
      showAlert("Looks like Email already exists", 'danger')
    }
  }

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }
  return (
    <div className='d-flex flex-column '>
      <h2 className='text-center'>Sign Up</h2>
      <div className="d-flex justify-content-center">
        <form className=' w-25 my-5 p-5 rounded' style={{ backgroundColor: 'lightblue' }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Your Name</label>
            <input type="text" className="form-control" id="name" name='name' value={credential.name} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credential.email} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={credential.password} onChange={onChange} minLength='8' required />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" name='confirmPassword' value={credential.confirmPassword} onChange={onChange} minLength='8' required />
          </div>
          <button type="submit" className="btn btn-primary">Create Account</button>
        </form>
      </div>
    </div>
  )
}
