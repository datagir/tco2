import React from 'react'
import styled from 'styled-components'

import ThemeToggle from './header/ThemeToggle'
import fabriquedelalogistique from 'components/misc/fabriquedelalogistique.jpg'
import MagicLink from 'components/base/MagicLink'

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
const Image = styled.img`
  display: block;
  width: 8rem;
  height: auto;
  margin-right: 0.75rem;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }
`
const SeparatorLabel = styled.div`
  max-width: 8rem;
  margin: 0 1rem 0 .25rem;
  padding: .75rem;
  font-size: 12px;
  border-radius: .75rem;
`;

export default function Header(props) {
  return (
    <Wrapper className={props.className}>
      <Left>
        {props.children}
        <SeparatorLabel>un commun de</SeparatorLabel>
        <MagicLink to='https://www.lafabriquedelalogistique.fr/' noIcon={true}>
          <Image src={fabriquedelalogistique} alt='Fabrique de la logistique' />
        </MagicLink>
      </Left>
      <ThemeToggle />
    </Wrapper>
  )
}
