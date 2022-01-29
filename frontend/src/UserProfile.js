import React from 'react'
import Navbar from './components/Navbar'
import "./UserSignup.css";
import { useState } from 'react';

const UserProfile = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <div><label className='form-section-header'>About Me</label></div>
                    <div className='form-field-group'>
                        <label>First Name: <input required type="text" name='first_name'></input></label>
                        <label>Last Name:<input required type="text" name='last_name'></input></label>
                    </div>
                    <div className='form-field-group'>
                        <label>City/Town:<input required type="text" name="city"></input></label>
                        <label>Phone Number:<input required type="tel" name="phone" placeholder='123-456-7890'></input></label>
                    </div>
                    <div className='form-field-group'>
                        <label>Zip Code:<input required type="text" name="zip_code"></input></label>
                        <label>State:<input required type="text" name="state" placeholder='CA'></input></label>
                    </div>
                </div>
                <div className='form-group'>
                    <div><label className='form-section-header'>Account Information</label></div>
                    <div className='form-field-group'>
                        <label>Email: <input required type="text" name="email"></input></label>
                    </div>
                    <div className='form-field-group'>
                        <label>Current Password:<input required type="password" name="password"></input></label>
                    </div>
                    <div className='form-field-group'>
                        <label>New Password:<input required type="password" name="password"></input></label>
                        <label>Confirm New Password:<input required type="password" name="confirm_password"></input></label>
                    </div>
                </div>
                <div className='form-group'>
                    <div><label className='form-section-header'>Email Preference</label></div>
                    <div className='form-field-group'>
                        <label>Enable email notifications for newly added profiles: </label>
                        <input type="checkbox" name="email_preference"></input>
                    </div>
                </div>
                <div className='submit-btn-block'><input className="submit-btn" type="submit" value="Update Account" /></div>
                <div className='delete-btn-block'><button className="delete-btn" type='button'>Delete Account</button></div>
            </form>
        </div>
    )
}

export default UserProfile;
