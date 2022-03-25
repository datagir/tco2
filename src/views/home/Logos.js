import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import Ademe from 'components/base/Ademe'
import Datagir from 'components/base/Datagir'
import fabriquedelalogistique from './logos/fabriquedelalogistique.jpg'

const Wrapper = styled.div`
  a {
    margin-bottom: 1rem;
  }
`
const Image = styled.img`
  width: auto;
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
