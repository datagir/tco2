import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled(MagicLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin: 0 0.75em;
`
const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.main};
`
export default function Logo() {
  return (
    <Wrapper to='/'>
      <Title>
        Verdir
        <br />
        ma flotte
      </Title>
    </Wrapper>
  )
}
