import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'

import useTruckDefaultSettings from 'hooks/useTruckDefaultSettings'
import SearchContext from 'utils/SearchContext'
import TextInput from 'components/base/TextInput'
import ModeSelector from './costs/ModeSelector'
import {findAssociatedTechs, isTechnologyAvailable, resolveEnergyCostUnit} from '../../../../utils/globalUtils';
import {parseLocalNumber} from '../../../../utils/numberUtils';

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
  border-radius: 0 0 1rem 1rem;

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

const Info = styled.p`
  margin: 0 auto 1rem;
  font-size: 0.75rem;
  text-align: center;
  color: ${(props) => props.theme.colors.textLight};
`
const updateEnergyCosts = (prevCosts, value, technology, allTechnologies) => {
  // First update open technology with new value
  const openTechnology = technology.vehicleTechnology
  const updatedCosts = {
    [openTechnology]: { ...prevCosts[openTechnology], energyCost: value }
  };

  // Energy cost changes must be applied to all related technologies
  (findAssociatedTechs(technology, allTechnologies))
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

  console.log(openTechnology)
  const unavailable = useMemo(() => isTechnologyAvailable(openTechnology),[openTechnology])

  const getPlaceHolder = useCallback(field => (parseLocalNumber(openTechnology[field]) || 0), [openTechnology])

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
            {unavailable && (<Info>Energie bientôt renseignée</Info>)}
            <StyledTextInput
              type='localizedNumber'
              name='purchaseCost'
              label={`Prix d’achat du véhicule`}
              disabled={unavailable}
              unit={'€'}
              value={costs[open]?.purchaseCost}
              placeholder={getPlaceHolder('defaultPurchaseCost')}
              onChange={({ value }) =>
                setCosts((prevCosts) => ({
                  ...prevCosts,
                  [open]: { ...prevCosts[open], purchaseCost: value || undefined },
                }))
              }
            />
            <StyledTextInput
              type='localizedNumber'
              name='purchaseGrant'
              label={`Aide à l’achat du véhicule`}
              disabled={unavailable}
              unit={'€'}
              value={costs[open]?.purchaseGrant}
              placeholder={getPlaceHolder('defaultPurchaseGrant')}
              onChange={({ value }) =>
                setCosts((prevCosts) => ({
                  ...prevCosts,
                  [open]: { ...prevCosts[open], purchaseGrant: value || undefined },
                }))
              }
            />
            <StyledTextInput
              type='localizedNumber'
              name='maintenanceCost'
              label={`Coût de maintenance annuel`}
              disabled={unavailable}
              unit={'€'}
              value={costs[open]?.maintenanceCost}
              placeholder={getPlaceHolder('defaultMaintenanceCost')}
              onChange={ ({ value }) =>
                  setCosts((prevCosts) => ({
                    ...prevCosts,
                    [open]: { ...prevCosts[open], maintenanceCost: value || undefined },
                  }))
              }
            />
            <StyledTextInput
              type='localizedNumber'
              name='insuranceCost'
              label={`Coût d’assurance annuel`}
              disabled={unavailable}
              unit={'€'}
              value={costs[open]?.insuranceCost}
              placeholder={getPlaceHolder('defaultInsuranceCost')}
              onChange={({ value }) =>
                setCosts((prevCosts) => ({
                  ...prevCosts,
                  [open]: { ...prevCosts[open], insuranceCost: value || undefined },
                }))
              }
            />
            <StyledTextInput
              type='localizedNumber'
              name='resaleCost'
              label={`Valeur de revente du véhicule`}
              disabled={unavailable}
              unit={'€'}
              value={costs[open]?.resaleCost}
              placeholder={getPlaceHolder('defaultResaleCost')}
              onChange={({ value }) =>
                setCosts((prevCosts) => ({
                  ...prevCosts,
                  [open]: { ...prevCosts[open], resaleCost: value || undefined },
                }))
              }
            />
            <StyledTextInput
              type='number'
              name='energyCost'
              label={`Prix du carburant`}
              disabled={unavailable}
              unit={resolveEnergyCostUnit(open)}
              value={costs[open]?.energyCost || ''}
              placeholder={openTechnology.defaultEnergyCost || 0}
              onChange={ ({ value }) => setCosts(
                  (prevCosts) => updateEnergyCosts(prevCosts, value, openTechnology, technologies))
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
