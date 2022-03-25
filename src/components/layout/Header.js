import React from 'react'
import {
  Header as Wrapper,
  HeaderOperator,
  HeaderBody,
  Logo,
  Service,
} from '@dataesr/react-dsfr'

import Ademe from 'components/base/Ademe'

export default function Header() {
  return (
    <Wrapper>
      <HeaderBody>
        <Logo splitCharacter={10}>République Française</Logo>
        <HeaderOperator>
          <Ademe />
        </HeaderOperator>
        <Service
          title='TCO2'
          description={`L’outil d'aide à la décision pour l'achat de flottes de véhicules de transport de marchandises.`}
        />
      </HeaderBody>
    </Wrapper>
  )
}
