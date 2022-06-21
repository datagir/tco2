import React, { useContext } from 'react'
import styled from 'styled-components'

import useTruckDefaultSettings from 'hooks/useTruckDefaultSettings'
import ModalContext from 'utils/ModalContext'
import Button from 'components/base/Button'

const StyledButtonWrapper = styled(Button.Wrapper)`
  margin-bottom: 4rem;
`
export default function Technologies() {
  const { setDefinitions } = useContext(ModalContext)
  const { data } = useTruckDefaultSettings()

  return data?.output?.vehicleTechnologiesDescriptions ? (
    <StyledButtonWrapper>
      <Button onClick={() => setDefinitions(true)}>Voir les définitions</Button>
    </StyledButtonWrapper>
  ) : null
}
