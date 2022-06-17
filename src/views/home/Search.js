import React from 'react'
import styled from 'styled-components'

import useTruckDefaultSettings from 'hooks/useTruckDefaultSettings'
import Vehicle from './search/Vehicle'
import Usage from './search/Usage'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;
  padding: 1.5rem 1.5rem 1rem;
  background-color: ${(props) => props.theme.colors.secondLight};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`
const Introduction = styled.p`
  max-width: 29rem;
  margin: 0 auto 1rem;
  text-align: center;
`
export default function Search() {
  const { isSuccess } = useTruckDefaultSettings()

  return isSuccess ? (
    <Wrapper>
      <Introduction>
        <strong>
          L’outil d'aide à la décision pour renouveler son véhicule de transport
          de marchandises.
        </strong>
        <br />
        Comparez le coût et les émissions des énergies alternatives en fonction
        de vos besoins et de vos usages.
      </Introduction>
      <Vehicle />
      <Usage />
    </Wrapper>
  ) : null
}
