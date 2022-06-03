import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import useTruckDefaultSettings from 'hooks/useTruckDefaultSettings'
import SearchContext from 'utils/SearchContext'
import TextInput from 'components/base/TextInput'
import ModeSelector from './costs/ModeSelector'

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
  max-width: 14rem;
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
export default function Costs(props) {
  const { data } = useTruckDefaultSettings()

  const { vehicleCategory, costs, setCosts } = useContext(SearchContext)

  const [open, setOpen] = useState(null)

  const technologies = data.output.vehicleCategoriesDescriptions.find(
    (vehicleCategoriesDescription) =>
      vehicleCategoriesDescription.vehicleCategory === vehicleCategory
  ).vehicleTechnologiesAvailability

  useEffect(() => {
    setOpen(technologies[0].vehicleTechnology)
  }, [technologies])

  return props.open && technologies ? (
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
              label={`Prix d'achat`}
              unit={'€'}
              placeholder={
                technologies.find(
                  (technologie) => technologie.vehicleTechnology === open
                ).defaultPurchaseCost || 0
              }
              value={costs[open]?.purchaseCost || ''}
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
              label={`Aide à l'achat`}
              unit={'€'}
              placeholder={
                technologies.find(
                  (technologie) => technologie.vehicleTechnology === open
                ).defaultPurchaseGrant || 0
              }
              value={costs[open]?.purchaseGrant || ''}
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
              label={`Maintenance`}
              unit={'€'}
              value={costs[open]?.maintenanceCost || ''}
              placeholder={
                technologies.find(
                  (technologie) => technologie.vehicleTechnology === open
                ).defaultMaintenanceCost || 0
              }
              onChange={({ value }) =>
                setCosts((prevCosts) => ({
                  ...prevCosts,
                  [open]: { ...prevCosts[open], maintenanceCost: value },
                }))
              }
            />
            <StyledTextInput
              type='number'
              name='insuranceCost'
              label={`Assurance`}
              unit={'€'}
              value={costs[open]?.insuranceCost || ''}
              placeholder={
                technologies.find(
                  (technologie) => technologie.vehicleTechnology === open
                ).defaultInsuranceCost || 0
              }
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
              label={`Valeur de revente`}
              unit={'€'}
              value={costs[open]?.resaleCost || ''}
              placeholder={
                technologies.find(
                  (technologie) => technologie.vehicleTechnology === open
                ).defaultResaleCost || 0
              }
              onChange={({ value }) =>
                setCosts((prevCosts) => ({
                  ...prevCosts,
                  [open]: { ...prevCosts[open], resaleCost: value },
                }))
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
