import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Alert from './components/Alert';
import About from './components/About';
import Home from './components/Home';
import User from './components/User';
import NoteState from './context/noteContext/NoteState';

function App() {
  return (
    <NoteState >
      <BrowserRouter basename='/'>
        <NavBar />
        <div className='container' >
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/user' element={<User />}></Route>
            <Route path='/about' element={<About />}></Route>
          </Routes>
        </div>
        <Alert alert={alert} />
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
