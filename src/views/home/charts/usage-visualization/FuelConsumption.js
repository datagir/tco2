import styled from 'styled-components';
import React, { useContext } from 'react';
import TextInput from '../../../../components/base/TextInput';
import SearchContext from '../../../../utils/SearchContext';

const UsageDescription = styled.div`
  margin: 2rem 0 0 1.5rem;
`
const MainTextInput = styled(TextInput)`
  max-width: 8rem;
  margin: 1rem 0;
  input {
    text-align: right;
  }
`
const Result = styled.span`
  background-color: ${(props) => props.theme.colors.footerLight};
  border-radius: .5rem;
  padding: 0.5rem;
  line-height: 2em;
`

export function FuelConsumption(props) {
  const { fuelConsumption, setFuelConsumption } = useContext(SearchContext)
  const { meanFuelConsumption } = props

  return (
    <UsageDescription>
      <strong>La consommation de référence calculée pour ce véhicule est de <Result>{meanFuelConsumption || 0}l/100km</Result></strong>
      <br/><br/>
      <p>Si vous connaissez votre consommation de référence d’un véhicule roulant au diesel B7 vous pouvez la modifier
        pour ajuster les consommations des autres énergies.</p>
      <MainTextInput
        name='fuelConsumption'
        unit={ 'l/100km' }
        value={ fuelConsumption || 0 }
        onChange={({ value }) => setFuelConsumption(value)}
      />
    </UsageDescription>
  )
}
