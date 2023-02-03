/* eslint-disable no-undef */

const URL = 'http://localhost:5000/amigos'

const [boton] = $('#boton')
const [search] = $('#search')
const [remove] = $('#delete')
const [limpiar] = $('#clear')
const [limpiarDelete] = $('#clearDelete')
const [lista] = $('#lista')
const [amigo] = $('#amigo')
const [input] = $('#input')
const [inputDelete] = $('#inputDelete')

const friendsList = (result) => {
  lista.innerText = ''
  result.forEach(friend => {
    const li = document.createElement('li')
    li.innerText = friend.name
    lista.append(li)
  })
}

const showFriends = () => {
  $.get(URL, friendsList)
}

const showFriend = (result) => {
  const id = input.value
  amigo.innerText = result.name
  if (id === '') amigo.innerText = ''
  console.log(id, amigo)
  input.value = ''
}

const searchFriend = () => {
  const id = input.value
  $.get(`${URL}/${id}`, showFriend)
}

const deleteFriend = () => {
  const id = inputDelete.value
  inputDelete.value = ''
  if (id !== '') {
    $.ajax({
      type: 'DELETE',
      url: `${URL}/${id}`,
      success: (result) => friendsList(result)
    })
  }
}

const limpiarSearch = () => {
  amigo.innerText = ''
  input.value = ''
}

const limpiarDeleteFields = () => {
  inputDelete.value = ''
}

boton.addEventListener('click', showFriends)
search.addEventListener('click', searchFriend)
remove.addEventListener('click', deleteFriend)
limpiar.addEventListener('click', limpiarSearch)
limpiarDelete.addEventListener('click', limpiarDeleteFields)
