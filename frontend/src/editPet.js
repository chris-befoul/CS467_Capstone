import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import "./editPet.css";


const petAvailabitiy = ['Available', 'Not Availabe', 'Pending', 'Adopted'];
const breeds = {
    dog: ['Golden Retriever', 'German Shepard', 'Beagle', 'Poodle', 'Australian Shepard', 'Pug', 'Chihuahua', 'Dalmatian', 'Bulldog', 'French Bulldog', 'Pit Bull', 'Other'],
    cat: ['Maine Coon', 'Siamese', 'British Shorthair', 'Chartreux', 'Selkirk Rex', 'Munchkin', 'Himalayan', 'Scottish Fold', 'Sphynx', 'Other'],
    other: ['Other']
}
const ages = ['Puppy/Kitten/Baby', 'Young', 'Adult', 'Senior'];


const EditPetProfile = () => {
    const [petID, setID] = React.useState('5726966351134720');
    const [petData, setData] = React.useState({});
    const [petType, setType] = React.useState('other');
    const [petName, setName] = React.useState(null);
    const [petBreed, setBreed] = React.useState(null);
    const [petAvail, setAvail] = React.useState(null);
    const [petSex, setSex] = React.useState(null);
    const [petAge, setAge] = React.useState(null);
    const [petDescript, setDescript] = React.useState(null);
    const [petWeight, setWeight] = React.useState(null);
    const [petDisp, setDisp] = React.useState([]);
    const [petPhoto, setPhoto] = React.useState(null);

    React.useEffect(() => {
        getPetData(petID);
    }, [petID]);

    const getPetData = async (petID) => {
        const petURL = 'http://localhost:8080/pets/' + petID;
        await axios.get(petURL).then(res => {
            console.log(res.data);
            setData(res.data);
            setName(res.data.name);
            setSex(res.data.sex);
            setType(res.data.type);
            setWeight(res.data.weight);
            setDescript(res.data.description);
            setDisp(res.data.disposition);
            setBreed(res.data.breed);
            setAvail(res.data.available);
            setAge(res.data.age);
            return;
        })
    }

    const dispositionChange = (event) => {
        var tempDisp = petDisp;
        if (!tempDisp.includes(event.target.value)) {
            tempDisp.push(event.target.value);
            return setDisp(tempDisp);
        }
        var index = tempDisp.indexOf(event.target.value);
        tempDisp.splice(index, 1);
        console.log(tempDisp);
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
        shelter_id: 52
    }

    const checkGoodWithChildren = () => {
        if (petData.includes('Good with Children')) {
            return <input type='checkbox' value='Good with children' name='disposition' onChange={dispositionChange} checked/>
        }
        else {
            return <input type='checkbox' value='Good with children' name='disposition' onChange={dispositionChange} />
        }
    }

    const checkGoodWithAnimals = () => {
        if (petData.includes('Good with other animals')) {
            return <input type='checkbox' value='Good with other animals' name='disposition' onChange={dispositionChange} checked/>
        }
        else {
            return <input type='checkbox' value='Good with other animals' name='disposition' onChange={dispositionChange} />
        }
    }

    const checkNeedsLeash = () => {
        if (petData.includes('Animal must be leashed at all times')) {
            return <input type='checkbox' value='Animal must be leashed at all times' name='disposition' onChange={dispositionChange} checked/>
        }
        else {
            return <input type='checkbox' value='Animal must be leashed at all times' name='disposition' onChange={dispositionChange} />
        }
    }

    const checkVeryActive = () => {
        if (petData.includes('Very Active')) {
            return <input type='checkbox' value='Very Active' name='disposition' onChange={dispositionChange} checked/>
        }
        else {
            return <input type='checkbox' value='Very Active' name='disposition' onChange={dispositionChange}/>
        }
    }

    const submitProfile = async (e) => {
        e.preventDefault();
        const petURL = 'http://localhost:8080/pets/' + petID;

        const types = ['image/png', 'image/jpeg'];

        const formPhoto = new FormData();
        for(var x = 0; x<petPhoto.length; x++) {
            if (!types.every(value => petPhoto[x].type !== value)) {
                formPhoto.append('file', petPhoto[x]);
            }
        }
        formPhoto.append('data', JSON.stringify(formData));

        await axios.patch(petURL, formPhoto);
        alert('Your pet profile has been updated!');
    }
    
    return (
        <div>
            <form id='petForm' name='petForm' onSubmit={submitProfile}>
                <label>Pet's Name: </label>
                    <input required type='text' name='name' defaultValue={petName} onChange={e => setName(e.target.value)}/> 
                <br/>
                <label>Pet Type: </label>
                    <select name='type' defaultValue={petType} onChange={e => {setType(e.target.value); setBreed(breeds[e.target.value][0])}}>
                        <option value='dog'>Dog</option>
                        <option value='cat'>Cat</option>
                        <option value='other'>Other</option>
                    </select>
                <label>Breed: </label>
                    <select name='breed' defaultValue={petBreed} onChange={e => setBreed(e.target.value)} >{breeds[petType].map((x) => {return <option>{x}</option>})}</select> 
                <br />
                <label>Availability: </label>
                    <select name='availability' defaultValue={petAvail} onChange={e => setAvail(e.target.value)} >{petAvailabitiy.map((x) => {return <option>{x}</option>})}</select>
                <label>Sex: </label>
                    <select name='sex' defaultValue={petSex} onChange={e => setSex(e.target.value)}>
                        <option value={false}>Male</option>
                        <option value={true}>Female</option>
                    </select>
                <div id='age-weight'>
                    <label>Age: </label>
                        <select name='age' defaultValue={petAge} onChange={e => setAge(e.target.value)} >{ages.map((x) => {return <option>{x}</option>})}</select>
                    <label>Weight: </label> 
                        <input required type='number' name='weight' defaultValue={petWeight} onChange={e => setWeight(e.target.value)} /> <span>lbs.</span>
                </div>
                <br />
                <div id='dispositionBox'>
                <label>Disposition: </label>
                    <div id='disposition'>
                        <label>Good with other animals</label>
                            {/* {checkGoodWithAnimals} */}
                            <input type='checkbox' value='Good with other animals' name='disposition' onChange={dispositionChange} defaultChecked={petDisp.includes('Good with other animals')}/>
                        <label>Good with children </label>
                            {/* {checkGoodWithChildren} */}
                            <input type='checkbox' value='Good with children' name='disposition' onChange={dispositionChange} defaultChecked={petDisp.includes('Good with children')}/>
                        <label>Animal must be leashed at all times </label>
                            {/* {checkNeedsLeash} */}
                            <input type='checkbox' value='Animal must be leashed at all times' name='disposition' onChange={dispositionChange} defaultChecked={petDisp.includes('Animal must be leashed at all times')}/>
                        <label>Very Active </label>
                            {/* {checkVeryActive} */}
                            <input type='checkbox' value='Very Active' name='disposition' onChange={dispositionChange} defaultChecked={petDisp.includes('Very Active')}/>
                    </div>
                </div>
                <br/>
                <div id='descriptionBox'>
                <label>Description: </label>
                    <br />
                    <textarea required type='text' maxLength={280} name='description' id='description' defaultValue={petDescript} onChange={e => setDescript(e.target.value)}></textarea>
                </div>
                <br />
                <div id='photoBox'>
                    <label>Upload Pet Photo: </label>
                        <input required type='file' name='petPhoto' id='petPhoto'  onChange={addPhoto} accept='image/jpeg, image/png' multiple/>
                </div>
                <br />
                <input type='submit' value='Save Profile' />
            </form>
        </div>
    )
}

ReactDOM.render(<EditPetProfile />, document.getElementById("root"));

export default EditPetProfile;