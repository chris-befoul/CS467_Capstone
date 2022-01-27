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
        // console.log(e.target.files);
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

    const submitProfile = async (e) => {
        e.preventDefault();
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(formData)
        // };
        const petServer = {petProfile: formData}

        const formPhoto = new FormData();
        formPhoto.append('file', petPhoto);
        formPhoto.append('data', JSON.stringify(formData));

        await axios.post('http://localhost:8080/pets/createPetProfile', formPhoto);

        // await axios.post('http://localhost:8080/pets/createPetProfile', formData).then(async response => {
        //     const data = await response.json();
        //     console.log(data)})
        //     .catch(error => { console.error('There was an error!', error)});

        // await fetch('http://localhost:8080/pets/createPetProfile', requestOptions)
        //     .then(async response => {
        //         const data = await response.json()
        //         console.log(data)})
        //     .catch(error => {console.error('There was an error!', error)});
    }
    
    return (
        <div>
            <Navbar />
            <form id='petForm' name='petForm' onSubmit={submitProfile}>
                <label>Pet's Name: </label>
                    <input required type='text' name='name' onChange={e => setName(e.target.value)}/> 
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
                <label>Age:</label> 
                    <label>Years: </label>
                        <input required type='number' name='years' onChange={yearChange} />
                    <label>Months:</label>
                        <input required type='number' name='months' onChange={monthChange} />
                <label>Weight: </label> 
                    <input required type='number' name='weight' onChange={e => setWeight(e.target.value)} /> 
                <label></label>
                <br />
                <label>Disposition: </label>
                <br/>
                    <label>Good with other animals</label>
                        <input type='checkbox' value='Good with other animals' name='disposition' onChange={dispositionChange} />
                    <label>Good with children </label>
                        <input type='checkbox' value='Good with children' name='disposition' onChange={dispositionChange} />
                    <label>Animal must be leashed at all times </label>
                        <input type='checkbox' value='Animal must be leashed at all times' name='disposition' onChange={dispositionChange} />
                    <label>Very Active </label>
                        <input type='checkbox' value='Very Active' name='disposition' onChange={dispositionChange}/>
                <br/>
                <label>Description: </label>
                    <input required type='text' maxLength={280} name='description' onChange={e => setDescript(e.target.value)} /> 
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