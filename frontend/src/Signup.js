import Navbar from "./components/Navbar";
import "./Signup.css";
import Button from "./components/Button";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="App">
      <div className="Welcome-msg">
        <p>Welcome!</p>
        <div style={{ height: 50 }}></div>
        <p>I'm signing up as a ...</p>
      </div>
      <div className="signup-btn">
        <div><Link to="/usersignup"><Button text={"User"}/></Link></div>
        <div><Button text={"Shelter"}/></div>
      </div>
    </div>
  );
}

export default Signup;
