import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import Ademe from 'components/base/Ademe'
import Datagir from 'components/base/Datagir'
import fabriquedelalogistique from './logos/fabriquedelalogistique.jpg'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  a {
    display: block;
    margin: 0 1rem;
    box-shadow: none;

    &:after {
      content: none;
    }
  }
`
const Image = styled.img`
  width: 8rem;
  height: auto;
`
export default function Logos() {
  return (
    <Wrapper>
      <MagicLink to='https://www.lafabriquedelalogistique.fr/'>
        <Image src={fabriquedelalogistique} alt='Fabrique de la logistique' />
      </MagicLink>
      <MagicLink to='https://datagir.ademe.fr/'>
        <Datagir />
      </MagicLink>
      <MagicLink to='https://agirpourlatransition.ademe.fr/'>
        <Ademe />
      </MagicLink>
    </Wrapper>
  )
}
