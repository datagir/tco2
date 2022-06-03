import React from 'react'
import styled from 'styled-components'

import ThemeToggle from './header/ThemeToggle'

const Wrapper = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;

  ${(props) => props.theme.mq.small} {
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
  }
`
const Left = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
export default function Header(props) {
  return (
    <Wrapper className={props.className}>
      <Left>{props.children}</Left>
      <ThemeToggle />
    </Wrapper>
  )
}
