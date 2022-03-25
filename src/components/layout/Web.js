import React from 'react'
import styled from 'styled-components'
import { Container } from '@dataesr/react-dsfr'
import Header from './Header'
import Footer from './Footer'

const StyledContainer = styled(Container)`
  max-width: 52rem;
  min-height: 100vh;
  padding-top: 3rem;
  padding-bottom: 3rem;
`
export default function Web(props) {
  return (
    <>
      <Header />
      <StyledContainer role='main'>{props.children}</StyledContainer>
      <Footer />
    </>
  )
}
