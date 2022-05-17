import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.nav`
  display: flex;
`
const Tab = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  margin-bottom: -1rem;
  padding: 0.25rem 0 1rem;
  color: ${(props) => props.theme.colors[props.current ? 'text' : 'main']};
  text-align: center;
  text-decoration: none;
  background-color: ${(props) =>
    props.current ? props.theme.colors.secondLight : 'transparent'};
  border: none;
  border-radius: 1rem 1rem 0 0;
  cursor: pointer;
  transition: background-color 200ms ease-out;

  &:hover {
    background-color: ${(props) =>
      props.theme.colors[props.current ? 'secondLight' : 'footer']};
  }

  ${(props) => props.theme.mq.small} {
    display: ${(props) => (props.large ? 'none' : 'flex')};
    margin-bottom: -1.25rem;
    padding: 0.25rem 0 1.25rem;
    font-size: 0.875rem;
  }
`
export default function ModeSelector(props) {
  return (
    <Wrapper>
      <Tab
        current={props.open === 'manual'}
        onClick={() => props.setOpen('manual')}
      >
        Manuel
      </Tab>
      <Tab
        current={props.open === 'itinerary'}
        onClick={() => props.setOpen('itinerary')}
      >
        Itinéraire type
      </Tab>
    </Wrapper>
  )
}
