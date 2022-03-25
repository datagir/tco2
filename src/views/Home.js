import React from 'react'
import { Row, Col, Text, Title } from '@dataesr/react-dsfr'

import ContactForm from './home/ContactForm'
import Logos from './home/Logos'

export default function Home() {
  return (
    <>
      <Row gutters alignItems='middle'>
        <Col>
          <Title as='h1'>TCO2</Title>
          <Text size='lead'>
            L’outil d'aide à la décision pour l'achat de flottes de véhicules de
            transport de marchandises. Comparez le coût et les émissions des
            technologies de motorisation en fonction de vos besoins et de vos
            usages. Neutre, gratuit et open-source.
          </Text>
        </Col>
      </Row>
      <Row gutters alignItems='middle'>
        <Col>
          <ContactForm />
        </Col>
      </Row>
      <Row gutters>
        <Col>
          <Logos />
        </Col>
      </Row>
    </>
  )
}
