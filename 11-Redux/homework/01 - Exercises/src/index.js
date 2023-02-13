const { createStore } = require('redux')
const contador = require('./reducer')
const { incremento, decremento } = require('./actions')

// En esta línea creamos nuestro store. Pasándole como parámetro nuestro Reducer
const store = createStore(contador)

// Obtenemos el elemento con el id `valor`.
const valor = document.querySelector('#valor')

// Esta función nos va a servir para actualizar nuestro DOM con el valor que tengamos en nuestro Store.
// En el primer render y cada vez que nos subscribamos al Store.
// Utilizamos el elemento obtenido arriba para mostrar el State.
function renderContador () {
  const contador = store.getState().contador
  // Obtenemos la propiedad 'contador' de nuestro store:
  // Seteamos el número obtenido como texto dentro del elemento con id 'valor':
  valor.innerHTML = contador
}

// Ejecutamos la función 'renderContador':
renderContador()

// Nos subscribimos al store pasándole la misma función. Así cada vez que llegue una acción, ejecutamos la función:
store.subscribe(renderContador)

// Por último, utilizamos los botones de nuestro HTML para que cada vez que hagamos click,
// hagan un dispatch al store de la acción correspondiente:
const increaseButton = document.querySelector('#incremento')
increaseButton.addEventListener('click', () => { store.dispatch(incremento()) })

const decreaseButton = document.querySelector('#decremento')
decreaseButton.addEventListener('click', () => {
  store.getState().contador > 0 && store.dispatch(decremento())
})

const increaseUnpairButton = document.querySelector('#incrementoImpar')
increaseUnpairButton.addEventListener('click', () => {
  store.getState().contador % 2 !== 0 && store.dispatch(incremento())
  // valor.innerHTML % 2 !== 0 && store.dispatch(incremento())
  // if (valor.innerHTML % 2 !== 0) store.dispatch(incremento())
})

const increaseAsyncButton = document.querySelector('#incrementoAsync')
increaseAsyncButton.addEventListener('click', () => {
  setTimeout(() => {
    store.dispatch(incremento())
  }, 1200)
})
