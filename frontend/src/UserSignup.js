import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import "./UserSignup.css";
import { useNavigate } from 'react-router-dom';

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
        email_preference: false,
        type: "User"
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const fetchURL = 'http://localhost:8080';
    // const fetchURL = "https://cs467-sandbox.ue.r.appspot.com";

    const handleChange = (e) => {
        const newdata = { ...formData };
        if (e.target.name === "email_preference") {
            newdata[e.target.name] = !formData.email_preference;
        }
        else {
            newdata[e.target.name] = e.target.value;
        }
        setFormData(newdata);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(await validate(formData));
        setIsSubmit(true);
    };

    useEffect(() => {
        // console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        //   console.log(formData);
            fetch(fetchURL + '/api/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
            }).then(res => res.json()).then(data => {
                console.log(data);
                alert("User created!");

                //redirect to sign in page
                navigate("/login");
            });
        }
      }, [formErrors]); // eslint-disable-line react-hooks/exhaustive-deps

    const validate = async (values) => {
        const errors = {};
        const name_regex = /^[a-zA-Z\s]{3,25}$/;
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

        if (!name_regex.test(values.first_name)) {
            errors.first_name = "Invalid first name! It should be letters only and 3-25 characters long.";
        }
        if (!name_regex.test(values.last_name)) {
            errors.last_name = "Invalid last name! It should be letters only and 3-25 characters long.";
        }
        if (!city_regex.test(values.city)) {
            errors.city = "Invalid city! It should consist of letters, spaces, and dashes only.";
        }
        if (!phone_regex.test(values.phone)) {
            errors.phone = "Invalid phone number! It should be in the format 111-111-1111.";
        }
        if (!zip_regex.test(values.zip_code)) {
            errors.zip = "Invalid zip code!It should be a 5-digit number.";
        }
        if (!states.includes(values.state)) {
            errors.state = "Invalid state! Please enter state abbreviations only.";
        }
        if (!email_regex.test(values.email)) {
            errors.email = "Invalid email!";
        }
        if (!password_regex.test(values.password)) {
            errors.password = "Invalid password! Passwords should be 8-25 characters long and contain at least 1 lowercase, 1 uppercase, and 1 digit.";
        }
        if (values.confirm_password !== values.password) {
            errors.confirm_password = "Passwords do not match!";
        }
        
        const res = await fetch(fetchURL + '/api', { method: 'GET'});
        const users = await res.json();
        users.forEach(user => {
            if (user.email === values.email){
                errors.duplicate_email = "This email already exists!";
            }
        });

        return errors;
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <div className='form-section-header'><label>User Information</label></div>
                    <div className='form-field-group'>
                        <div className='input-pair'>
                            <div className='form-input-field'>
                                <label>First Name: </label>
                                <input required type="text" name='first_name' value={formData.first_name} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.first_name}</p>
                            </div>
                            <div className='form-input-field'>
                                <label>Last Name:</label>
                                <input required type="text" name='last_name' value={formData.last_name} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.last_name}</p>
                            </div>
                        </div>
                    </div>
                    <div className='form-field-group'>
                        <div className='input-pair'>
                            <div className='form-input-field'>
                                <label>City/Town:</label>
                                <input required type="text" name="city" value={formData.city} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.city}</p>
                            </div>
                            <div className='form-input-field'>
                                <label>Phone Number:</label>
                                <input required type="tel" name="phone" placeholder='123-456-7890' value={formData.phone} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className='form-field-group'>
                        <div className='input-pair'>
                            <div className='form-input-field'>
                                <label>Zip Code:</label>
                                <input required type="text" name="zip_code" value={formData.zip_code} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.zip}</p>
                            </div>
                            <div className='form-input-field'>
                                <label>State:</label>
                                <input required type="text" name="state" placeholder='CA' value={formData.state} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.state}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form-group'>
                    <div><label className='form-section-header'>Account Information</label></div>
                    <div className='form-field-group'>
                        <div className='input-pair'>
                            <div className='form-input-field'>
                                <label>Email:</label>
                                <input required type="text" name="email" value={formData.email} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.email}</p>
                                <p className='form-error-msg'>{formErrors.duplicate_email}</p>
                            </div>
                        </div>
                    </div>
                    <div className='form-field-group'>
                        <div className='input-pair'>
                            <div className='form-input-field'>
                                <label>Password:</label>
                                <input required type="password" name="password" value={formData.password} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.password}</p>
                            </div>
                            <div className='form-input-field'>
                                <label>Confirm Password:</label>
                                <input required type="password" name="confirm_password" value={formData.confirm_password} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.confirm_password}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form-group'>
                    <div><label className='form-section-header'>Email Preference</label></div>
                    <div className='form-field-group'>
                        <div>
                            <label>Enable email notifications for newly added profiles: </label>
                            <input type="checkbox" name="email_preference" value={formData.email_preference} onChange={(e) => handleChange(e)}></input>
                        </div>
                    </div>
                </div>
                <div className='submit-btn-block1'><input className="submit-btn" type="submit" value="Create Account" /></div>
            </form>
        </div>
    )
}

export default UserSignup;
