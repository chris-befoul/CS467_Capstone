import React from 'react';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Container, Grid} from '@mui/material';
import './Home.css';
import FeaturedPet from './FeaturedPet';



const Home = (props) => {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#1473f0'
            }
        }
    })

    let button = (
        <Button variant="contained" color="primary">Search Pets</Button>
    )
    
    const name = props.name;
    let elem;
    if (name !== '') {
        elem = ('Welcome ' + name);
    }

    return ( 
        <div>
            <ThemeProvider theme={theme}>
                <Container maxWidth='xl'>
                    <div>{elem}</div>   
                    <Grid container justifyContent="space-evenly"  alignItems="center">
                        <Grid item md={5}>
                            <img className="image" src="../../dog_human.jpeg" alt="" width="550"></img> 
                        </Grid>
                        <Grid item md={7}>
                            <h1>View Our Adoptable Animals</h1>
                            <br></br>
                            <p>Ready to adopt? Check out all of our loveable animals that are ready for their forever homes!</p>
                            <br></br>
                            <br></br>
                            <br></br>
                            {button}
                        </Grid>
                    </Grid>
                    <br/>
                    <br/>
                    <h2>Featured Pets</h2>    
                    <br /> 
                    <Grid container justifyContent="space-evenly"  alignItems="center">
                        {props.featuredPets !== null 
                        ? props.featuredPets.map(pet => {
                            return <FeaturedPet pet={pet} key={pet.id}/>
                        })
                        : <>Loading...</>}
                    </Grid>
                    <br/>
                    <br/>
                    <h2>Testimonials</h2>   
                    <br/>
                    <Grid container justifyContent="space-evenly"  alignItems="center">
                        <Grid item md={3}>
                            <p>User 1</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </Grid>
                        <Grid item md={3}>
                            <p>User 2</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </Grid>
                        <Grid item md={3}>
                            <p>User 3</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </Grid>
                        <Grid item md={3}>
                            <p>User 4</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
     );
}
 
export default Home;