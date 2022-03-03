import React from 'react'
import Pet from './Pet'

const PetList = ({ pets, onDelete, currPage, petPerPage}) => {
  if (pets.length > 0){
    return (
      <div>
        {pets.slice((currPage - 1) * petPerPage, currPage * petPerPage).map(pet => {
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
