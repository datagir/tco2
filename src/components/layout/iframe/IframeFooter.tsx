import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import { buildCurrentUrlFor } from 'utils/urls'
import useWindow from 'hooks/useWindow'
import Ademe from 'components/base/Ademe'
import Marianne from 'components/base/Marianne'
import Link from 'components/base/buttons/Link'
import fabriquedelalogistique from 'components/misc/fabriquedelalogistique.jpg'
import ifpen from 'components/misc/ifpen.jpg'
import tlf from 'components/misc/tlf.png'

const Wrapper = styled.footer`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledLink = styled(Link)`
  display: block;
  font-size: 0.75rem;
  font-weight: 300;
  margin: 0.75rem auto;
  text-align: center;
`

const Logos = styled.div`
  align-items: center;
  display: flex;
  gap: 32px;
  justify-content: center;
  overflow: hidden;
  text-decoration: none;
  ${MEDIA.LT.SMALL} {
    font-size: 0.75rem;
    padding: 0 0.25rem;
  }
`
const Image = styled.img`
  display: block;
  height: auto;
  max-height: 4rem;
  max-width: 7rem;
  width: auto;
`
export default function IframeFooter() {
  const window = useWindow()
  // @ts-expect-error: TODO
  let actualSrc = window?.location.href.split('iframes')[1] || ''
  if (actualSrc.indexOf('livraison') > 0) {
    actualSrc = '/livraison'
  }
  const fullUrl = buildCurrentUrlFor(actualSrc)
  return (
    <Wrapper>
      <StyledLink href={fullUrl} data-testid='iframe-footer-link'>
        Voir la version détaillée
        <br />
        (et les sources)
      </StyledLink>
      <Logos>
        <Marianne />
        <Ademe />
        <Image src={fabriquedelalogistique.src} alt='Fabrique de la logistique' />
        <Image src={ifpen.src} alt='IFPEN' />
        <Image src={tlf.src} alt='TLF' />
      </Logos>
    </Wrapper>
  )
}
