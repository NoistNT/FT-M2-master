/* eslint-disable no-unused-vars */
import React from 'react'
// import { useState } from 'react'
import Animals from '../Animals/Animals'
import Species from '../Species/Species'
import './Zoo.module.css'

export default function Zoo() {

   const [zoo, setZoo] = React.useState({
      zooName: '',
      animals: [],
      species: [],
      allAnimals: []
   })

   const handleInputChange = (e) => {
      setZoo({ ...zoo, zooName: e.target.value})
   }

   const handleSpecies = (e) => {
      setZoo({ ...zoo,
         animals: zoo.allAnimals.filter(animal => animal.specie === e.target.value)
      })
   }
   
   const handleAllSpecies = () => {
      setZoo({ ...zoo, animals: zoo.allAnimals, })
   }
   
   React.useEffect( () => {
      fetch('http://localhost:3001/zoo')
         .then((result) => result.json())
         .then((data) => {
            setZoo({
               ...zoo,
               animals: data.animals,
               species: data.species,
               allAnimals: data.animals,
            })
         })
         .catch((error) => console.log(error))
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []
   )

   return (
      <div>
         <label>Zoo Name:</label>
         <input onChange={handleInputChange} value={zoo.zooName} />
         <h1>{ zoo.zooName }</h1>
         <Species 
            species={zoo.species}
            handleSpecies={handleSpecies}
            handleAllSpecies={handleAllSpecies}
         />
         <Animals animals={zoo.animals}/>
      </div>
   );
}
