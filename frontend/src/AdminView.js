import React from 'react';
import axios from 'axios';
import { 
    Grid, 
    Typography, 
    Button, 
    FormControl, 
    FormControlLabel, 
    Paper, 
    Container, 
    Radio, 
    RadioGroup
} from "@mui/material";


const AdminViewPage = () => {
    const [userList, setUsers] = React.useState([]);
    const [filter, setFilter] = React.useState('All');
    const fetchURL = 'http://localhost:8080';
    // const fetchURL = 'https://cs467-sandbox.ue.r.appspot.com';
    // const fetchURL = 'https://capstone-animal-adoption-app.wl.r.appspot.com';

    React.useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async() => {
        await axios.get(fetchURL + '/api/').then((res) => {
            setUsers(res.data);
        })
    }
    

    const deleteUser = async (e, user) => {
        e.preventDefault();
        if(window.confirm("Are you sure you want to delete this " + user.type + " profile?")) {
            await axios.delete(fetchURL + '/api/admin/' + user.id, {withCredentials: true}).then((res) => {
                if(res.status === 204) {
                    alert(user.type + " profile has been removed from site.");
                    getUsers();
                }
                else {
                    alert("Something went wrong with profile deletion please try again and it it persists contact admin.")
                }
            });
        }
        else {
            console.log(user.type + " profile not deleted");
        }
    }

    const BuildUsers = () => {
        if(userList.length > 0) {
            return (
                <div>
                    {userList.map((user) => {
                        if(filter === 'User') {
                            return (user.type === 'User') ? <UserInfo user={user} key={user.id}/> : null
                        } 
                        else if(filter === 'Shelter') {
                            return (user.type === 'Shelter') ? <UserInfo user={user} key={user.id}/> : null
                        }
                        else if(filter === 'Admin') {
                            return (user.type === 'Admin') ? <UserInfo user={user} key={user.id}/> : null
                        }
                        else {
                            return <UserInfo user={user} key={user.id}/>
                        }
                    })}
                </div>
            )
        }
        return <p>No Users Availabe</p>
    }

    const ShelterName = ({shelter}) => {
        return (
            <Typography variant="body1">
                Shelter Name: {shelter.shelter_name}
            </Typography>
        )
    }

    const UserName = ({user}) => {
        return (
            <Typography variant="body1">
                Name:   {user.first_name} {user.last_name}
            </Typography>
        )
    }

    const UserInfo = ({user}) => {
        var userName = true;
        if(user.type === "Shelter") {
            userName = false
        } 
        return (    
                <Grid paddingY={2}>
                    <Paper>
                        <Grid container p={5}>
                            <Grid item xs={11}>
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
                            <Grid item xs={1} justifyContent="center" alignItems="center">
                                <Grid p={2} >
                                    <Button variant="contained" color="error" onClick={(e) => {deleteUser(e, user)}}>Delete</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            )
    }

    const userFilter = (e) => {
        setFilter(e.target.value)
    }

    const FilterBox = () => {
        return (
                <Grid >
                    <Typography variant='h6'>
                        Filter Users
                    </Typography>
                    <Grid paddingY={2}>
                        <FormControl>
                            <RadioGroup
                                defaultValue={filter}
                                onChange={userFilter}
                            >
                                <FormControlLabel value="All" control={<Radio />} label="All" />
                                <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                                <FormControlLabel value="Shelter" control={<Radio />} label="Shelter" />
                                <FormControlLabel value="User" control={<Radio />} label="User" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
        )
    }

    return (
        <div>
            <Grid sx={{ p: 1 }}>
                <Container maxWidth='xl' >
                    <Grid container >
                        <Grid item md={1}>
                            <FilterBox />
                        </Grid>
                        <Grid item md={11}>
                            <BuildUsers />
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </div>
    )
}

export default AdminViewPage;