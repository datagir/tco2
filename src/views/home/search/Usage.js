import React, { useContext } from 'react'
import styled from 'styled-components'

import SearchContext from 'utils/SearchContext'
import TextInput from 'components/base/TextInput'
import Typologie from './usage/Typologie'

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
  const { totalAnnualDistance, setTotalAnnualDistance, payload, setPayload } =
    useContext(SearchContext)

  return (
    <Wrapper>
      <Title htmlFor='kilometrage'>Kilométrage annuel</Title>
      <MainTextInput
        name='kilometrage'
        unit={'km'}
        value={totalAnnualDistance}
        onChange={({ value }) => setTotalAnnualDistance(value)}
      />
      <Typologie />
      <Title htmlFor='payload'>Taux de chargement massique</Title>
      <SecondTextInput
        name='payload'
        unit={'%'}
        value={payload}
        onChange={({ value }) => setPayload(value)}
        min={0}
        max={100}
      />
    </Wrapper>
  )
}
