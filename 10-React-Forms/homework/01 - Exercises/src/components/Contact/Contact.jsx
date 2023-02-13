import React from 'react'
import './Contact.modules.css'

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

export const validate = (inputs) => {
  const errors = {}

  if(!inputs.name) errors.name = 'Se requiere un nombre'
  if(!regexEmail.test(inputs.email)) errors.email = 'Debe ser un correo electrónico'
  if(!inputs.message) errors.message = 'Se requiere un mensaje'

  return errors
}

export default function Contact () {
  const [inputs, setInputs] = React.useState({
    name: '',
    email: '',
    message: ''
  })

  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const property = e.target.name
    const value = e.target.value
    setInputs({...inputs, [property]: value})
    setErrors(validate({...inputs, [property]: value}))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (Object.keys(errors).length === 0) {
			setErrors({
				name: '',
				email: '',
				message: '',
			})
			setInputs({
				name: '',
				email: '',
				message: '',
			})
			alert('Datos completos')
		} else {
			alert('Debe llenar todos los campos')
		}
	}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Nombre:</label>
        <input 
          type='text' 
          name='name' 
          className={errors.name && 'warning'} 
          value={inputs.name} 
          onChange={handleChange} 
          placeholder='Escribe tu nombre...'
        />
        {errors.name && <p className="danger">{errors.name}</p>}

        <label htmlFor="email">Correo Electrónico:</label>
        <input 
          type="text" 
          name='email' 
          className={errors.email && 'warning'} 
          value={inputs.email} 
          onChange={handleChange} 
          placeholder='Escribe tu email...'
        />
        {errors.email && <p className="danger">{errors.email}</p>}

        <label htmlFor="mensaje">Mensaje:</label>
        <textarea 
          type='text' 
          name='message' 
          className={errors.message && 'warning'} 
          value={inputs.message} 
          onChange={handleChange}
          cols='30' 
          rows='10' 
          placeholder='Escribe tu mensaje...'>
        </textarea>
        {errors.message && <p className="danger">{errors.message}</p>}

        <button type='submit'>Enviar</button>
      </form>
    </div>
    
  )
}
