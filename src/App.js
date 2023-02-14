import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Alert from './components/Alert';
import About from './components/About';
import Home from './components/Home';
import User from './components/User';
import NoteState from './context/noteContext/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null)
  const [user, setUser] = useState('')

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1000)
  }

  const showUser = (name)=>{
    setUser(name)
  }

  return (
    <NoteState >
      <BrowserRouter basename='/'>
        <NavBar showAlert={showAlert} user={user}/>
        <Alert alert={alert} />
        <div className='container' >
          <Routes>
            <Route path='/' element={<Home showAlert={showAlert}/>}></Route>
            <Route path='/user' element={<User showAlert={showAlert} />}></Route>
            <Route path='/about' element={<About showAlert={showAlert} />}></Route>
            <Route path='/login' element={<Login showAlert={showAlert} showUser={showUser}/>}></Route>
            <Route path='/signup' element={<Signup  showAlert={showAlert}/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
