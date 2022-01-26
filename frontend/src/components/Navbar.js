import React from 'react'
import {Link} from 'react-router-dom'
import Button from "./Button";
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <h1 style={{display:"block", paddingLeft: 30, paddingTop:10}}>Logo</h1>
            <ul className='navitems'>
                <li>Login</li>
                <li>Signup</li>
            </ul>
        </div>
    )
}

export default Navbar
