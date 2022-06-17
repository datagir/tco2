import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`
const Item = styled.li``
export default function List(props) {
  return (
    <Wrapper>
      {props.vehicleTechnologiesAvailability
        .filter((technologie) => technologie.critAir === props.level)
        .map((technologie) => (
          <Item key={technologie.vehicleTechnology}>
            {technologie.shortName}
          </Item>
        ))}
    </Wrapper>
  )
}
