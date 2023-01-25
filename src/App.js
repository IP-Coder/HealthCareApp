import './App.css';
import Navebar from './components/Navebar';
import Signup from './components/Authorization/Signup';
import Login from './components/Authorization/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HnMember from './components/Hospital/HnMember';
import HPateint from './components/Hospital/HPateint';
import Hhome from './components/Hospital/Hhome';
import PatientLogin from './components/Authorization/PatientLogin';

function App() {
  return (
    <>
      <Router>
        <Navebar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/Hhome" element={<Hhome />} />
          <Route exact path="/HnMember" element={<HnMember />} />
          <Route exact path="/HPateint" element={<HPateint />} />
          <Route exact path="/patientlogin" element={<PatientLogin />} />
        </Routes>
      </Router >

    </>

  );
}

export default App;
