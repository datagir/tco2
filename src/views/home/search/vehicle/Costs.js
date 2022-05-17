import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import SearchContext from 'utils/SearchContext'
import TextInput from 'components/base/TextInput'
import ModeSelector from './costs/ModeSelector'

const Wrapper = styled.div``

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
  justify-content: space-around;
  margin: 0 auto;
`
const StyledTextInput = styled(TextInput)`
  margin: 0;
  width: 14rem;

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
  const { costs, setCosts } = useContext(SearchContext)

  const [open, setOpen] = useState(null)

  return props.open ? (
    <Wrapper>
      <ModeSelector open={open} setOpen={setOpen} costs={costs} />
      {open && (
        <Details>
          <Types>
            <StyledTextInput
              type='number'
              name='urbain'
              label={`Prix d'achat`}
              unit={'€'}
              value={costs[open]?.purchaseCost || ''}
              onChange={({ value }) =>
                setCosts((prevCosts) => ({
                  ...prevCosts,
                  [open]: { ...prevCosts[open], purchaseCost: value },
                }))
              }
              min={0}
              max={100}
            />
            <StyledTextInput
              type='number'
              name='extraurbain'
              label={`Aide à l'achat`}
              unit={'€'}
              value={costs[open]?.purchaseGrant || ''}
              onChange={({ value }) =>
                setCosts((prevCosts) => ({
                  ...prevCosts,
                  [open]: { ...prevCosts[open], purchaseGrant: value },
                }))
              }
              min={0}
              max={100}
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
