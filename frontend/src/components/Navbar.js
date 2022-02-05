import React from 'react'
import {Link} from 'react-router-dom'
import Button from "./Button";
import './Navbar.css'

const Navbar = (props) => {

    let name = props.name;
    let setName = props.setName;

    let type = props.type;
    let setType = props.setType;

    let menu;

    const logout = async() => {
        await fetch('http://localhost:8080/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'},
            credentials: 'include'
          });
        setName('');
        setType('');
    }

    // not logged in
    if (name === '') {
        menu = (
            <div className="links">
            <Link to="/Login" className='nav-link'>Login</Link>
            <Link to="/Signup" className='nav-link'>Sign Up</Link>
            <Link to="/Admin" className='nav-link'>Admin</Link>
            </div>
        );
    } else if (type === 'Shelter') {    // logged in - shelter
        menu = (
            <div className="links">
            <Link to='/' className='nav-link'>Create</Link>
            <Link to='/' className='nav-link'>Manage</Link>
            <Link to='/' className='nav-link'>Shelter Profile</Link>
            <Link to="/Login" className='nav-link' onClick={logout}>Logout</Link>
            </div>
        );
    } else if (type === 'User') {    // logged in - user
        menu = (
            <div className="links">
            <Link to="/userprofile" className='nav-link'>User Profile</Link>
            <Link to="/Login" className='nav-link' onClick={logout}>Logout</Link>
            </div>
        );
    } else if (type === 'Admin') {    // logged in - admin
        menu = (
            <div className="links">
            <Link to="/" className='nav-link'>Manage Profiles</Link>
            <Link to="/Login" className='nav-link' onClick={logout}>Logout</Link>
            </div>
        );
    }

    return (
        <div className='navbar'>
            <Link to=''><h1 style={{display:"block", paddingLeft: 30, paddingTop:10}}>Logo</h1></Link>
            {menu}
        </div>
    )
}

export default Navbar;
