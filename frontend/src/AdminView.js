import React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Grid, Paper, Typography, ButtonBase, Button } from "@mui/material";


const AdminViewPage = () => {
    const [userList, setUsers] = React.useState([]);
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
            return (<div>
                {userList.map((user) => {
                if(user.type == "User") {
                    return <UserInfo user={user} key={user.id}/>
                }
                else if (user.type == "Shelter") {
                    return <ShelterInto shelter={user} key={user.id} />
                }
            })}
            </div>)
        }
        return <p>No Users Availabe</p>
    }

    const ShelterInto = ({shelter}) => {
        return <Paper>
            <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
            <Typography gutterBottom variant="h5" component="div">
                    {shelter.type}
                </Typography>
            <Typography variant="body1">
                                Shelter Name: {shelter.shelter_name}
                            </Typography>
                            <Typography variant="body1">
                                Location: {shelter.city}, {shelter.state} {shelter.zip_code}
                            </Typography>
                            <Typography variant="body1">
                                Email: {shelter.email}
                            </Typography>
                            <Typography variant="body1">
                                Phone: {shelter.phone}
                            </Typography>
                            </Grid>
                            </Grid>
                            <Grid item xs={3} container direction="column" justifyContent="center" alignItems="center">
                        <Grid item p={2}>
                            <Button variant="contained" color="error">Delete</Button>
                        </Grid>
                    </Grid>
                            </Grid>

        </Paper>
    }

    const UserInfo = ({user}) => {
        return <Paper>
            <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
            <Typography gutterBottom variant="h5" component="div">
                    {user.type}
                </Typography>
            <Typography variant="body1">
                                Name:   {user.first_name} {user.last_name}
                            </Typography>
                            <Typography variant="body1">
                                Location:   {user.city}, {user.state} {user.zip_code}
                            </Typography>
                            <Typography variant="body1">
                                Email:  {user.email}
                            </Typography>
                            <Typography variant="body1">
                                Phone:  {user.phone}
                            </Typography>
                            </Grid>
                            </Grid>
                            <Grid item xs={3} container direction="column" justifyContent="center" alignItems="center">
                        <Grid item p={2}>
                            <Button variant="contained" color="error">Delete</Button>
                        </Grid>
                    </Grid>
                    </Grid>
        </Paper>
    }

    return (
        <BuildUsers />
    )
}

export default AdminViewPage;