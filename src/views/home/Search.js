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
export default function Search() {
  const { data } = useTruckDefaultSettings()

  console.log(data)
  return (
    <Wrapper>
      <Vehicle />
      <Usage />
    </Wrapper>
  )
}
