import logo from './logo.svg';
import './App.css';
import LandingPage from './LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import RegistrationPage from './Regstration/RegistrationPage';
import LoginPage from './Login/LoginPage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PitchUploadPage from './Pitching/PitchUploadPage';

function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/home' element={<LandingPage/>}/>
            {/* <Route path='/register' element={<RegistrationPage/>}/> */}
            <Route path='/pitch-upload' element={<PitchUploadPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
