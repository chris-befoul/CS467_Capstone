import React from 'react'
import Navbar from './components/Navbar'
import "./UserSignup.css";
import { useState } from 'react';

const ShelterSignup = () => {
    const [formData, setFormData] = useState({
        shelter_name: "",
        city: "",
        phone: "",
        zip_code: "",
        state: "",
        email: "",
        password: "",
        confirm_password: "",
    }); 

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const newdata = {...formData};
        newdata[e.target.name] = e.target.value;
        setFormData(newdata);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formData));
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0) {
            const res = await fetch('http://localhost:8080/shelters', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            console.log(data);
        }

    };

    const validate = (values) => {
        const errors = {};
        const name_regex = /^[a-zA-Z\s]{3,30}$/;
        const email_regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        const city_regex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/; // letters, spaces, and dashes
        const states = [
            'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
            'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
            'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
            'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
            'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
        ];
        const zip_regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        const phone_regex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        const password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,25}$/; // 8-25 characters, at least 1 lowercase, 1 uppercase, and 1 digit

        if (!name_regex.test(values.shelter_name)) {
            errors.shelter_name = "Invalid shelter name!";
        }
        if (!city_regex.test(values.city)) {
            errors.city = "Invalid city!";
        }
        if (!phone_regex.test(values.phone)) {
            errors.phone = "Invalid phone number!";
        }
        if (!zip_regex.test(values.zip_code)) {
            errors.zip = "Invalid zip code!";
        }
        if (!states.includes(values.state)) {
            errors.state = "Invalid state!";
        }
        if (!email_regex.test(values.email)) {
            errors.email = "Invalid email!";
        }
        if (!password_regex.test(values.password)) {
            errors.password = "Invalid password!";
        }
        if (values.confirm_password !== values.password) {
            errors.confirm_password = "Passwords do not match!";
        }
        return errors;
    };

    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <div><label className='form-section-header'>Shelter Information</label></div>
                    <div className='form-field-group'>
                        <label>Shelter Name: <input required type="text" name='shelter_name' value={formData.shelter_name} onChange={ (e) => handleChange(e)}></input></label>
                        <p className='form-error-msg'>{formErrors.shelter_name}</p>
                    </div>
                    <div className='form-field-group'>
                        <label>City/Town:<input required type="text" name="city" value={formData.city} onChange={ (e) => handleChange(e)}></input></label>
                        <label>Phone Number:<input required type="tel" name="phone" value={formData.phone} onChange={ (e) => handleChange(e)}></input></label>
                        <p className='form-error-msg'>{formErrors.city}</p>
                        <p className='form-error-msg'>{formErrors.phone}</p>
                    </div>
                    <div className='form-field-group'>
                        <label>Zip Code:<input required type="text" name="zip_code" value={formData.zip_code} onChange={ (e) => handleChange(e)}></input></label>
                        <label>State:<input required type="text" name="state" value={formData.state} onChange={ (e) => handleChange(e)}></input></label>
                        <p className='form-error-msg'>{formErrors.zip}</p>
                        <p className='form-error-msg'>{formErrors.state}</p>
                    </div>
                </div>
                <div className='form-group'>
                    <div><label className='form-section-header'>Account Information</label></div>
                    <div className='form-field-group'>
                        <label>Email: <input required type="text" name="email" value={formData.email} onChange={ (e) => handleChange(e)}></input></label>
                        <p className='form-error-msg'>{formErrors.email}</p>
                    </div>
                    <div className='form-field-group'>
                        <label>Password:<input required type="password" name="password" value={formData.password} onChange={ (e) => handleChange(e)}></input></label>
                        <label>Confirm Password:<input required type="password" name="confirm_password" value={formData.confirm_password} onChange={ (e) => handleChange(e)}></input></label>
                        <p className='form-error-msg'>{formErrors.password}</p>
                        <p className='form-error-msg'>{formErrors.confirm_password}</p>
                    </div>
                </div>
                <div className='submit-btn-block'><input className="submit-btn" type="submit" value="Create Account" /></div>
            </form>
        </div>
    )
}

export default ShelterSignup
