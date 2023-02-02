const traverseDomAndCollectElements = function (matchFunc, startEl = document.body) {
  let resultSet = [];

  // recorre el árbol del DOM y recolecta elementos que matcheen en resultSet
  // usa matchFunc para identificar elementos que matcheen

  if (matchFunc(startEl) === true) resultSet.push(startEl)

  for (let i = 0; i < startEl.children.length; i++) {
    const result = traverseDomAndCollectElements(matchFunc, startEl.children[i])
    // Funcionaria como un acumulador.
    resultSet = [...resultSet, ...result]
  }
  return resultSet
}

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag
// Si me pasaron un string que comienza con # return 'id'
// Si me pasaron un string que comienza con . return 'class'
// Si me pasaron un string que comienza sin # ni . return 'tag'
// Si me pasaron un string que comienza sin # ni .
// y el . esta en el medio return 'tag.class'

const selectorTypeMatcher = function (selector) {
  if (selector.at(0) === '#') return 'id'
  if (selector.at(0) === '.') return 'class'
  if (selector.includes('.')) return 'tag.class'
  return 'tag'
}

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

const matchFunctionMaker = function (selector) {
  const selectorType = selectorTypeMatcher(selector)
  let matchFunction

  switch (selectorType) {
    case 'id':
      matchFunction = (element) => selector === '#' + element.id
      break;

    case 'class':
      matchFunction = (element) => {
        for (const className of element.classList) {
          if (selector === '.' + className) return true
        }
        return false
      }
      break;

    case 'tag':
      matchFunction = (element) => selector === element.tagName.toLowerCase()
      break;

    default:
      matchFunction = (element) => {
        const [tag, className] = selector.split('.')
        return (matchFunctionMaker(tag)(element) && matchFunctionMaker('.' + className)(element))
      }
      break;
  }
  return matchFunction
}

const $ = function (selector) {
  let elements
  const selectorMatchFunc = matchFunctionMaker(selector)
  elements = traverseDomAndCollectElements(selectorMatchFunc)
  return elements
}
