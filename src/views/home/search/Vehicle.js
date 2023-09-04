import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import useTruckDefaultSettings, { selectTruckDescriptions } from 'hooks/useTruckDefaultSettings'
import SearchContext from 'utils/SearchContext'
import Select from 'components/base/Select'
import Costs from './vehicle/Costs'
import {useHistory, useLocation} from 'react-router-dom';
import StyleContext from '../../../utils/StyleContext';
import ToggleButton from '../../../components/base/ToggleButton';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
  padding: 1.5rem 1.5rem 0.5rem;
  background-color: ${(props) => props.theme.colors.footerLight};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    padding: 1rem 1rem 0.5rem;
  }
`
const Flex = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
  }
`
const Title = styled.label`
  display: block;
  margin-bottom: 1.125rem;
`
const StyledSelect = styled(Select)`
  min-width: 18rem;
  max-width: 30rem;
`
export default function Vehicle() {
  const history = useHistory();
  const location = useLocation();
  const { theme } = useContext(StyleContext)
  const { vehicleCategory } = useContext(SearchContext)
  const { data: truckDefaults } = useTruckDefaultSettings()

  const [open, setOpen] = useState(false)

  return (
    <Wrapper>
      <Title htmlFor='vehicleCategory'>Silhouette du véhicule</Title>
      <Flex>
        <StyledSelect
          name={'vehicleCategory'}
          value={vehicleCategory}
          onChange={({ value }) => {history.push({ pathname: location.pathname, search: `?vehicleCategory=${value}${theme ? '&theme=' + theme : ''}` })}}
        >
          {selectTruckDescriptions(vehicleCategory, truckDefaults).map((vehicleCategory) => (
            <option
              key={vehicleCategory.vehicleCategory}
              value={vehicleCategory.vehicleCategory}
            >
              {vehicleCategory.name}
            </option>
          ))}
        </StyledSelect>
        <ToggleButton
          onToggle={setOpen}
          open={open}
          title={'Je renseigne mes coûts véhicule'}
        />
      </Flex>
      <Costs open={open} />
    </Wrapper>
  )
}
