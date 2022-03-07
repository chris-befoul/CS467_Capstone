import React from 'react'
import "./UserSignup.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ShelterProfile = ({setName, setType}) => {
    const [formData, setFormData] = useState({
        id: "",
        shelter_name: "",
        city: "",
        phone: "",
        zip_code: "",
        state: "",
        email: "",
        password: "",
        new_password: "",
        confirm_new_password: "",
        type: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const navigate = useNavigate();
    // const fetchURL = 'http://localhost:8080';
    // const fetchURL = "https://cs467-sandbox.ue.r.appspot.com";
    const fetchURL = 'https://capstone-animal-adoption-app.wl.r.appspot.com';

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
        setIsSubmit(true);
        setFormErrors(await validate(formData));
    };

    const getShelterInfo = () => {
        fetch(fetchURL + '/api/user', { method: 'GET', credentials: 'include' }).then(res => res.json()).then(data => {
            const userInfo = data;
            // console.log(userInfo);
            userInfo.password = "";
            userInfo.new_password = "";
            userInfo.confirm_new_password = "";
            setFormData(userInfo);
        });
    };

    useEffect(() => {
        getShelterInfo();
    }, []);

    useEffect(() => {
        // console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            //   console.log(formData);
            fetch(fetchURL + '/api/user', {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            }).then(res => {
                if (!res.ok) {
                    throw new Error('invalid password!');
                } else {
                    return res.text();
                }
            }).then(data => {
                // console.log(data);
                alert("Shelter Updated!");
                // window.location.reload();
                getShelterInfo();
            }).catch(e => alert("Invalid current password!"));
        }
    }, [formErrors]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (changePassword === false) {
            const newdata = { ...formData, password: '', new_password: '', confirm_new_password: '' };
            setFormData(newdata);
        }
    }, [changePassword]); // eslint-disable-line react-hooks/exhaustive-deps

    const deleteAccount = () => {
        // console.log('Delete account!')
        if (window.confirm('Are you sure you wish to delete your account?')){
            fetch(fetchURL + '/api/user', { method: 'DELETE', credentials: 'include' }).then(() => {
                console.log('Deleted!');
                alert("Shelter deleted!");
    
                // redirect to landing page
                navigate("/");
                // window.location.reload();
                setName('');
                setType('');
            });
        }
    };

    const validate = async (values) => {
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
            errors.shelter_name = "Invalid shelter name! It should be letters only and 3-30 characters long.";
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
        if (values.new_password !== '') {
            if (!password_regex.test(values.new_password)) {
                errors.new_password = "Invalid password! Passwords should be 8-25 characters long and contain at least 1 lowercase, 1 uppercase, and 1 digit.";
            }
            if (values.confirm_new_password !== values.new_password) {
                errors.confirm_new_password = "Passwords do not match!";
            }
        }

        const res = await fetch(fetchURL + '/users', { method: 'GET' });
        const users = await res.json();
        users.forEach(user => {
            if (user.email === values.email && user.id !== values.id) {
                errors.duplicate_email = "This email already exists!";
            }
        });

        return errors;
    };

    const displayPassword = () => {
        if (changePassword === true){
            return <div>
                <div className='form-field-group'>
                        <div className='input-pair'>
                            <div className='form-input-field'>
                                <label>Current Password:</label>
                                <input required type="password" name="password" disabled={!changePassword} value={formData.password} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.password}</p>
                            </div>
                        </div>
                    </div>
                    <div className='form-field-group'>
                        <div className='input-pair'>
                            <div className='form-input-field'>
                                <label>New Password:</label>
                                <input required type="password" name="new_password" disabled={!changePassword} value={formData.new_password} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.new_password}</p>
                            </div>
                            <div className='form-input-field'>
                                <label>Confirm New Password:</label>
                                <input required type="password" name="confirm_new_password" disabled={!changePassword} value={formData.confirm_new_password} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.confirm_new_password}</p>
                            </div>
                        </div>
                    </div>
            </div>
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <div><label className='form-section-header'>Shelter Info</label></div>
                    <div className='form-field-group'>
                        <div className='input-pair'>
                            <div className='form-input-field'>
                                <label>Shelter Name: </label>
                                <input required type="text" name='shelter_name' defaultValue={formData.shelter_name} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.shelter_name}</p>
                            </div>
                        </div>
                    </div>
                    <div className='form-field-group'>
                        <div className='input-pair'>
                            <div className='form-input-field'>
                                <label>City/Town:</label>
                                <input required type="text" name="city" defaultValue={formData.city} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.city}</p>
                            </div>
                            <div className='form-input-field'>
                                <label>Phone Number:</label>
                                <input required type="tel" name="phone" placeholder='123-456-7890' defaultValue={formData.phone} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className='form-field-group'>
                        <div className='input-pair'>
                            <div className='form-input-field'>
                                <label>Zip Code:</label>
                                <input required type="text" name="zip_code" defaultValue={formData.zip_code} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.zip}</p>
                            </div>
                            <div className='form-input-field'>
                                <label>State:</label>
                                <input required type="text" name="state" placeholder='CA' defaultValue={formData.state} onChange={(e) => handleChange(e)}></input>
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
                                <input required type="text" name="email" defaultValue={formData.email} onChange={(e) => handleChange(e)}></input>
                                <p className='form-error-msg'>{formErrors.email}</p>
                                <p className='form-error-msg'>{formErrors.duplicate_email}</p>
                            </div>
                        </div>
                    </div>
                    {displayPassword()}
                    {(changePassword) ? <button className='edit-password-btn' type='button' onClick={() => setChangePassword(false)}>Close</button> : <button className='edit-password-btn' type='button' onClick={() => setChangePassword(true)}>Edit Password</button>}
                </div>
                <div className='submit-btn-block1'><input className="submit-btn" type="submit" value="Update Account" /></div>
                <div className='delete-btn-block'><button className="delete-btn" type='button' onClick={deleteAccount}>Delete Account</button></div>
            </form>
        </div>
    )
}

export default ShelterProfile;
