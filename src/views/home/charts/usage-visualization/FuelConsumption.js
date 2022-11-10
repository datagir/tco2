import styled from 'styled-components';
import React, { useContext, useState } from 'react';
import TextInput from '../../../../components/base/TextInput';
import SearchContext from '../../../../utils/SearchContext';
import ToggleButton from '../../../../components/base/ToggleButton';

const UsageDescription = styled.div`
  margin: 2rem 0 0 1.5rem;
  button {
    float: right;
    padding: 1rem;
  }
`
const MainTextInput = styled(TextInput)`
  max-width: 8rem;
  margin: 1rem 0;
  input {
    text-align: right;
  }
`
const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const InputContainer = styled.div`
  padding-top: 10px;
  p {
    font-size: 0.875rem;
    font-weight: 300;
  }
`
const Result = styled.span`
  background-color: ${(props) => props.theme.colors.footerLight};
  border-radius: .5rem;
  padding: 0.5rem;
  margin-right: .25rem;
  line-height: 2em;
`

export function FuelConsumption(props) {
  const { meanFuelConsumption } = props
  const { fuelConsumption, setFuelConsumption } = useContext(SearchContext)

  const [open, setOpen] = useState(false)

  return (
    <UsageDescription>
      <ResultContainer>La consommation de référence calculée pour ce véhicule est de
        <br/>
        <div><Result>{ meanFuelConsumption || 0 }</Result>l/100km.</div>
      </ResultContainer>
      <ToggleButton
        onToggle={ setOpen }
        open={ open }
        title={ 'Je renseigne ma consommation' }/>
      <br/><br/>
      { open && (<InputContainer>
        <p>Si vous connaissez votre consommation de référence d’un véhicule roulant au diesel B7 vous pouvez la modifier
          pour ajuster les consommations des autres énergies.</p>
        <MainTextInput
          name='fuelConsumption'
          unit={ 'l/100km' }
          placeholder={ meanFuelConsumption }
          value={ fuelConsumption }
          onChange={ ({ value }) => setFuelConsumption(value) }
        />
      </InputContainer>) }
    </UsageDescription>
  )
}
