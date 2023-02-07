import Card from './Card';

export default function Cards({ characters }) {
   return (
     <div>
      {
         characters.map( ({id, name, species, gender, image}) => {
            return <Card
            key={id}
            name={name}
            species={species}
            gender={gender}
            image={image}
            onClose={() => alert('Emulamos que se cierra la card')}
            />
         })

         // characters.map((character) => {
         //   return <Card
         //    key={character.id}
         //    name={character.name}
         //    species={character.species}
         //    gender={character.gender}
         //    image={character.image}
         //    onClose={() => window.alert('Emulamos que se cierra la card')}
         //   />
         // })
      }
     </div>
   )
}
