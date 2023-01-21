import './App.css';
import Navebar from './components/Navebar';
import Signup from './components/Signup';
import Hospital from './components/Hospital';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HnMember from './components/HnMember';
import HPateint from './components/HPateint';
import Hhome from './components/Hhome';

function App() {
  return (
    <>
      <Router>
        <Navebar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/Hospital" element={<Hospital />} /> */}
          <Route exact path="/Hhome" element={<Hhome />} />
          <Route exact path="/HnMember" element={<HnMember />} />
          <Route exact path="/HPateint" element={<HPateint />} />
        </Routes>
      </Router >

    </>

  );
}

export default App;
