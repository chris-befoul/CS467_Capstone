import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./createPet.css";



const petAvailabitiy = ['Available', 'Not Availabe', 'Pending', 'Adopted'];
const breeds = {
    Dog: ['Golden Retriever', 'German Shepard', 'Beagle', 'Poodle', 'Australian Shepard', 'Pug', 'Chihuahua', 'Dalmatian', 'Bulldog', 'French Bulldog', 'Pit Bull', 'Other'],
    Cat: ['Maine Coon', 'Siamese', 'British Shorthair', 'Chartreux', 'Selkirk Rex', 'Munchkin', 'Himalayan', 'Scottish Fold', 'Sphynx', 'Other'],
    Other: ['Other']
};
const ages = ['Puppy/Kitten/Baby', 'Young', 'Adult', 'Senior'];


const CreatePetFormPage = () => {
    const [petType, setType] = React.useState("Dog");
    const [petName, setName] = React.useState('');
    const [petBreed, setBreed] = React.useState('Golden Retriever');
    const [petAvail, setAvail] = React.useState('Available');
    const [petSex, setSex] = React.useState("Male");
    const [petAge, setAge] = React.useState('Puppy/Kitten/Baby');
    const [petDescript, setDescript] = React.useState('');
    const [petWeight, setWeight] = React.useState(0);
    const [petDisp, setDisp] = React.useState([]);
    const [petPhoto, setPhoto] = React.useState(null);
    const [shelterID, setID] = React.useState(null);
    const [petUrl, setUrl] = React.useState();
    const [navigate, setNavigate] = React.useState(false);

    const travel = useNavigate();
    // const fetchURL = 'http://localhost:8080';
    // const fetchURL = 'https://cs467-sandbox.ue.r.appspot.com';
    const fetchURL = 'https://capstone-animal-adoption-app.wl.r.appspot.com';

    React.useEffect(() => {
        fetch(fetchURL + '/api/user', { method: 'GET', credentials: 'include'}).then( res => res.json()).then( data => {
            const userInfo= data;
            setID(userInfo.id);
        });
      }, []);

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
        sex: petSex,
        age: petAge,
        weight: petWeight,
        disposition: petDisp,
        description: petDescript,
        shelter_id: shelterID
    }

    const submitProfile = async (e) => {
        e.preventDefault();

        const types = ['image/png', 'image/jpeg'];

        const formPhoto = new FormData();
        for(var x = 0; x < petPhoto.length; x++) {
            if (!types.every(value => petPhoto[x].type !== value)) {
                formPhoto.append('file', petPhoto[x]);
            }
        }
        formPhoto.append('data', JSON.stringify(formData));

        await axios.post(fetchURL + '/pets/createProfile', formPhoto).then( data => {
            const id = data.data.id;
            alert('Your new pet profile has been created!');
            setUrl('/pets/viewProfile/' + id);
            setNavigate(true);
        });
        return;
    }

    React.useEffect(() => {
        if(navigate) {
            travel(petUrl);
        }
      }, [navigate]);
      
    // if(navigate) {
    //     travel(petUrl);
    //     // window.location.reload();
    // }
    
    return (
        <div id='petBox'>
        <form id='petForm' name='petForm' onSubmit={submitProfile}>
            <label id='create-label'>Pet's Name: </label>
                <input required type='text' name='name' id='name' onChange={e => setName(e.target.value)}/> 
            <br/>
            <label id='create-label'>Pet Type: </label>
                <select id='create-select' onChange={e => {setType(e.target.value); setBreed(breeds[e.target.value][0])}} name='type'>
                    <option value='Dog'>Dog</option>
                    <option value='Cat'>Cat</option>
                    <option value='Other'>Other</option>

                </select>
            <label id='create-label'>Breed: </label>
                <select id='create-select' name='breed' onChange={e => setBreed(e.target.value)} >{breeds[petType].map((x) => {return <option key={x}>{x}</option>})}</select> 
            <br />
            <label id='create-label'>Availability: </label>
                <select id='create-select' name='availability' onChange={e => setAvail(e.target.value)} >{petAvailabitiy.map((x) => {return <option key={x}>{x}</option>})}</select>
            <label id='create-label'>Sex: </label>
                <select id='create-select' name='sex' onChange={e => setSex(e.target.value)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            <br />
            <div id='age-weight'>
            <label id='create-label'>Age: </label>
                <select id='create-select' name='age' onChange={e => setAge(e.target.value)} >{ages.map((x) => {return <option key={x}>{x}</option>})}</select>
            <label id='create-label'>Weight: </label> 
                <input required type='number' name='weight' placeholder={0} onChange={e => setWeight(e.target.value)} /> <span>lbs.</span>
            </div>
            <br />
            <div id='dispositionBox'>
                <label id='create-label'>Disposition: </label>
                <br />

                    <div id='disposition'>
                        <label id='dispositionLabel'>Good with other animals</label>
                            <input type='checkbox' value='Good with other animals' name='disposition'  id='disp-check' onChange={dispositionChange} />
                        <label id='dispositionLabel-right'>Good with children</label>
                            <input type='checkbox' value='Good with children' name='disposition' id='disp-check' onChange={dispositionChange} />
                        <br/>
                        <label id='dispositionLabel'>Animal must be leashed at all times</label>
                            <input type='checkbox' value='Animal must be leashed at all times' id='disp-check' name='disposition' onChange={dispositionChange} />
                        <label id='dispositionLabel-right'>Very Active</label>
                            <input type='checkbox' value='Very Active' name='disposition' id='disp-check' onChange={dispositionChange}/>
                    </div>
            </div>
            <br/>
            <div id='descriptionBox'>
            <br />
                <label id='create-label'>Description: </label>
                    <br />
                    <textarea required type='text' maxLength={280} name='description' id='create-description' placeholder='(280 Character Limit)' onChange={e => setDescript(e.target.value)}></textarea>
            </div>
            <br />
            <div id='photoBox'>
                <label id='create-label'>Upload Pet Photo: </label>
                    <input required type='file' id='photo-upload'  onChange={addPhoto} accept='image/jpeg, image/png' multiple/>
            </div>
            <br />
            <input type='submit' value='Save Profile' id='create-save'/>
        </form>
        </div>
    )
}

export default CreatePetFormPage;