import React from 'react';
import axios from 'axios';
import { Grid, Typography, Button, Box, Paper, Container, Card } from "@mui/material";


const AdminViewPage = () => {
    const [userList, setUsers] = React.useState([]);
    const [filter, setFilter] = React.useState([]);
    const fetchURL = 'http://localhost:8080';
    // const fetchURL = 'https://cs467-sandbox.ue.r.appspot.com';
    // const fetchURL = 'https://capstone-animal-adoption-app.wl.r.appspot.com';

    React.useEffect(() => {
        axios.get(fetchURL + '/api/').then((res) => {
            setUsers(res.data);
        })
    }, [])

    const BuildUsers = () => {
        if(userList.length > 0) {
            return (
            <div>
                {userList.map((user) => {
                    return <UserInfo user={user} key={user.id}/>
            })}
            </div>)
        }
        return <p>No Users Availabe</p>
    }

    const ShelterName = ({shelter}) => {
        return <Typography variant="body1">
        Shelter Name: {shelter.shelter_name}
    </Typography>
    }

    const UserName = ({user}) => {
        return <Typography variant="body1">
        Name:   {user.first_name} {user.last_name}
    </Typography>
    }

    const UserInfo = ({user}) => {
        var userName = true;
        if(user.type == "Shelter") {
            userName = false
        } 
        return (    
                <Grid paddingY={2}>
                    <Paper>
                        <Grid container p={5}>
                            <Grid item xs={10}>
                                <Typography paddingBottom={5} gutterBottom variant="h5" component="div">
                                    {user.type}
                                </Typography>
                                <Grid container>
                                    <Grid item xs={3} >
                                        {!userName ? <ShelterName shelter={user} key={user.id} /> : null}
                                        {userName ? <UserName user={user} key={user.id} /> : null}
                                    </ Grid>
                                    <Grid item xs={3} >
                                        <Typography variant="body1">
                                            Location:   {user.city}, {user.state} {user.zip_code}
                                        </Typography>
                                    </ Grid>
                                    <Grid item xs={3} >
                                        <Typography variant="body1">
                                            Email:  {user.email}
                                        </Typography>
                                    </ Grid>
                                    <Grid item xs={3} >
                                        <Typography variant="body1">
                                            Phone:  {user.phone}
                                        </Typography>
                                    </ Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} justifyContent="center" alignItems="center">
                                <Grid p={2} >
                                    <Button variant="contained" color="error">Delete</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            )
    }

    const FilterBox = () => {
        return (
                <div >
                    <h3>Filter By Type</h3>
                    <div id='filter-box'>
                        <input type="radio" id="all" name="Type" value="All" defaultChecked onChange={e => setFilter(e.target.value)}/>
                            <label for="all">All</label><br />
                        <input type="radio" id="user" name="Type" value="User" onChange={e => setFilter(e.target.value)}/>
                            <label for="user">User</label><br />
                        <input type="radio" id="shelter" name="Type" value="Shelter" onChange={e => setFilter(e.target.value)}/>
                            <label for="shelter">Shelter</label><br />
                    </div>
                </div>
        )
    }

    return (
        <div>
            <Grid sx={{ p: 3 }}>
                <Container maxWidth='xl' >
                    <Grid container >
                        <Grid item md={2}>
                            <FilterBox />
                        </Grid>
                        <Grid item md={10}>
                            <BuildUsers />
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </div>
    )
}

export default AdminViewPage;