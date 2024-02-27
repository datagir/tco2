import React from 'react'
import styled from 'styled-components'

import ThemeToggle from './header/ThemeToggle'
import fabriquedelalogistique from 'components/misc/fabriquedelalogistique.jpg'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.header`
  
`
const Left = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  //justify-content: flex-start;
  //align-items: center;
`
const Image = styled.img`
  display: block;
  width: 6.5rem;
  height: auto;
  margin-right: 0.75rem;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }
`
const SeparatorLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .8rem;
  font-weight: 700;
  gap: 8px;
  color: #BF3F90;
`;

const Brand = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    margin: 1.5rem auto;
    width: 44rem;
    ${(props) => props.theme.mq.small} {
        margin-bottom: 0.5rem;
        font-size: 0.75rem;
    }
`

const Description = styled.div`
    display: flex;
    flex-direction: column;
    padding: 4rem 0;
    span {
        text-align: center;
        line-height: 1.8rem;
        &:first-child {
            color: #00875F;
            font-weight: 700;
        }
    }
`

export default function Header(props) {
  return (
    <Wrapper className={props.className}>
        <Brand>
            <Left>
                {props.children}
                <SeparatorLabel>
                  Créé par
                  <MagicLink to='https://www.lafabriquedelalogistique.fr/' noIcon={true}>
                    <Image src={fabriquedelalogistique} alt='Fabrique de la logistique' />
                  </MagicLink>
                </SeparatorLabel>
            </Left>
            <ThemeToggle />
        </Brand>
        <Description>
            <span>L’outil d'aide à la décision pour renouveler son véhicule de transport de marchandises.</span>
            <span>Comparez le coût et les émissions des énergies alternatives en fonction de vos besoins et de vos usages.</span>
        </Description>
    </Wrapper>
  )
}
