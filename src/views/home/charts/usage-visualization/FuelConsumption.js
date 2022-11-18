import styled from 'styled-components';
import React, { useContext, useState } from 'react';
import SearchContext from '../../../../utils/SearchContext';
import ToggleButton from '../../../../components/base/ToggleButton';

const UsageDescription = styled.div`
  margin: 2rem 0 0 1.5rem;
  button {
    float: right;
    padding: 1rem;
  }
`
const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const InputContainer = styled.div`
  padding-top: 10px;
  .description {
    line-height: 1.3rem;
    padding: 1.5rem;
    font-size: .92rem;
    font-weight: 300;
  }
`
const Input = styled.input`
  max-width: 3rem;
  text-align: center;
  padding: 0.1rem 0;
  margin: 0 0.25rem;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
  border: 2px solid ${(props) => props.theme.colors.textLight};
  border-radius: 0.5rem;
  transition: box-shadow 300ms ease-out;

  &:focus {
    outline: none;
    box-shadow: 0 -0 0px 1px ${(props) => props.theme.colors.textLight};
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
        <br />
        <div><Result>{meanFuelConsumption || 0}</Result>l/100km.</div>
      </ResultContainer>
      <ToggleButton
        onToggle={setOpen}
        open={open}
        title={'Je renseigne ma consommation'} />
      <br /><br />
      {open && (<InputContainer>
        <div className="description">Si vous connaissez votre consommation de référence d’un véhicule roulant au diesel
          B7 vous pouvez la modifier
          pour ajuster les consommations des autres énergies:
          <span>
            <Input
              type={'text'}
              name="fuelConsumption"
              id="fuelConsumption"
              unit={'l/100km'}
              placeholder={meanFuelConsumption}
              value={fuelConsumption}
              onChange={(e) => setFuelConsumption(+e.currentTarget.value)}
            />l/100km.
          </span>
        </div>
      </InputContainer>)}
    </UsageDescription>
  )
}
