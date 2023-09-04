import React from 'react'
import styled from 'styled-components'

import useIframe from 'hooks/useIframe'
import InstallButton from 'components/base/InstallButton'
import HeaderWrapper from 'components/wrappers/HeaderWrapper'
import FooterWrapper from 'components/wrappers/FooterWrapper'
import EmbedWrapper from 'components/wrappers/EmbedWrapper'
import ContactWrapper from 'components/wrappers/ContactWrapper'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${(props) => props.theme.mq.medium} {
    flex-direction: column-reverse;
  }
`
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`
const FullScreen = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  min-height: ${(props) => (props.iframe ? 'none' : '100vh')};
  margin: 0 auto;
  padding: ${(props) => (props.iframe ? 0.75 : 0)}rem 0.75rem
    ${(props) => (props.iframe ? 0 : 5)}rem;
`
export default function Web(props) {
  const iframe = useIframe()

  return (
    <Wrapper>
      <Content>
        <FullScreen iframe={iframe}>
          {!iframe && <HeaderWrapper />}
          <main>{props.children}</main>
        </FullScreen>
        <FooterWrapper iframe={iframe} />
      </Content>
      <EmbedWrapper />
      <ContactWrapper />
      <InstallButton />
    </Wrapper>
  )
}
