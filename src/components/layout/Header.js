import React from 'react'
import { Header as Wrapper, HeaderBody, Service } from '@dataesr/react-dsfr'

export default function Header() {
  return (
    <Wrapper>
      <HeaderBody>
        <Service
          title='Verdir ma flotte'
          description={`L’outil d'aide à la décision pour l'achat de flottes de véhicules de transport de marchandises.`}
        />
      </HeaderBody>
    </Wrapper>
  )
}
