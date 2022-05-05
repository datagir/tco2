import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import SearchContext from 'utils/SearchContext'
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
  const { totalAnnualDistance, setTotalAnnualDistance } =
    useContext(SearchContext)

  const [open, setOpen] = useState(false)

  return (
    <Wrapper>
      <Header>
        <Title for='kilometrage'>Kilométrage annuel</Title>
        <ToggleButton onClick={() => setOpen((prevOpen) => !prevOpen)}>
          Voir {open ? 'moins' : 'plus'} d'option usage
        </ToggleButton>
      </Header>
      <MainTextInput
        name='kilometrage'
        unit={'km'}
        value={totalAnnualDistance}
        onChange={({ value }) => setTotalAnnualDistance(value)}
      />
      {open && (
        <Types>
          <StyledTextInput name='urbain' label={`Urbain`} unit={'%'} />
          <StyledTextInput
            name='extraurbain'
            label={`Extra urbain`}
            unit={'%'}
          />
          <StyledTextInput name='autoroute' label={`Autoroute`} unit={'%'} />
        </Types>
      )}
    </Wrapper>
  )
}
