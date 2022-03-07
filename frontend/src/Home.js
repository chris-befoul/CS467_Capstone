import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { Button, Container, Grid} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import FeaturedPet from './components/FeaturedPet';


const Home = (props) => {

    // let button = (
    //     <Button variant="contained" color="primary">Search Pets</Button>
    // )

    const name = props.name;
    let greeting;
    if (name !== '') {
        greeting = ('Welcome ' + name);
    }

    const browseURL = '/browse';
    const travel = useNavigate();

    const toTravel = (URL) => {
        travel(URL);
    }

    return (
        <div>
            <CssBaseline />
            <Grid sx={{ p: 4 }} />
            <Container maxWidth='xl'>
                <Grid container justifyContent="space-evenly">
                    <Grid item md={10} />
                    <Grid item md={2}>
                        <p>{greeting}</p>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth='xl'>
                <Grid container justifyContent="space-evenly" alignItems="center">
                    <Grid item md={5}>
                        <img className="image" src="../../pet_images/dog_human.jpeg" alt="" width="575"></img>
                    </Grid>
                    <Grid item md={7}>
                        <h1>View Our Adoptable Animals</h1>
                        <br></br>
                        <p>Ready to adopt? Check out all of our loveable animals that are ready for their forever homes!</p>
                        <br></br>
                        <br></br>
                        <Button variant="contained" color="primary"
                            onClick={() => {
                                toTravel(browseURL)
                            }}>
                            Search Pets</Button>
                    </Grid>
                </Grid>
            </Container>
            <br />
            <br />
            <Grid backgroundColor='background.main'>
            <Container maxWidth='xl'>
            <h2>Featured Pets</h2>
            <br />
            <Grid container justifyContent="space-evenly" alignItems="stretch">
                {props.featuredPets !== null
                    ? props.featuredPets.map(pet => {
                        return <FeaturedPet pet={pet} key={pet.id} />
                    })
                    : <>Loading...</>}
            </Grid>
            </Container>
            </Grid>
            <br />
            <br />
            <Container maxWidth='xl'>
            <h2>Testimonials</h2>
            <Grid container justifyContent="space-evenly" alignItems="center">
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
        </div >
     );
}

export default Home;