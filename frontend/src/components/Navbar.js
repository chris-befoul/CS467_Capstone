import React from 'react'
import {Link} from 'react-router-dom'
import Button from "./Button";
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <h1 style={{display:"block", paddingLeft: 30, paddingTop:10}}>Logo</h1>
            <div className="links">
                <Link to="/Login" className='nav-link'>Login</Link>
                <Link to="/Signup" className='nav-link'>Sign Up</Link>
            </div>
        </div>
    )
}

export default Navbar
