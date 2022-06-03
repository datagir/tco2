import React, { useContext } from 'react'
import styled from 'styled-components'

import useTruckDefaultSettings from 'hooks/useTruckDefaultSettings'
import useIframe from 'hooks/useIframe'
import ModalContext from 'utils/ModalContext'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.secondLight};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`
const Title = styled.h2`
  text-align: center;
`
const Name = styled.h3`
  margin-bottom: 0.625rem;
`
const Text = styled.p`
  margin-bottom: 1.5rem;
`
const StyledButtonWrapper = styled(Button.Wrapper)`
  margin-bottom: 4rem;
`
export default function Technologies() {
  const { setDefinitions } = useContext(ModalContext)
  const { data } = useTruckDefaultSettings()
  const iframe = useIframe()

  return data?.output?.vehicleTechnologiesDescriptions ? (
    <>
      {iframe ? (
        <StyledButtonWrapper>
          <Button onClick={() => setDefinitions(true)}>
            Voir les définitions
          </Button>
        </StyledButtonWrapper>
      ) : (
        <Wrapper>
          <Title>Définitions</Title>
          {data.output.vehicleTechnologiesDescriptions.map((technologie) => (
            <div key={technologie.name}>
              <Name>{technologie.name}</Name>
              <Text>{technologie.description}</Text>
            </div>
          ))}
        </Wrapper>
      )}
    </>
  ) : null
}
