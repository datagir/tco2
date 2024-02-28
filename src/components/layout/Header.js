import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.header`
    position: relative;
    background-color: ${(props) =>
            props.theme.colors[props.iframe ? 'background' : 'footer']};
`
const Content = styled.div`
  margin: 0 1%;
  padding: ${(props) => (props.iframe ? 1 : 2)}rem 1rem;
`
export default function Header() {
  return (
    <Wrapper>
      <Content>
        Description d'outils
      </Content>
    </Wrapper>
  )
}
