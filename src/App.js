import './App.css';
import Navebar from './components/Navebar';
import Signup from './components/Authorization/Signup';
import Login from './components/Authorization/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import PatientLogin from './components/Authorization/PatientLogin';
import Hospital from './components/Hospital/Hospital';
import SplashScreen from './components/Authorization/SplashScreen';
import DescriptionAlerts from './components/Alerts/Alerts';
import { useState } from 'react';

function App() {
  let [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    setAlert({
      type: type,
      msg: msg
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  return (
    <>
      <Router>
        <Navebar />
        <DescriptionAlerts alert={alert} />
        <Routes>
          <Route exact path="/" element={<SplashScreen />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/Hospital" element={<Hospital showAlert={showAlert} />} />
          <Route exact path="/patientlogin" element={<PatientLogin />} />
          <Route exact path="/alert" element={<DescriptionAlerts />} />
        </Routes>
      </Router >

    </>

  );
}

export default App;
