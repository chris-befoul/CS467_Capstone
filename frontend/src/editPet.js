import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./components/Navbar";
import axios from 'axios';


const petAvailabitiy = ['Available', 'Not Availabe', 'Pending', 'Adopted'];
const breeds = {
    dog: ['Golden Retriever', 'German Shepard', 'Beagle', 'Poodle', 'Australian Shepard', 'Pug', 'Chihuahua', 'Dalmatian', 'Bulldog', 'French Bulldog', 'Pit Bull', 'Other'],
    cat: ['Maine Coon', 'Siamese', 'British Shorthair', 'Chartreux', 'Selkirk Rex', 'Munchkin', 'Himalayan', 'Scottish Fold', 'Sphynx', 'Other'],
    other: ['Other']
}


const CreatePetFormPage = () => {
    const [petData, setData] = React.useState({});
    const [petType, setType] = React.useState("dog");
    const [petName, setName] = React.useState('');
    const [petBreed, setBreed] = React.useState('Golden Retriever');
    const [petAvail, setAvail] = React.useState('Available');
    const [petSex, setSex] = React.useState(false);
    const [petAge, setAge] = React.useState([0,0]);
    const [petDescript, setDescript] = React.useState('');
    const [petWeight, setWeight] = React.useState(0);
    const [petDisp, setDisp] = React.useState([]);
    const [petPhoto, setPhoto] = React.useState(null);
    const [isFilePicked, setIsFilePicked] = React.useState(false);

    React.useEffect(() => {
        axios.get('http://localhost:8080/' + petID).then(data => {
            setData(data);
            setName(data.name);
            setSex(data.sex);
            setType(data.type);
            setWeight(data.weight);
            setDescript(data.description);
            setDisp(data.disposition);
            setBreed(data.breed);
            setAvail(data.available);
            setAge(data.age);
            return;
        })
    });
  
    const monthChange = (event) => {
        var tempAge = petAge;
        tempAge[1] = JSON.parse(event.target.value);
        return setAge(tempAge);
    }

    const yearChange = (event) => {
        var tempAge = petAge;
        tempAge[0] = JSON.parse(event.target.value);
        return setAge(tempAge);
    }

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
        setPhoto(e.target.files[0]);
        return setIsFilePicked(true);
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
        shelter_id: 52,
        petPhoto: petPhoto
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
        const petServer = {petProfile: formData}

        const formPhoto = new FormData();
        formPhoto.append('file', petPhoto);
        formPhoto.append('data', JSON.stringify(formData));

        await axios.patch('http://localhost:8080/' + formData.id, formPhoto);
    }
    
    return (
        <div>
            <Navbar />
            <form id='petForm' name='petForm' onSubmit={submitProfile}>
                <label>Pet's Name: </label>
                    <input required type='text' name='name' value={petData.name} onChange={e => setName(e.target.value)}/> 
                <br/>
                <label>Pet Type: </label>
                    <select value={petData.type} onChange={e => {setType(e.target.value); setBreed(breeds[e.target.value][0])}} name='type'>
                        <option value='dog'>Dog</option>
                        <option value='cat'>Cat</option>
                        <option value='other'>Other</option>
                    </select>
                <label>Breed: </label>
                    <select name='breed' value={petData.breed} onChange={e => setBreed(e.target.value)} >{breeds[petType].map((x) => {return <option>{x}</option>})}</select> 
                <br />
                <label>Availability: </label>
                    <select name='availability' value={petData.availability} onChange={e => setAvail(e.target.value)} >{petAvailabitiy.map((x) => {return <option>{x}</option>})}</select>
                <label>Sex: </label>
                    <select name='sex' value={petData.sex} onChange={e => setSex(e.target.value)}>
                        <option value={false}>Male</option>
                        <option value={true}>Female</option>
                    </select>
                <label>Age:</label> 
                    <label>Years: </label>
                        <input required type='number' name='years' value={petData.age[0]} onChange={yearChange} />
                    <label>Months:</label>
                        <input required type='number' name='months' value={petData.age[1]} onChange={monthChange} />
                <label>Weight: </label> 
                    <input required type='number' name='weight' value={petData.weight} onChange={e => setWeight(e.target.value)} /> 
                <label></label>
                <br />
                <label>Disposition: </label>
                <br/>
                    <label>Good with other animals</label>
                        {checkGoodWithAnimals}
                        {/* <input type='checkbox' value='Good with other animals' name='disposition' onChange={dispositionChange} /> */}
                    <label>Good with children </label>
                        {checkGoodWithChildren}
                        {/* <input type='checkbox' value='Good with children' name='disposition' onChange={dispositionChange} /> */}
                    <label>Animal must be leashed at all times </label>
                        {checkNeedsLeash}
                        {/* <input type='checkbox' value='Animal must be leashed at all times' name='disposition' onChange={dispositionChange} /> */}
                    <label>Very Active </label>
                        {checkVeryActive}
                        {/* <input type='checkbox' value='Very Active' name='disposition' onChange={dispositionChange}/> */}
                <br/>
                <label>Description: </label>
                    <input required type='text' maxLength={280} name='description' value={petData.description} onChange={e => setDescript(e.target.value)} /> 
                <br />
                <label>Upload Pet Photo: </label>
                    <input required type='file' name='petPhoto'  onChange={addPhoto} accept='image/jpeg, image/png'/>
                <br />
                <input type='submit' value='Save Profile' />
            </form>
        </div>
    )
}

ReactDOM.render(<CreatePetFormPage />, document.getElementById("root"));

export default CreatePetFormPage;