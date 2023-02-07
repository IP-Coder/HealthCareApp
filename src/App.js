import './App.css';
import Navebar from './components/Navebar';
import Signup from './components/Authorization/Signup';
import Login from './components/Authorization/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Text from './components/Hospital/Text';
import PatientLogin from './components/Authorization/PatientLogin';
import Hospital from './components/Hospital/Hospital';
import SplashScreen from './components/Authorization/SplashScreen';

function App() {
  return (
    <>
      <Router>
        <Navebar />
        <Routes>
          <Route exact path="/" element={<SplashScreen />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/Hospital" element={<Hospital />} />
          <Route exact path="/patientlogin" element={<PatientLogin />} />
          <Route exact path="/text" element={<Text />} />
        </Routes>
      </Router >

    </>

  );
}

export default App;
