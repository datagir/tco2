import styled from 'styled-components';
import React, { useContext } from 'react';
import TextInput from '../../../../components/base/TextInput';
import SearchContext from '../../../../utils/SearchContext';

const UsageDescription = styled.div`
  margin: 2rem 0 0 1.5rem;
`
const MainTextInput = styled(TextInput)`
  max-width: 10rem;
  margin: 1rem 0;
  input {
    text-align: right;
  }
`

export function FuelConsumption() {
  const { fuelConsumption, setFuelConsumption } = useContext(SearchContext)

  return (
    <UsageDescription>
      <strong>La consommation de référence de ce véhicule est de:</strong>

      <MainTextInput
        name='fuelConsumption'
        unit={ 'l/100km' }
        value={ fuelConsumption || 0 }
        onChange={({ value }) => setFuelConsumption(value)}
      />

      <p>Si vous connaissez votre consommation de référence d’un véhicule roulant au diesel B7 vous pouvez la modifier
        pour ajuster les consommations des autres énergies.</p>
    </UsageDescription>
  )
}
