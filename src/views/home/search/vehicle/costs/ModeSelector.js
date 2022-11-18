import React from 'react'
import styled from 'styled-components'
import { isNil, resolveDefaultPropertyName } from '../../../../../utils/globalUtils';

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
  white-space: nowrap;
  transition: background-color 200ms ease-out;

  &:hover {
    background-color: ${(props) =>
      props.modified
        ? props.theme.colors.main
        : props.current
        ? props.theme.colors.secondLight
        : props.theme.colors.footer};
  }
`
/**
 * Checks if global costs associated with given property has changed from default values
 *
 * Only applies to number default values
 * Default values in the technology object must have the same name as the costs properties preceded with default
 * EX: energyCost | defaultEnergyCost
 *
 * @param costs the current costs values
 * @param technology the technology
 * @param technologies initial technologies values
 * @returns {boolean} returns true is at least one cost property has changed from default
 */
const isCostModified = (costs, technology, technologies) => {
  const lastModifiedCosts = costs[technology.vehicleTechnology] ?? {}

  // Default costs values are set in the technology object from the initial list
  const defaultTechnology = technologies.find(t => t.vehicleTechnology === technology.vehicleTechnology)

  // If at least one cost property differs from default, the whole cost object is considered modified
  return Object.keys(lastModifiedCosts).some(key => {
    // Find the associated default name for the current cost (ie energyCost -> defaultEnergyCost)
    const defaultName = resolveDefaultPropertyName(key)
    // If no default value was found in initial technology, use 0
    const defaultValue = isNil(defaultTechnology[defaultName]) ? 0 : defaultTechnology[defaultName]
    // comparison - ignore empty values, and convert into number since modified values can be in string format
    return !isNil(lastModifiedCosts[key]) && lastModifiedCosts[key] !== '' && +lastModifiedCosts[key] !== defaultValue
  })
}

export default function ModeSelector(props) {
  return (
    <Wrapper>
      {props.technologies.map((technology) => (
        <Tab
          key={technology.vehicleTechnology}
          current={props.open === technology.vehicleTechnology}
          modified={isCostModified(props.costs, technology, props.technologies)}
          onClick={() => props.setOpen(technology.vehicleTechnology)}
        >
          {technology.shortName}
        </Tab>
      ))}
    </Wrapper>
  )
}
