import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import useTruckDefaultSettings from 'hooks/useTruckDefaultSettings'
import SearchContext from 'utils/SearchContext'
import TextInput from 'components/base/TextInput'
import ModeSelector from './costs/ModeSelector'
import { resolveEnergyCostUnit } from '../../../../utils/global';

const Wrapper = styled.div`
  ${(props) => props.theme.mq.small} {
    display: none;
  }
`

const Details = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
  padding: 1.5rem 2rem;
  background-color: ${(props) => props.theme.colors.secondLight};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`
const Types = styled.div`
  max-width: 17rem;
  margin: 0 auto;
`
const StyledTextInput = styled(TextInput)`
  &:last-child {
    margin: 0;
  }
  input {
    text-align: right;
  }
`
const Button = styled.button`
  display: block;
  margin: 0 auto;
  padding: 0;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.main};
  text-align: center;
  text-decoration: underline;
  border: none;
  background: transparent;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: pointer;
`

const updateEnergyCosts = (prevCosts, value, technology) => {
  // First update open technology with new value
  const openTechnology = technology.vehicleTechnology
  const updatedCosts = {
    [openTechnology]: { ...prevCosts[openTechnology], energyCost: value }
  };
  // Energy cost changes must be applied to all related technologies
  (technology.otherVehicleTechnologyWithSameEnergy ?? [])
    .forEach(tech => {
      updatedCosts[tech] = { ...prevCosts[tech], energyCost: value }
    })

  return {
    ...prevCosts,
    ...updatedCosts
  }
}

export default function Costs(props) {
  const { data } = useTruckDefaultSettings()

  const { vehicleCategory, costs, setCosts } = useContext(SearchContext)

  const [open, setOpen] = useState(null)

  const technologies = data.output?.vehicleCategoriesDescriptions
    .find(
      (vehicleCategoriesDescription) =>
        vehicleCategoriesDescription.vehicleCategory === vehicleCategory
    )
    .vehicleTechnologiesAvailability.map((technologie) => ({
      ...technologie,
      ...data.output.vehicleTechnologiesDescriptions.find(
        (description) =>
          description.vehicleTechnology === technologie.vehicleTechnology
      ),
    }))

  useEffect(() => {
    if (
      !open ||
      !technologies.find(
        (technologie) => technologie.vehicleTechnology === open
      )
    ) {
      setOpen(technologies[0].vehicleTechnology)
    }
  }, [technologies, open])

  const openTechnology = (technologies ?? []).find(t => t.vehicleTechnology === open)

  return (props.open && openTechnology) ? (
    <Wrapper>
      <ModeSelector
        open={open}
        setOpen={setOpen}
        costs={costs}
        technologies={technologies}
      />
      {open && (
        <Details>
          <Types>
            <StyledTextInput
              type='number'
              name='purchaseCost'
              label={`Prix d’achat du véhicule`}
              unit={'€'}
              value={costs[open]?.purchaseCost}
              defaultValue={openTechnology.defaultPurchaseCost || 0}
              onChange={({ value }) =>
                setCosts((prevCosts) => ({
                  ...prevCosts,
                  [open]: { ...prevCosts[open], purchaseCost: value },
                }))
              }
            />
            <StyledTextInput
              type='number'
              name='purchaseGrant'
              label={`Aide à l’achat du véhicule`}
              unit={'€'}
              value={costs[open]?.purchaseGrant}
              defaultValue={openTechnology.defaultPurchaseCost || 0}
              onChange={({ value }) =>
                setCosts((prevCosts) => ({
                  ...prevCosts,
                  [open]: { ...prevCosts[open], purchaseGrant: value },
                }))
              }
            />
            <StyledTextInput
              type='number'
              name='maintenanceCost'
              label={`Coût de maintenance annuel`}
              unit={'€'}
              value={costs[open]?.maintenanceCost}
              defaultValue={openTechnology.defaultMaintenanceCost || 0}
              onChange={ ({ value }) =>
                  setCosts((prevCosts) => ({
                    ...prevCosts,
                    [open]: { ...prevCosts[open], maintenanceCost: value },
                  }))
              }
            />
            <StyledTextInput
              type='number'
              name='insuranceCost'
              label={`Coût d’assurance annuel`}
              unit={'€'}
              value={costs[open]?.insuranceCost}
              defaultValue={openTechnology.defaultInsuranceCost || 0}
              onChange={({ value }) =>
                setCosts((prevCosts) => ({
                  ...prevCosts,
                  [open]: { ...prevCosts[open], insuranceCost: value },
                }))
              }
            />
            <StyledTextInput
              type='number'
              name='resaleCost'
              label={`Valeur de revente du véhicule`}
              unit={'€'}
              value={costs[open]?.resaleCost}
              defaultValue={openTechnology.defaultResaleCost || 0}
              onChange={({ value }) =>
                setCosts((prevCosts) => ({
                  ...prevCosts,
                  [open]: { ...prevCosts[open], resaleCost: value },
                }))
              }
            />
            <StyledTextInput
              type='number'
              name='energyCost'
              label={`Prix du carburant`}
              unit={resolveEnergyCostUnit(open)}
              value={costs[open]?.energyCost}
              defaultValue={openTechnology.defaultEnergyCost || 0}
              onChange={ ({ value }) => setCosts(
                  (prevCosts) => updateEnergyCosts(prevCosts, value, openTechnology))
              }
            />
          </Types>
        </Details>
      )}
      <Button onClick={() => setCosts([])} disabled={costs.length < 1}>
        Réinitialiser l'ensemble des coûts
      </Button>
    </Wrapper>
  ) : null
}
