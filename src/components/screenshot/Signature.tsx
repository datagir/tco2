import React from 'react'
import styled from 'styled-components'
import Ademe from 'components/base/Ademe'
import Marianne from 'components/base/Marianne'
import fabriquedelalogistique from 'components/misc/fabriquedelalogistique.jpg'
import ifpen from 'components/misc/ifpen.jpg'
import tlf from 'components/misc/tlf.png'

// divs are necessary for better screenshot
export default function Signature({
  noMargin,
  center,
  small,
}: {
  noMargin?: boolean
  noLink?: boolean
  center?: boolean
  color?: string
  small?: boolean
}) {
  return (
    <OutsideGrid $noMargin={noMargin} $center={center} $small={small}>
      <MarianneContainer>
        <Marianne />
      </MarianneContainer>
      <div>
        <Ademe />
      </div>
      <Image src={fabriquedelalogistique.src} alt='Fabrique de la logistique' />
      <Image src={ifpen.src} alt='IFPEN' />
      <Image src={tlf.src} alt='TLF' />
    </OutsideGrid>
  )
}

const MarianneContainer = styled.div`
  margin-right: 1.5rem;
`

const OutsideGrid = styled.div<{ $noMargin?: boolean; $center?: boolean; $small?: boolean }>`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: ${({ $center }) => ($center ? 'center' : 'space-around')};
  ${({ $noMargin }) => !$noMargin && 'margin-left: 1.25rem;'}

  ${({ $small }) =>
    $small &&
    `
      position: absolute;
      bottom: 8px;
      right: 8px;
      gap: 0.25rem;
      font-size: 0.5rem !important;
      svg {
        width: auto;
        height: 30px;
      }
    `}
`
const Image = styled.img`
  display: block;
  height: auto;
  max-height: 4rem;
  max-width: 7rem;
  width: auto;
`
