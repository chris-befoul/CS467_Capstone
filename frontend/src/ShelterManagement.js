import React from 'react'
import PetList from './components/PetList'
import { Typography} from "@mui/material";

const ShelterManagement = () => {
    const pets = [
        {
            id: '1',
            name: 'Callie',
            type: 'Dog',
            availability: 'Available',
            age: 'Young',
            image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=1.00xw:0.756xh;0,0.0756xh&resize=980:*'
        },
        {
            id: '2',
            name: 'Chloe',
            type: 'Dog',
            availability: 'Pending',
            age: 'Adult',
            image: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg'
        },
        {
            id: '3',
            name: 'Jackie',
            type: 'Dog',
            availability: 'Adopted',
            age: 'Puppy',
            image: 'https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg'
        }
    ];

    return (
        <div>
            <div style={{textAlign: 'center', paddingTop: 20, marginBottom: 50}}>
                <Typography gutterBottom variant="h5" component="div">
                    Shelter Management
                </Typography>
            </div>
            <PetList pets={pets}/>
        </div>
    )
}

export default ShelterManagement
