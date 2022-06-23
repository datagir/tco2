import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

import SearchContext from 'utils/SearchContext'
import TextInput from 'components/base/TextInput'
import ModeSelector from './typologie/ModeSelector'
import Itinerary from './typologie/Itinerary'

const Wrapper = styled.div``
const Title = styled.label`
  display: block;
  margin-bottom: 0.25rem;
`
const Text = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
`
const Details = styled.div`
  position: relative;
  margin-bottom: 2rem;
  padding: 1.5rem 2rem;
  background-color: ${(props) => props.theme.colors.secondLight};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`
const Types = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 22rem;
  margin: 0 auto;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    gap: 0.75rem;
  }
`
const StyledTextInput = styled(TextInput)`
  margin: 0;

  input {
    text-align: right;
  }
`
export default function Typologie() {
  const { usesRepartition, setUsesRepartition, setStart, setEnd } =
    useContext(SearchContext)

  const [open, setOpen] = useState('manual')

  useEffect(() => {
    setStart(null)
    setEnd(null)
  }, [open, setStart, setEnd])

  return (
    <Wrapper>
      <Title htmlFor='urbain'>Mission du véhicule</Title>
      <Text>
        La mission du véhicule peut être renseignée soit en proportions d’usages
        urbain, extra-urbain ou autoroutier ou soit selon un itinéraire connu.
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
