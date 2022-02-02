import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


const petAvailabitiy = ['Available', 'Not Availabe', 'Pending', 'Adopted'];
const breeds = {
    dog: ['Golden Retriever', 'German Shepard', 'Beagle', 'Poodle', 'Australian Shepard', 'Pug', 'Chihuahua', 'Dalmatian', 'Bulldog', 'French Bulldog', 'Pit Bull', 'Other'],
    cat: ['Maine Coon', 'Siamese', 'British Shorthair', 'Chartreux', 'Selkirk Rex', 'Munchkin', 'Himalayan', 'Scottish Fold', 'Sphynx', 'Other'],
    other: ['Other']
}
const ages = ['Puppy/Kitten/Baby', 'Young', 'Adult', 'Senior'];


const EditPetProfile = () => {
    const [petData, setData] = React.useState({});
    const [petType, setType] = React.useState(null);
    const [petName, setName] = React.useState(null);
    const [petBreed, setBreed] = React.useState(null);
    const [petAvail, setAvail] = React.useState(null);
    const [petSex, setSex] = React.useState(null);
    const [petAge, setAge] = React.useState(null);
    const [petDescript, setDescript] = React.useState(null);
    const [petWeight, setWeight] = React.useState(null);
    const [petDisp, setDisp] = React.useState(null);
    const [petPhoto, setPhoto] = React.useState(null);

    React.useEffect(() => {
        axios.get('http://localhost:8080/pets/5726966351134720').then(res => {
            setData(res.data);
            setName(res.name);
            setSex(res.sex);
            setType(res.type);
            setWeight(res.weight);
            setDescript(res.description);
            setDisp(res.disposition);
            setBreed(res.breed);
            setAvail(res.available);
            setAge(res.age);
            return;
        })
    });

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

        const types = ['image/png', 'image/jpeg'];

        const formPhoto = new FormData();
        for(var x = 0; x<petPhoto.length; x++) {
            if (!types.every(value => petPhoto[x].type !== value)) {
                formPhoto.append('file', petPhoto[x]);
            }
        }
        console.log(formData);
        formPhoto.append('data', JSON.stringify(formData));

        await axios.post('http://localhost:8080/pets/createPetProfile', formPhoto);
    }
    
    return (
        <div>
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
                {/* <label>Breed: </label>
                    <select name='breed' value={petData.breed} onChange={e => setBreed(e.target.value)} >{breeds[petType].map((x) => {return <option>{x}</option>})}</select>  */}
                <br />
                <label>Availability: </label>
                    <select name='availability' value={petData.availability} onChange={e => setAvail(e.target.value)} >{petAvailabitiy.map((x) => {return <option>{x}</option>})}</select>
                <label>Sex: </label>
                    <select name='sex' value={petData.sex} onChange={e => setSex(e.target.value)}>
                        <option value={false}>Male</option>
                        <option value={true}>Female</option>
                    </select>
                <div id='age-weight'>
                    <label>Age: </label>
                        <select name='age' onChange={e => setAge(e.target.value)} >{ages.map((x) => {return <option>{x}</option>})}</select>
                    <label>Weight: </label> 
                        <input required type='number' name='weight' placeholder={0} onChange={e => setWeight(e.target.value)} /> <span>lbs.</span>
                </div>
                <br />
                {/* <div id='dispositionBox'>
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
                </div> */}
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
                        <input type='checkbox' value='Very Active' name='disposition' onChange={dispositionChange}/>
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
                <input type='submit' value='Save Profile' />
            </form>
        </div>
    )
}

ReactDOM.render(<EditPetProfile />, document.getElementById("root"));

export default EditPetProfile;