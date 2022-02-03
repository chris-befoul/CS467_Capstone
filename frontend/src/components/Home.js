import React from 'react';

const Home = (props) => {
    
    const name = props.name;
    let elem;
    if (name === '') {
        elem = (
            'You are not logged in!'
        );
    } else {
        elem = name;
    }
    return ( 
        <div>
            <h1>Home</h1>
            <div>{elem}</div>
        </div>
     );
}
 
export default Home;