import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./createPet.css";



const petAvailabitiy = ['Available', 'Not Availabe', 'Pending', 'Adopted'];
const breeds = {
    dog: ['Golden Retriever', 'German Shepard', 'Beagle', 'Poodle', 'Australian Shepard', 'Pug', 'Chihuahua', 'Dalmatian', 'Bulldog', 'French Bulldog', 'Pit Bull', 'Other'],
    cat: ['Maine Coon', 'Siamese', 'British Shorthair', 'Chartreux', 'Selkirk Rex', 'Munchkin', 'Himalayan', 'Scottish Fold', 'Sphynx', 'Other'],
    other: ['Other']
};
const ages = ['Puppy/Kitten/Baby', 'Young', 'Adult', 'Senior'];


const CreatePetFormPage = () => {
    const [petType, setType] = React.useState("dog");
    const [petName, setName] = React.useState('');
    const [petBreed, setBreed] = React.useState('Golden Retriever');
    const [petAvail, setAvail] = React.useState('Available');
    const [petSex, setSex] = React.useState(false);
    const [petAge, setAge] = React.useState('Puppy/Kitten/Baby');
    const [petDescript, setDescript] = React.useState('');
    const [petWeight, setWeight] = React.useState(0);
    const [petDisp, setDisp] = React.useState([]);
    const [petPhoto, setPhoto] = React.useState(null);
    const [petUrl, setUrl] = React.useState();
    const [navigate, setNavigate] = React.useState(false);

    const travel = useNavigate();

    const dispositionChange = (event) => {
        var tempDisp = petDisp;
        if (!tempDisp.includes(event.target.value)) {
            tempDisp.push(event.target.value);
            return setDisp(tempDisp);
        }
        var index = tempDisp.indexOf(event.target.value);
        tempDisp.splice(index, 1);
        return setDisp(tempDisp);
    }

    const addPhoto = (e) => {
        return setPhoto(e.target.files);
    }

    const formData = {
        name: petName,
        type: petType,
        breed: petBreed,
        availability: petAvail,
        sex: JSON.parse(petSex),
        age: petAge,
        weight: petWeight,
        disposition: petDisp,
        description: petDescript,
        shelter_id: 52
    }

    const submitProfile = async (e) => {
        e.preventDefault();

        const types = ['image/png', 'image/jpeg'];

        const formPhoto = new FormData();
        for(var x = 0; x<petPhoto.length; x++) {
            if (!types.every(value => petPhoto[x].type !== value)) {
                formPhoto.append('file', petPhoto[x]);
            }
        }
        formPhoto.append('data', JSON.stringify(formData));

        await axios.post('http://localhost:8080/pets/createPetProfile', formPhoto).then( data => {
            const id = data.data.id;
            alert('Your new pet profile has been created!');
            setUrl('/pets/viewProfile/' + id);
            setNavigate(true);
        });
        return;
    }

    if(navigate) {
        travel(petUrl);
        window.location.reload();
    }
    
    return (
        <div id='petBox'>
        <form id='petForm' name='petForm' onSubmit={submitProfile}>
            <label>Pet's Name: </label>
                <input required type='text' name='name' id='name' onChange={e => setName(e.target.value)}/> 
            <br/>
            <label>Pet Type: </label>
                <select onChange={e => {setType(e.target.value); setBreed(breeds[e.target.value][0])}} name='type'>
                    <option value='dog'>Dog</option>
                    <option value='cat'>Cat</option>
                    <option value='other'>Other</option>
                </select>
            <label>Breed: </label>
                <select name='breed' onChange={e => setBreed(e.target.value)} >{breeds[petType].map((x) => {return <option>{x}</option>})}</select> 
            <br />
            <label>Availability: </label>
                <select name='availability' onChange={e => setAvail(e.target.value)} >{petAvailabitiy.map((x) => {return <option>{x}</option>})}</select>
            <label>Sex: </label>
                <select name='sex' onChange={e => setSex(e.target.value)}>
                    <option value={false}>Male</option>
                    <option value={true}>Female</option>
                </select>
            <br />
            <div id='age-weight'>
            <label>Age: </label>
                <select name='age' onChange={e => setAge(e.target.value)} >{ages.map((x) => {return <option>{x}</option>})}</select>
            <label>Weight: </label> 
                <input required type='number' name='weight' placeholder={0} onChange={e => setWeight(e.target.value)} /> <span>lbs.</span>
            </div>
            <br />
            <div id='dispositionBox'>
                <label>Disposition: </label>
                    <div id='disposition'>
                        <label id='dispositionLabel'>Good with other animals</label>
                            <input type='checkbox' value='Good with other animals' name='disposition' onChange={dispositionChange} />
                        <label id='dispositionLabel'>Good with children</label>
                            <input type='checkbox' value='Good with children' name='disposition' onChange={dispositionChange} />
                        <br/>
                        <label id='dispositionLabel'>Animal must be leashed at all times</label>
                            <input type='checkbox' value='Animal must be leashed at all times' name='disposition' onChange={dispositionChange} />
                        <label id='dispositionLabel'>Very Active</label>
                            <input type='checkbox' value='Very Active' name='disposition' onChange={dispositionChange}/>
                    </div>
            </div>
            <br/>
            <div id='descriptionBox'>
                <label>Description: </label>
                    <br />
                    <textarea required type='text' maxLength={280} name='description' id='description' placeholder='(280 Character Limit)' onChange={e => setDescript(e.target.value)}></textarea>
            </div>
            <br />
            <div id='photoBox'>
                <label>Upload Pet Photo: </label>
                    <input required type='file' name='petPhoto' id='petPhoto'  onChange={addPhoto} accept='image/jpeg, image/png' multiple/>
            </div>
            <br />
            <input type='submit' value='Save Profile' id='save'/>
        </form>
        </div>
    )
}

export default CreatePetFormPage;