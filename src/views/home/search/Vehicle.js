import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import SearchContext from 'utils/SearchContext'
import Select from 'components/base/Select'
import TextInput from 'components/base/TextInput'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.footerLight};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.125rem;
`
const Title = styled.label``
const ToggleButton = styled.button`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.main};
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
const StyledSelect = styled(Select)`
  max-width: 14rem;
`
const Prices = styled.div`
  display: flex;
  gap: 2.5rem;
`
const StyledTextInput = styled(TextInput)`
  margin: 0;
  input {
    text-align: right;
  }
`
export default function Vehicle() {
  const { vehicleCategory, setVehicleCategory } = useContext(SearchContext)
  const [open, setOpen] = useState(false)

  return (
    <Wrapper>
      <Header>
        <Title for='vehicleCategory'>Catégorie véhicule</Title>
        <ToggleButton onClick={() => setOpen((prevOpen) => !prevOpen)}>
          Voir {open ? 'moins' : 'plus'} d'option véhicule
        </ToggleButton>
      </Header>
      <StyledSelect
        name={'vehicleCategory'}
        value={vehicleCategory}
        onChange={({ value }) => setVehicleCategory(value)}
      >
        <option value='RIGIDTRUCK-12T'>Poids lourd 12t</option>
        <option value='TRACTOR-19T'>Poids lourd 19t</option>
        <option value='TRACTOR-44T'>Poids lourd 44t</option>
      </StyledSelect>
      {open && (
        <Prices>
          <StyledTextInput name='achat' label={`Prix d'achat`} unit={'€'} />
          <StyledTextInput name='aide' label={`Aide à l'achat`} unit={'€'} />
          <StyledTextInput name='autre' label={`Autre aide`} unit={'€'} />
        </Prices>
      )}
    </Wrapper>
  )
}
