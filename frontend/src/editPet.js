import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./editPet.css";


const petAvailabitiy = ['Available', 'Not Availabe', 'Pending', 'Adopted'];
const breeds = {
    dog: ['Golden Retriever', 'German Shepard', 'Beagle', 'Poodle', 'Australian Shepard', 'Pug', 'Chihuahua', 'Dalmatian', 'Bulldog', 'French Bulldog', 'Pit Bull', 'Other'],
    cat: ['Maine Coon', 'Siamese', 'British Shorthair', 'Chartreux', 'Selkirk Rex', 'Munchkin', 'Himalayan', 'Scottish Fold', 'Sphynx', 'Other'],
    other: ['Other']
}
const ages = ['Puppy/Kitten/Baby', 'Young', 'Adult', 'Senior'];


const EditPetProfile = () => {
    const params = useParams();
    const [petData, setData] = React.useState({});
    const [currPhotos, setCurr] = React.useState([])
    const [petType, setType] = React.useState(null);
    const [petName, setName] = React.useState(null);
    const [petBreed, setBreed] = React.useState(null);
    const [petAvail, setAvail] = React.useState(null);
    const [petSex, setSex] = React.useState(null);
    const [petAge, setAge] = React.useState(null);
    const [petDescript, setDescript] = React.useState(null);
    const [petWeight, setWeight] = React.useState(null);
    const [petDisp, setDisp] = React.useState([]);
    const [petPhoto, setPhoto] = React.useState(null);
    const [petDate, setDate] = React.useState();
    const [petUrl, setUrl] = React.useState();
    const [navigate, setNavigate] = React.useState(false);

    const travel = useNavigate();
    const fetchURL = 'http://localhost:8080';
    // const fetchURL = 'https://cs467-sandbox.ue.r.appspot.com';
    // const fetchURL = 'https://capstone-animal-adoption-app.wl.r.appspot.com';

    React.useEffect(() => {
        getPetData(params.petID);
    }, [params.petID]);

    const getPetData = async (petID) => {
        const petURL = fetchURL + '/pets/' + petID;
        await axios.get(petURL).then(res => {
            setCurr(res.data.photos);
            const edit = res.data.data;
            setData(edit);
            setName(edit.name);
            setSex(edit.sex);
            setType(edit.type);
            setWeight(edit.weight);
            setDescript(edit.description);
            setDisp(edit.disposition);
            setBreed(edit.breed);
            setAvail(edit.availability);
            setAge(edit.age);
            setDate(edit.date_created);
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
        date_created: petDate,
        shelter_id: 52
    }

    const submitProfile = async (e) => {
        e.preventDefault();
        const petURL = fetchURL + '/pets/' + params.petID;

        const types = ['image/png', 'image/jpeg'];

        const formPhoto = new FormData();
        if(petPhoto) {
            for(var x = 0; x <petPhoto.length; x++) {
                if (!types.every(value => petPhoto[x].type !== value)) {
                    formPhoto.append('file', petPhoto[x]);
                }
            }
        }
        formPhoto.append('data', JSON.stringify(formData));

        await axios.patch(petURL, formPhoto).then( data => {
            const id = data.data.id;
            alert('Your pet profile has been updated!');
            setUrl('/pets/viewProfile/' + id);
            setNavigate(true);
        });
        return;;
    }

    if(navigate) {
        travel(petUrl);
        window.location.reload();
    }

    const TypeCreate = () => {
        if (petType != null) {
            return <select id='edit-select' name='type' defaultValue={petType} onChange={e => {setType(e.target.value); setBreed(breeds[e.target.value][0])}}>
                        <option value='dog'>Dog</option>
                        <option value='cat'>Cat</option>
                        <option value='other'>Other</option>
                    </select>
        }
        return <p></p>
    }

    const BreedCreate = () => {
        if (petType != null) {
            return <select id='edit-select' name='breed' defaultValue={petBreed} onChange={e => setBreed(e.target.value)} >{breeds[petType].map((x) => {return <option key={x}>{x}</option>})}</select> 
        }
        return <p></p>
    }

    const AvailableCreate = () => {
        if(petAvail != null) {
            return <select id='edit-select' name='availability' defaultValue={petAvail} onChange={e => setAvail(e.target.value)} >{petAvailabitiy.map((x) => {return <option key={x}>{x}</option>})}</select>
        }
        return <p></p>
    }

    const AgeCreate = () => {
        if(petAge != null) {
            return <select id='edit-select' name='age' defaultValue={petAge} onChange={e => setAge(e.target.value)} >{ages.map((x) => {return <option key={x}>{x}</option>})}</select>
        }
        return <p></p>
    }

    const DispCreate = () => {
        if(petDisp != null) {
            return <div id='edit-disposition'>
                        <label id='dispositionLabel'>Good with other animals</label>
                            <input type='checkbox' value='Good with other animals' name='disposition' id='disp-check' onChange={dispositionChange} defaultChecked={petDisp.includes('Good with other animals')}/>
                        <label id='dispositionLabel-right'>Good with children </label>
                            <input type='checkbox' value='Good with children' name='disposition' id='disp-check' onChange={dispositionChange} defaultChecked={petDisp.includes('Good with children')}/>
                            <br />
                        <label id='dispositionLabel'>Animal must be leashed at all times </label>
                            <input type='checkbox' value='Animal must be leashed at all times' name='disposition' id='disp-check' onChange={dispositionChange} defaultChecked={petDisp.includes('Animal must be leashed at all times')}/>
                        <label id='dispositionLabel-right'>Very Active </label>
                            <input type='checkbox' value='Very Active' name='disposition' id='disp-check' onChange={dispositionChange} defaultChecked={petDisp.includes('Very Active')}/>
                    </div>
        }
        return <p></p>
    }

    const deletePhoto = async(e) => {
        e.preventDefault();
        if(window.confirm("Are you sure you want to delete this photo from your pet profile?")) {
            await axios({
                method: 'delete',
                url: fetchURL + '/pets/photo',
                data: {
                fileName: e.target.name
                }
            }).then((res) => {
                if(res.status === 201) {
                    alert("Pet photo has been removed from profile");
                    window.location.reload();
                }
                else {
                    alert("Something went wrong with photo deletion please try again and it it persists contact admin.")
                }
            });
        }
        else {
            console.log("Photo not deleted");
        }
    }

    

    const Photo = (props) => {
        const [deletePic, setDelete] = React.useState(false);

        const picEnter = () => {
            setDelete(true);
        }

        const picLeave = () => {
            setDelete(false);
        }

        return <li id='photo-list'>
            <div id='edit-photo'> 
            <img id='edit-pet-image' name={props.picture.name} src={'https://storage.googleapis.com/pet_profile_photo/' + props.picture.name} onMouseEnter={picEnter} onMouseLeave={picLeave} onClick={deletePhoto}/> 
            { deletePic ? <p id='delete-pic' onMouseEnter={picEnter} onMouseLeave={picLeave}>Delete Photo</p> : null}
            </div> 
            </li>;
    }

    const EditPhotos = () => {
        if(currPhotos && currPhotos.length > 0) {
            return <div id='edit-photo-container'>
                <ul id='edit-photos'>
                    {currPhotos.map((pic) => <Photo picture={pic} key={pic.name}/>)}
                </ul>
            </div>
        }
        return <p></p>
    }
    
    return (
        <div id='petBox'>
            <form id='edit-pet-form' name='edit-pet-form' onSubmit={submitProfile}>
                <EditPhotos />
                <label id='edit-label'>Pet's Name: </label>
                    <input required type='text' name='name' id='name' defaultValue={petName} onChange={e => setName(e.target.value)}/> 
                <br/>
                <label id='edit-label'>Pet Type: </label>
                    <TypeCreate />
                <label id='edit-label'>Breed: </label>
                    <BreedCreate />
                <br />
                <label id='edit-label'>Availability: </label>
                    <AvailableCreate />
                <label id='edit-label'>Sex: </label>
                    <select id='edit-select' name='sex' defaultValue={petSex} onChange={e => setSex(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                <div id='age-weight'>
                    <label id='edit-label'>Age: </label>
                        <AgeCreate />
                    <label id='edit-label'>Weight: </label> 
                        <input required type='number' name='weight' defaultValue={petWeight} onChange={e => setWeight(e.target.value)} /> <span>lbs.</span>
                </div>
                <br />
                <div id='dispositionBox'>
                <label id='edit-label'>Disposition: </label>
                <br />
                    <DispCreate />
                </div>
                <br/>
                <div id='descriptionBox'>
                    <br />
                <label id='edit-label'>Description: </label>
                    <br />
                    <textarea required type='text' maxLength={280} name='edit-description' id='edit-description' defaultValue={petDescript} onChange={e => setDescript(e.target.value)}></textarea>
                </div>
                <br />
                <div id='photoBox'>
                    <label id='edit-label'>Upload Pet Photo: </label>
                        <input type='file' id='photo-upload'  onChange={addPhoto} accept='image/jpeg, image/png' multiple/>
                </div>
                <br />
                <input type='submit' value='Save Profile' id='edit-save'/>
            </form>
        </div>
    )
}

export default EditPetProfile;