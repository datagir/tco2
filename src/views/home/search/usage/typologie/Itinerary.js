import React, { useContext } from 'react'
import styled from 'styled-components'

import SearchContext from 'utils/SearchContext'
import Address from './itinerary/Address'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

export default function Itinerary() {
  const { start, setStart, end, setEnd } = useContext(SearchContext)
  return (
    <Wrapper>
      <Address
        placeholder='Départ'
        address={start?.label}
        setPlace={setStart}
      />
      <Address placeholder='Arrivée' address={end?.label} setPlace={setEnd} />
    </Wrapper>
  )
}
