import React from 'react'
import Pet from './Pet'

const PetList = ({pets}) => {
  return (
    <div>
      {pets.map(pet => {
        return <Pet pet={pet} key={pet.id}/>;
      })}

      {/* <Pet pet={pets[0]}/>
      <Pet pet={pets[0]}/>
      <Pet pet={pets[0]}/>
      <Pet pet={pets[0]}/> */}
    </div>
  )
}

export default PetList
