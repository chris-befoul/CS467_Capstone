import Navbar from "./components/Navbar";
import "./Login.css";
import Button from "./components/Button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="App">
      <form className='form'>
        <div className='user'>
            <label>User: <input className='user-label' type='text'></input></label>
        </div>
        <div className='password'>
            <label>Password: <input className='password-label' type='text'></input></label>
        </div>
        <div className='submit-btn-block'><input className="submit-btn" type="submit" value="Login" /></div>
    </form>
    </div>
  );
};

export default Login;