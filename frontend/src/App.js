import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './Signup';
import UserSignup from './UserSignup';
import Login from './Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/usersignup" element={<UserSignup />} />
                <Route exact path="/login" element={<Login />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
