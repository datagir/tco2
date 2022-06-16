import React, { useContext } from 'react'
import styled from 'styled-components'

import useTruckDefaultSettings from 'hooks/useTruckDefaultSettings'
import ModalContext from 'utils/ModalContext'
import Modal from 'components/base/Modal'

const Title = styled.h2``
const Name = styled.h3`
  margin-bottom: 0.625rem;
`
const Text = styled.p`
  margin-bottom: 1.5rem;
`
export default function DefinitionsModal() {
  const { definitions, setDefinitions } = useContext(ModalContext)
  const { data } = useTruckDefaultSettings()

  return data?.output?.vehicleTechnologiesDescriptions ? (
    <Modal open={definitions} setOpen={setDefinitions}>
      <Title>Définitions</Title>
      {data.output.vehicleTechnologiesDescriptions.map((technologie) => (
        <div key={technologie.name}>
          <Name>
            {technologie.shortName !== technologie.name ? (
              <>
                {technologie.shortName} : {technologie.name}
              </>
            ) : (
              technologie.name
            )}
          </Name>
          <Text>{technologie.description}</Text>
        </div>
      ))}
    </Modal>
  ) : null
}
