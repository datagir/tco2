import React, { useContext } from 'react'
import styled from 'styled-components'

import SearchContext from 'utils/SearchContext'
import TextInput from 'components/base/TextInput'
import Typologie from './usage/Typologie'
import useTruckDefaultSettings, {
  selectTruckDefaultParameters,
} from '../../../hooks/useTruckDefaultSettings';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
  padding: 1.5rem 1.5rem;
  background-color: ${(props) => props.theme.colors.footerLight};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`
const Title = styled.label`
  display: block;
  margin-bottom: 0.25rem;
`
const MainTextInput = styled(TextInput)`
  max-width: 14rem;
  margin-bottom: 2rem;
  input {
    text-align: right;
  }
`
const SecondTextInput = styled(TextInput)`
  max-width: 7rem;
  margin: 0;
  input {
    text-align: right;
  }
`
export default function Usage() {
  const { vehicleCategory, totalAnnualDistance, setTotalAnnualDistance, payload, setPayload } =
    useContext(SearchContext)
  const { data: defaultSettings } = useTruckDefaultSettings()
  const { totalAnnualDistance: defaultTotalAnnualDistance, payload: defaultPayload } = selectTruckDefaultParameters(vehicleCategory, defaultSettings)

  return (
    <Wrapper>
      <Title htmlFor='kilometrage'>Kilométrage annuel</Title>
      <MainTextInput
        type={'number'}
        name='kilometrage'
        unit={'km'}
        defaultValue={defaultTotalAnnualDistance}
        value={totalAnnualDistance}
        onChange={({ value }) => setTotalAnnualDistance(value)}
      />
      <Typologie />
      <Title htmlFor='payload'>
        Chargement du véhicule en pourcentage de charge utile
      </Title>
      <SecondTextInput
        type={'number'}
        name='payload'
        unit={'%'}
        defaultValue={defaultPayload}
        value={payload}
        onChange={({ value }) => setPayload(value)}
        min={0}
        max={100}
      />
    </Wrapper>
  )
}
