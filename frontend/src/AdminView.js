import React from 'react';
import axios from 'axios';
import { Grid, Typography, Button, Box } from "@mui/material";


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
                    <Grid container>
                        {/* <Grid xs={11} > */}
                            <Grid container xs={8} item >
                                <Typography gutterBottom variant="h5" component="div">
                                    {user.type}
                                </Typography>
                                <Grid container >
                                    <Grid item >
                                        {!userName ? <ShelterName shelter={user} key={user.id} /> : null}
                                        {userName ? <UserName user={user} key={user.id} /> : null}
                                    </ Grid>
                                    <Grid item >
                                        <Typography variant="body1">
                                            Location:   {user.city}, {user.state} {user.zip_code}
                                        </Typography>
                                    </ Grid>
                                    <Grid item >
                                        <Typography variant="body1">
                                            Email:  {user.email}
                                        </Typography>
                                    </ Grid>
                                    <Grid item >
                                        <Typography variant="body1">
                                            Phone:  {user.phone}
                                        </Typography>
                                    </ Grid>
                                </Grid>
                            </Grid>
                        {/* </Grid> */}
                        <Grid container item xs={2} justifyContent="center" alignItems="center">
                            <Grid p={2} >
                                <Button variant="contained" color="error">Delete</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )
    }

    const FilterBox = () => {
        return (
                <Grid item xs={2}>
                    <div >
                        <h3>Filter By Type</h3>
                        <div id='filter-box'>
                            <input type="radio" id="user" name="Type" value="User" onChange={e => setFilter(e.target.value)}/>
                            <label for="user">User</label><br />
                            <input type="radio" id="shelter" name="Type" value="Shelter" onChange={e => setFilter(e.target.value)}/>
                            <label for="shelter">Shelter</label><br />
                        </div>
                    </div>
                </Grid>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <FilterBox />
                <BuildUsers />
            </Grid>
        </Box>
    )
}

export default AdminViewPage;