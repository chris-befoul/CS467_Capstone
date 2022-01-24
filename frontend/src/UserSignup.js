import React from 'react'
import Navbar from './components/Navbar'
import "./UserSignup.css";

const UserSignup = () => {
    return (
        <div>
            <Navbar />
            <form>
                <div className='form-group'>
                    <div><label className='form-section-header'>User Information</label></div>
                    <div className='form-field-group'>
                        <label>First Name: <input type="text"></input></label>
                        <label>Last Name:<input type="text"></input></label>
                    </div>
                    <div className='form-field-group'>
                        <label>City/Town:<input type="text"></input></label>
                        <label>Phone Number:<input type="tel"></input></label>
                    </div>
                    <div className='form-field-group'>
                        <label>Zip Code:<input type="text"></input></label>
                        <label>State:<input type="text"></input></label>
                    </div>
                </div>
                <div className='form-group'>
                    <div><label className='form-section-header'>Account Information</label></div>
                    <div className='form-field-group'>
                        <label>Email: <input type="text"></input></label>
                    </div>
                    <div className='form-field-group'>
                        <label>Password:<input type="text"></input></label>
                        <label>Confirm Password:<input type="text"></input></label>
                    </div>
                </div>
                <div className='form-group'>
                    <div><label className='form-section-header'>Email Preference</label></div>
                    <div className='form-field-group'>
                        <label>Enable email notifications for newly added profiles: </label>
                        <input type="checkbox"></input>
                    </div>
                </div>
                <div className='submit-btn-block'><input className="submit-btn" type="submit" value="Create Account" /></div>
            </form>
        </div>
    )
}

export default UserSignup
