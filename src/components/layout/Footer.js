import React from 'react'
import styled from 'styled-components'

import useIframe from 'hooks/useIframe'
import MagicLink from 'components/base/MagicLink'
import ContactPrompt from 'components/base/ContactPrompt'
import Marianne from 'components/base/Marianne'
import Ademe from 'components/base/Ademe'
import Datagir from 'components/base/Datagir'
import MobileButtons from './footer/MobileButtons'
import fabriquedelalogistique from 'components/misc/fabriquedelalogistique.jpg'
import ifpen from 'components/misc/ifpen.jpg'
import tlf from 'components/misc/tlf.png'

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
  align-items: center;
  width: ${(props) => (props.iframe ? 'auto' : '100%')};
  margin: 0 auto;
  background-color: #fff;
  border-radius: ${(props) => (props.iframe ? 1 : 0)}rem;
`
const Logos = styled(MagicLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.75rem;
  text-decoration: none;

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
      <LogosWrapper iframe={iframe}>
        <Logos
          to='https://datagir.ademe.fr/'
          aria-label='datagir.ademe.fr'
          noIcon
        >
          <Marianne />
          <Ademe />
          <Datagir />
        </Logos>
        <Logos
          to='https://www.lafabriquedelalogistique.fr/'
          aria-label='lafabriquedelalogistique.fr'
          noIcon
        >
          <Image src={fabriquedelalogistique} alt='Fabrique de la logistique' />
        </Logos>
        <Logos
          to='https://www.ifpenergiesnouvelles.fr/'
          aria-label='https://www.ifpenergiesnouvelles.fr'
          noIcon
        >
          <Image src={ifpen} alt='IFPEN' />
        </Logos>
        <Logos to='https://e-tlf.com' aria-label='https://e-tlf.com' noIcon>
          <Image src={tlf} alt='TLF' />
        </Logos>
      </LogosWrapper>
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
          <h2>D'où viennent ces données ?</h2>
          <p>
            Les facteurs d’émissions proviennent de la{' '}
            <MagicLink to='https://bilans-ges.ademe.fr/fr/accueil/contenu/index/page/presentation/siGras/0'>
              Base Carbone de l’ADEME
            </MagicLink>
            et les consommations s’appuient sur des simulations réalisées par l’
            <MagicLink to='https://www.ifpenergiesnouvelles.fr/'>
              IFPEN
            </MagicLink>
            . L’ensemble des données de ce simulateur (facteurs d’émissions,
            consommations et coûts) ont été comparées et validées par plusieurs
            transporteurs via{' '}
            <MagicLink to='https://www.lafabriquedelalogistique.fr/'>
              la Fabrique de la Logistique
            </MagicLink>
            . Dans une approche de commun, tout acteur peut y contribuer pour
            les faire évoluer et garantir un outil toujours au bon niveau. Le
            détail des méthodes et des données utilisées sont disponibles sur
            la page{' '}
            <MagicLink to='https://wiki.lafabriquedelalogistique.fr/Documentation_verdir_ma_flotte'>
              wiki
            </MagicLink>{' '}
            dédiée.
          </p>
        </Section>
        <Section>
          <ContactPrompt />
        </Section>
      </Content>
      <LogosWrapper iframe={iframe}>
        <Logos
          to='https://datagir.ademe.fr/'
          aria-label='datagir.ademe.fr'
          noIcon
        >
          <Marianne />
          <Ademe />
          <Datagir />
        </Logos>
        <Logos
          to='https://www.lafabriquedelalogistique.fr/'
          aria-label='lafabriquedelalogistique.fr'
          noIcon
        >
          <Image src={fabriquedelalogistique} alt='Fabrique de la logistique' />
        </Logos>
        <Logos
          to='https://www.ifpenergiesnouvelles.fr/'
          aria-label='https://www.ifpenergiesnouvelles.fr'
          noIcon
        >
          <Image src={ifpen} alt='IFPEN' />
        </Logos>
        <Logos to='https://e-tlf.com' aria-label='https://e-tlf.com' noIcon>
          <Image src={tlf} alt='TLF' />
        </Logos>
      </LogosWrapper>
      <Accessibility>accessibilité : non conforme</Accessibility>
    </Wrapper>
  )
}
