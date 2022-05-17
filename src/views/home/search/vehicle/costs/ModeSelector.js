import React, { useEffect } from 'react'
import styled from 'styled-components'

import useTruckComparison from 'hooks/useTruckComparison'

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
  color: ${(props) =>
    props.modified
      ? props.theme.colors.background
      : props.current
      ? props.theme.colors.text
      : props.theme.colors.main};
  text-align: center;
  text-decoration: none;
  background-color: ${(props) =>
    props.modified
      ? props.theme.colors.main
      : props.current
      ? props.theme.colors.secondLight
      : 'transparent'};
  border: none;
  border-radius: 1rem 1rem 0 0;
  cursor: pointer;
  transition: background-color 200ms ease-out;

  &:hover {
    background-color: ${(props) =>
      props.modified
        ? props.theme.colors.main
        : props.current
        ? props.theme.colors.secondLight
        : props.theme.colors.footer};
    
  ${(props) => props.theme.mq.small} {
    display: ${(props) => (props.large ? 'none' : 'flex')};
    margin-bottom: -1.25rem;
    padding: 0.25rem 0 1.25rem;
    font-size: 0.875rem;
  }
`
export default function ModeSelector(props) {
  const { data, isFetching } = useTruckComparison()

  const setOpen = props.setOpen
  const open = props.open
  useEffect(() => {
    if (!open) {
      setOpen(data?.output?.ghg[0]?.vehicleTechnology)
    }
  }, [data, open, setOpen])

  return (
    <Wrapper isFetching={isFetching}>
      {data?.output?.ghg.map(
        (technology) =>
          !technology.vehicleTechnology.includes('HVO') && (
            <Tab
              current={props.open === technology.vehicleTechnology}
              modified={props.costs[technology.vehicleTechnology]}
              onClick={() => props.setOpen(technology.vehicleTechnology)}
            >
              {technology.vehicleTechnology.replace('DIESEL-', '')}
            </Tab>
          )
      )}
    </Wrapper>
  )
}
