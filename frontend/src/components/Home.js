import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Button, Container , Grid, Card, CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';

const Home = (props) => {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#1473f0'
            },
            background: {
                main: '#f0f4fc'
            },
        },
        spacing: 4,
    })

    // let button = (
    //     <Button variant="contained" color="primary">Search Pets</Button>
    // )
    
    const name = props.name;
    let greeting;
    if (name !== '') {
        greeting = ('Welcome ' + name);
    }

    const [pet1Name, setPet1Name] = useState('');       
    const [pet1Desc, setPet1Desc] = useState('');
    const [pet1Photo, setPet1Photo] = useState('');
    const [pet2Name, setPet2Name] = useState('');      
    const [pet2Desc, setPet2Desc] = useState('');
    const [pet2Photo, setPet2Photo] = useState('');
    const [pet3Name, setPet3Name] = useState('');      
    const [pet3Desc, setPet3Desc] = useState('');
    const [pet3Photo, setPet3Photo] = useState('');
    const [pet4Name, setPet4Name] = useState('');       
    const [pet4Desc, setPet4Desc] = useState('');
    const [pet4Photo, setPet4Photo] = useState('');
    const fetchURL = 'http://localhost:8080/pets/';
    const photoURL = 'https://storage.googleapis.com/pet_profile_photos_cs467/';       // Vincent's cloud storage
    // const photoURL = 'https://storage.googleapis.com/pet_profile_photo/';       // Chris's cloud storage
    const petURL = '/pets/viewProfile/';
    const browseURL = '/browse';
    
    const pet1 = '5655374346584064';        // Daisy
    const pet2 = '5066704988143616';        // Cooper
    const pet3 = '5689540979195904';        // Bailey
    const pet4 = '5722267187150848';        // Buddy

    const requests = [
        fetchURL+pet1, fetchURL+pet2, fetchURL+pet3, fetchURL+pet4
    ]

    useEffect(() => {
        getPetData(requests);
    },[]);

    // const getPetData = () => {
    //     Promise.all(requests.map((request) => axios.get(request)))
    //     .then(
    //         (data) => console.log(data),
    //     );
    // }

    const getPetData = async () => {
        try {
            const res = await Promise.all([
                fetch(requests[0],{headers: {'Access-Control-Allow-Origin': '*', 'Content-Type' : 'application/xml'}})
                , fetch(requests[1]), fetch(requests[2]), fetch(requests[3])
            ]);
            const data = await Promise.all(res.map(r => r.json()));

            const responseOne = data[0];
            const responseTwo = data[1];
            const responseThree = data[2];
            const responseFour = data[3];

            setPet1Name(responseOne.data.name);
            setPet1Desc(responseOne.data.description);
            setPet1Photo(responseOne.photos[0].name);

            setPet2Name(responseTwo.data.name);
            setPet2Desc(responseTwo.data.description);
            setPet2Photo(responseOne.photos[0].name);

            setPet3Name(responseThree.data.name);
            setPet3Desc(responseThree.data.description);
            setPet3Photo(responseOne.photos[0].name);

            setPet4Name(responseFour.data.name);
            setPet4Desc(responseFour.data.description);
            setPet4Photo(responseOne.photos[0].name);
        } catch {
            throw Error("Promise failed.");
        }
    };

    const travel = useNavigate();

    const toTravel = (URL) => {
        travel(URL);
    }

    return ( 
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Grid sx={{ p: 4 }}/>
                <Container maxWidth='xl'>
                    <Grid container justifyContent="space-evenly">
                        <Grid item md={10} />
                        <Grid item md={2}>
                            <p>{greeting}</p>                    
                        </Grid>
                    </Grid>
                </Container>
                <Container maxWidth='xl'> 
                    <Grid container justifyContent="space-evenly"  alignItems="center">
                        <Grid item md={5}>
                            <img className="image" src="../../dog_human.jpeg" alt="" width="575"></img> 
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
                    <br/>
                    <br/>
                <Grid backgroundColor='background.main'>
                    <Container maxWidth='xl'>
                        <h2>Featured Pets</h2>    
                        <Grid container  justifyContent="space-evenly" alignItems="stretch">
                            <Grid item component={Card} xs sx={{ m: 2 }}>
                                <CardActionArea onClick={() => {toTravel(petURL+pet1)}}>
                                    <CardMedia
                                        component="img"
                                        height="150"
                                        image={photoURL+pet1Photo}
                                        alt=""
                                    />
                                    <CardContent>
                                        <p>
                                        {pet1Name}
                                        </p>
                                        <p>
                                        {pet1Desc}
                                        </p>
                                    </CardContent>
                                </CardActionArea>
                            </Grid>
                            <Grid item component={Card} xs sx={{ m: 2 }}>
                                <CardActionArea onClick={() => {toTravel(petURL+pet2)}}>
                                    <CardMedia
                                        component="img"
                                        height="150"
                                        image={photoURL+pet2Photo}
                                        alt=""
                                    />
                                    <CardContent>
                                        <p>
                                        {pet2Name}
                                        </p>
                                        <p>
                                        {pet2Desc}
                                        </p>
                                    </CardContent>
                                </CardActionArea>
                            </Grid>
                            <Grid item component={Card} xs sx={{ m: 2 }}>
                                <CardActionArea onClick={() => {toTravel(petURL+pet3)}}>
                                    <CardMedia
                                        component="img"
                                        height="150"
                                        image={photoURL+pet3Photo}
                                        alt=""
                                    />
                                    <CardContent>
                                        <p>
                                        {pet3Name}
                                        </p>
                                        <p>
                                        {pet3Desc}
                                        </p>
                                    </CardContent>
                                </CardActionArea>
                            </Grid>
                            <Grid item component={Card} xs sx={{ m: 2 }}>
                                <CardActionArea onClick={() => {toTravel(petURL+pet4)}}>
                                    <CardMedia
                                        component="img"
                                        height="150"
                                        image={photoURL+pet4Photo}
                                        alt=""
                                    />
                                    <CardContent>
                                        <p>
                                        {pet4Name}
                                        </p>
                                        <p>
                                        {pet4Desc}
                                        </p>
                                    </CardContent>
                                </CardActionArea>
                            </Grid>
                        </Grid>
                        <br/>
                        <br/>
                    </Container>
                </Grid>
                <Container maxWidth="xl">
                    <Grid sx={{ p: 2 }}/>
                    <h2>Testimonials</h2>   
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