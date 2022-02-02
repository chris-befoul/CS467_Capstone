import React, { useState, useEffect } from 'react';

const Home = () => {

    const [name, setName] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/user', {
            headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'},
            credentials: 'include',
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                const fullName = (data.first_name + ' ' + data.last_name);
                setName(fullName);
            })
    }, []);

    // {name ? 'I am' + name : 'You are not currently authenticated'}
    return ( 
        <div>
            <h1>Home</h1>
            <div>{name ? name : 'You are not logged in'}</div>
        </div>
     );
}
 
export default Home;