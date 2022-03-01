import React from 'react'
import Pet from './Pet'

const PetList = ({ pets, onDelete, filterByType, currPage, petPerPage, setPageCount}) => {
  const filteredPets = pets.filter(pet => filterByType === 'All' || pet.type === filterByType);
  setPageCount(Math.ceil(filteredPets.length / petPerPage));
  if (filteredPets.length > 0){
    return (
      <div>
        {filteredPets.slice((currPage - 1) * petPerPage, currPage * petPerPage).map(pet => {
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
