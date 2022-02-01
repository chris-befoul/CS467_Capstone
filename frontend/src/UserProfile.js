import React from 'react'
import Navbar from './components/Navbar'
import "./UserSignup.css";
import { useState, useEffect } from 'react';

const UserProfile = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        city: "",
        phone: "",
        zip_code: "",
        state: "",
        email: "",
        password: "",
        new_password: "",
        confirm_new_password: "",
        email_preference: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        fetch('http://localhost:8080/users/5736741495373824	', { method: 'GET'}).then( res => res.json()).then( data => {
            const {password, id,...userInfo} = data;
            // console.log(userInfo);
            setFormData(userInfo);
        });
      }, []);

    const deleteAccount = () => {
        console.log('Delete account!')
    };

    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <div><label className='form-section-header'>About Me</label></div>
                    <div className='form-field-group'>
                        <label>First Name: <input required type="text" name='first_name' defaultValue={formData.first_name}></input></label>
                        <label>Last Name:<input required type="text" name='last_name' defaultValue={formData.last_name}></input></label>
                    </div>
                    <div className='form-field-group'>
                        <label>City/Town:<input required type="text" name="city" defaultValue={formData.city}></input></label>
                        <label>Phone Number:<input required type="tel" name="phone" placeholder='123-456-7890' defaultValue={formData.phone}></input></label>
                    </div>
                    <div className='form-field-group'>
                        <label>Zip Code:<input required type="text" name="zip_code" defaultValue={formData.zip_code}></input></label>
                        <label>State:<input required type="text" name="state" placeholder='CA' defaultValue={formData.state}></input></label>
                    </div>
                </div>
                <div className='form-group'>
                    <div><label className='form-section-header'>Account Information</label></div>
                    <div className='form-field-group'>
                        <label>Email: <input required type="text" name="email" defaultValue={formData.email}></input></label>
                    </div>
                    <div className='form-field-group'>
                        <label>Current Password:<input required type="password" name="password"></input></label>
                    </div>
                    <div className='form-field-group'>
                        <label>New Password:<input required type="password" name="new_password"></input></label>
                        <label>Confirm New Password:<input required type="password" name="confirm_new_password"></input></label>
                    </div>
                </div>
                <div className='form-group'>
                    <div><label className='form-section-header'>Email Preference</label></div>
                    <div className='form-field-group'>
                        <label>Enable email notifications for newly added profiles: </label>
                        <input type="checkbox" name="email_preference" checked={formData.email_preference}></input>
                    </div>
                </div>
                <div className='submit-btn-block'><input className="submit-btn" type="submit" value="Update Account" /></div>
                <div className='delete-btn-block'><button className="delete-btn" type='button'onClick={deleteAccount}>Delete Account</button></div>
            </form>
        </div>
    )
}

export default UserProfile;
