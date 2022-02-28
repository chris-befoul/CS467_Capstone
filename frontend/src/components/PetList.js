import React from 'react'
import Pet from './Pet'

const PetList = ({ pets, onDelete, filterByType}) => {
  const filteredPets = pets.filter(pet => filterByType === 'All' || pet.type === filterByType);
  if (filteredPets.length > 0){
    return (
      <div>
        {filteredPets.map(pet => {
          return <Pet pet={pet} key={pet.id} onDelete={onDelete}/>;
        })}
      </div>
    )
  } else{
    return (
      <div style={{textAlign: 'center'}}>No Pet to Display</div>
    )
  }
}

export default PetList
