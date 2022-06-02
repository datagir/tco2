import React from 'react'
import styled from 'styled-components'

import useTruckDefaultSettings from 'hooks/useTruckDefaultSettings'

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
export default function Technologies() {
  const { data } = useTruckDefaultSettings()
  return data?.output?.vehicleTechnologiesDescriptions ? (
    <Wrapper>
      <Title>Définitions</Title>
      {data.output.vehicleTechnologiesDescriptions.map((technologie) => (
        <>
          <Name>{technologie.name}</Name>
          <Text>{technologie.description}</Text>
        </>
      ))}
    </Wrapper>
  ) : null
}
