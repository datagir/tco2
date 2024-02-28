import React, {useContext, useMemo} from 'react'
import Logo from 'components/misc/Logo'
import Search from './home/Search'
import Charts from './home/Charts'
import {Categories, CatSelection} from "./home/CatSelection";
import styled from "styled-components";
import {devices} from "../utils/Constants";
import SearchContext from "../utils/SearchContext";
import MagicLink from "../components/base/MagicLink";
import fabriquedelalogistique from "../components/misc/fabriquedelalogistique.jpg";

const Wrapper = styled.div`
  display: block;
  @media screen and ${devices.sm} {
    display: flex;
    justify-content: center;
  }
`
const Header = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
`

const Image = styled.img`
  display: block;
  width: 4.5rem;
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
  font-size: .6rem;
  font-weight: 700;
  gap: 8px;
  color: #BF3F90;
`;

const Brand = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1.5rem 1rem;
    gap: 8px;
    ${(props) => props.theme.mq.small} {
        margin-bottom: 0.5rem;
        font-size: 0.75rem;
    }
`

const Description = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
        line-height: 1.8rem;
        &:first-child {
            color: #00875F;
            font-weight: 700;
        }
    }
`

export default function Home() {
    const { category } = useContext(SearchContext)

    const needCatSelection = useMemo(() => {
        return category==='' || !Categories.map(({key}) => key).includes(category)
    }, [category])
    return (
      <>
        <Header>
          <Brand>
            <Logo />
            <SeparatorLabel>
              Créé par
              <MagicLink to='https://www.lafabriquedelalogistique.fr/' noIcon={true}>
                <Image src={fabriquedelalogistique} alt='Fabrique de la logistique' />
              </MagicLink>
            </SeparatorLabel>
          </Brand>
          <Description>
            <span>L’outil d'aide à la décision pour renouveler son véhicule de transport de marchandises.</span>
            <span>Comparez le coût et les émissions des énergies alternatives en fonction de vos besoins et de vos usages.</span>
          </Description>
        </Header>
        <Wrapper>
          {
            needCatSelection ? <CatSelection />:
              <>
                <Search />
                <Charts />
              </>
          }
        </Wrapper>
      </>
    )
}
