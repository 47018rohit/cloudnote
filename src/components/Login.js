import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const { showAlert, showUser } = props
    const [credential, setCredential] = useState({ email: '', password: '' })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        // console.log(json)

        if (json.success) {
            //save token and redirect to notes. Get user data also.
            localStorage.setItem('token', json.token)

            const getUserData = await fetch('http://localhost:5000/api/auth/getuser', {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            })
            const userData = await getUserData.json()
            // console.table(userData)
            showUser(userData.name)
            showAlert('Logged in successfully', 'success')
            navigate('/')
        }
        else {
            // Show alert for wrong credentials
            alert('wrong credentials')
            showAlert('Logged in successfully', 'success')
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }



    return (
        <div className='d-flex flex-column' >
            <h2 className='text-center'>Login</h2>
            <div className="d-flex justify-content-center">
                <form className=' w-25 my-5 p-5 rounded' style={{ backgroundColor: 'lightblue' }} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credential.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credential.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
