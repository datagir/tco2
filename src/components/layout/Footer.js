import React from 'react'
import styled from 'styled-components'

import useIframe from 'hooks/useIframe'
import MagicLink from 'components/base/MagicLink'
import ContactPrompt from 'components/base/ContactPrompt'
import Marianne from 'components/base/Marianne'
import Ademe from 'components/base/Ademe'
import Datagir from 'components/base/Datagir'
import MobileButtons from './footer/MobileButtons'
import fabriquedelalogistique from 'components/misc/fabriquedelalogistique.png'

const Wrapper = styled.footer`
  position: relative;
  background-color: ${(props) =>
    props.theme.colors[props.iframe ? 'background' : 'footer']};
`
const Content = styled.div`
  max-width: ${(props) => props.width || '37rem'};
  margin: 0 auto;
  padding: ${(props) => (props.iframe ? 1 : 2)}rem 1rem 1rem;
`
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  p {
    width: 100%;
  }
  h2,
  h3 {
    width: 100%;
    font-size: 1.75rem;
  }
`
const LogosWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Logos = styled(MagicLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.iframe ? 'auto' : '100%')};
  margin: 0 auto;
  padding: 0 0.75rem;
  text-decoration: none;
  background-color: #fff;
  border-radius: ${(props) => (props.iframe ? 1 : 0)}rem;

  ${(props) => props.theme.mq.small} {
    padding: 0 0.25rem;
    font-size: ${(props) => (props.iframe ? 0.75 : 1)}rem;
  }
`
const Image = styled.img`
  display: block;
  width: 7rem;
  height: auto;
`
const Accessibility = styled.p`
  margin: 0;
  padding-bottom: 1rem;
  font-size: 0.75rem;
  font-weight: 300;
  text-align: center;
  background-color: ${(props) => props.theme.colors.background};
`
export default function Footer(props) {
  const iframe = useIframe()
  return iframe ? (
    <>
      <MobileButtons iframe={iframe} />
      <Logos
        to='https://datagir.ademe.fr/'
        aria-label='datagir.ademe.fr'
        iframe
        noIcon
      >
        <Marianne />
        <Ademe />
        <Datagir />
      </Logos>
    </>
  ) : (
    <Wrapper
      className={props.className}
      background={props.background}
      iframe={iframe}
      id='apropos'
    >
      <Content iframe={iframe}>
        <MobileButtons iframe={iframe} />

        <Section>{props.children}</Section>
        <Section>
          <ContactPrompt />
        </Section>
      </Content>
      <LogosWrapper>
        <Logos
          to='https://datagir.ademe.fr/'
          aria-label='datagir.ademe.fr'
          noIcon
        >
          <Marianne />
          <Ademe />
          <Datagir />
          <Image src={fabriquedelalogistique} alt='Fabrique de la logistique' />
        </Logos>
      </LogosWrapper>
      <Accessibility>accessibilité : non conforme</Accessibility>
    </Wrapper>
  )
}
