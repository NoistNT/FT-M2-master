import React from 'react'
import { DivButtons, Buttons } from '../styled-components/StyledButtons'


export default class Botones extends React.Component {
  render () {
    const { alerts } = this.props
    return (
      <DivButtons>
        <Buttons onClick={() => alert(alerts.m1)}>Módulo 1</Buttons>
        <Buttons onClick={() => alert(alerts.m2)}>Módulo 2</Buttons>
      </DivButtons>
    )
  }
}

// Esto lo exportamos para los tests
export { DivButtons, Buttons }
