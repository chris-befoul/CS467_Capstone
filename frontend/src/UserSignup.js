import React from 'react'
import Navbar from './components/Navbar'
import "./UserSignup.css";
import { useState } from 'react';

const UserSignup = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        city: "",
        phone: "",
        zip_code: "",
        state: "",
        email: "",
        password: "",
        confirm_password: "",
        email_preference: false
    }); 

    const handleChange = (e) => {
        const newdata = {...formData};
        if (e.target.name === "email_preference"){
            newdata[e.target.name] = !formData.email_preference;
        }
        else{
            newdata[e.target.name] = e.target.value;
        }
        
        setFormData(newdata);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        console.log(data);
    };

    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <div><label className='form-section-header'>User Information</label></div>
                    <div className='form-field-group'>
                        <label>First Name: <input type="text" name='first_name' value={formData.first_name} onChange={ (e) => handleChange(e)}></input></label>
                        <label>Last Name:<input type="text" name='last_name' value={formData.last_name} onChange={ (e) => handleChange(e)}></input></label>
                    </div>
                    <div className='form-field-group'>
                        <label>City/Town:<input type="text" name="city" value={formData.city} onChange={ (e) => handleChange(e)}></input></label>
                        <label>Phone Number:<input type="tel" name="phone" value={formData.phone} onChange={ (e) => handleChange(e)}></input></label>
                    </div>
                    <div className='form-field-group'>
                        <label>Zip Code:<input type="text" name="zip_code" value={formData.zip_code} onChange={ (e) => handleChange(e)}></input></label>
                        <label>State:<input type="text" name="state" value={formData.state} onChange={ (e) => handleChange(e)}></input></label>
                    </div>
                </div>
                <div className='form-group'>
                    <div><label className='form-section-header'>Account Information</label></div>
                    <div className='form-field-group'>
                        <label>Email: <input type="text" name="email" value={formData.email} onChange={ (e) => handleChange(e)}></input></label>
                    </div>
                    <div className='form-field-group'>
                        <label>Password:<input type="password" name="password" value={formData.password} onChange={ (e) => handleChange(e)}></input></label>
                        <label>Confirm Password:<input type="password" name="confirm_password" value={formData.confirm_password} onChange={ (e) => handleChange(e)}></input></label>
                    </div>
                </div>
                <div className='form-group'>
                    <div><label className='form-section-header'>Email Preference</label></div>
                    <div className='form-field-group'>
                        <label>Enable email notifications for newly added profiles: </label>
                        <input type="checkbox" name="email_preference" value={formData.email_preference} onChange={ (e) => handleChange(e)}></input>
                    </div>
                </div>
                <div className='submit-btn-block'><input className="submit-btn" type="submit" value="Create Account" /></div>
            </form>
        </div>
    )
}

export default UserSignup
