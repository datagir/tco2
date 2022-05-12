import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

import SearchContext from 'utils/SearchContext'
import TextInput from 'components/base/TextInput'
import ModeSelector from './usage/ModeSelector'
import Itinerary from './usage/Itinerary'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
  padding: 1.5rem 1.5rem 1rem;
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
const Text = styled.p`
  max-width: 26rem;
  font-size: 0.875rem;
  font-weight: 300;
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
  display: flex;
  gap: 2.5rem;
`

const MainTextInput = styled(TextInput)`
  max-width: 14rem;
  input {
    text-align: right;
  }
`
const StyledTextInput = styled(TextInput)`
  margin: 0;

  input {
    text-align: right;
  }
`
export default function Usage() {
  const {
    totalAnnualDistance,
    setTotalAnnualDistance,
    usesRepartition,
    setUsesRepartition,
    setStart,
    setEnd,
  } = useContext(SearchContext)

  const [open, setOpen] = useState('manual')

  useEffect(() => {
    setStart(null)
    setEnd(null)
  }, [open, setStart, setEnd])

  return (
    <Wrapper>
      <Title htmlFor='kilometrage'>Kilométrage annuel</Title>
      <MainTextInput
        name='kilometrage'
        unit={'km'}
        value={totalAnnualDistance}
        onChange={({ value }) => setTotalAnnualDistance(value)}
      />
      <Title htmlFor='urbain'>Typologie de route</Title>
      <Text>
        Vous pouvez renseigner le type de route soit en pourcentage du
        kilometrage annuel, soit en entrant un trajet type.
        <br />
        ⚠️ L'itinéraire type n'influe pas sur le kilométrage annuel
      </Text>
      <ModeSelector open={open} setOpen={setOpen} />
      <Details>
        {open === 'manual' ? (
          <Types>
            <StyledTextInput
              type='number'
              name='urbain'
              label={`Urbain`}
              unit={'%'}
              value={usesRepartition[0]}
              onChange={setUsesRepartition}
              min={0}
              max={100}
            />
            <StyledTextInput
              type='number'
              name='extraurbain'
              label={`Extra urbain`}
              unit={'%'}
              value={usesRepartition[1]}
              onChange={setUsesRepartition}
              min={0}
              max={100}
            />
            <StyledTextInput
              type='number'
              name='autoroute'
              label={`Autoroute`}
              unit={'%'}
              value={usesRepartition[2]}
              onChange={setUsesRepartition}
              min={0}
              max={100}
            />
          </Types>
        ) : (
          <Itinerary />
        )}
      </Details>
    </Wrapper>
  )
}
