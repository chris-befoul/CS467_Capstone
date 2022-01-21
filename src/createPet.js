import React from 'react';
import ReactDOM from 'react-dom';

const petAvailabitiy = ['Not Availabe', 'Available', 'Pending', 'Adopted'];
const breeds = {
    dog: ['Golden Retriever', 'German Shepard', 'Beagle', 'Poodle', 'Australian Shepard', 'Pug', 'Chihuahua', 'Dalmatian', 'Bulldog', 'French Bulldog', 'Pit Bull', 'Other'],
    cat: ['Maine Coon', 'Siamese', 'British Shorthair', 'Chartreux', 'Selkirk Rex', 'Munchkin', 'Himalayan', 'Scottish Fold', 'Sphynx', 'Other'],
    other: ['']
}


const CreatePetFormPage = () => {
    const [petType, setType] = React.useState("dog");

    const handleChange = (event) => {
        setType(event.target.value)
    }
    
    return (
        <form>
            <label>
                Pet's Name: <input type='text' />
            </label>
            <label>
                Pet Type: <select value={petType} onChange={handleChange}>
                    <option value='dog'>Dog</option>
                    <option value='cat'>Cat</option>
                    <option value='other'>Other</option>
                </select>
            </label>
            <label>
                Breed: <select>{breeds[petType].map((x, y) => {return <option>{x}</option>})}</select>
            </label>
            <label>
                Availability: 
                <select>{petAvailabitiy.map((x, y) => {return <option>{x}</option>})}</select>
            </label>
            <label>
                Sex: <select>
                        <option value='false'>Male</option>
                        <option value='true'>Female</option>
                    </select>
                Age: <input type='number' />
                Weight: <input type='number' />
            </label>
            <label>
                Disposition: 
                <input type='checkbox' value='Good with other animals'/>
                <input type='checkbox' value='Good with children'/>
                <input type='checkbox' value='Animal must be leashed at all times'/>
                <input type='checkbox' value='Very Active'/>
            </label>
            <label>
                Description: <input type='text' maxLength='280' /> 
            </label>
            <label>
                Upload Pet Photo: <input type='file' />
            </label>
            <input type='submit' value='Save Profile'/>
        </form>
    )
}

ReactDOM.render(<CreatePetFormPage />, document.getElementById("root"));

export default CreatePetFormPage;