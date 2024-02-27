import React, {useContext, useMemo} from 'react'
import styled from "styled-components";
import {devices} from "../../utils/Constants";
import coming_soon from 'components/misc/coming_soon.svg'
import grande_logistique from 'components/misc/Grande_logistique.svg'
import logistique_urbaine from 'components/misc/Logistique_urbaine.svg'
import transport_collectif_de_personnes from 'components/misc/Transport_collectif_de_personnes.svg'
import travaux_publics from 'components/misc/Travaux_publics.svg'
import vehicule_leger from 'components/misc/Véhicule_léger.svg'
import SearchContext from "../../utils/SearchContext";

export const Categories = [
    {
        key: 'grande_logistique',
        title: 'Grande logistique',
        img: grande_logistique
    }
    ,{
        key: 'logistique_urbaine',
        title: 'Logistique urbaine',
        img: logistique_urbaine
    },{
        key: 'transport_collectif_de_personnes',
        title: 'Transport collectif de personnes',
        img: transport_collectif_de_personnes
    },{
        key: 'travaux_publics',
        title: 'Travaux public',
        img: travaux_publics
    },{
        key: 'vehicule_leger',
        title: 'véhicule lèger',
        img: vehicule_leger
    },{
        key: 'coming_soon',
        title: 'A venir',
        img: coming_soon
    },
]
Object.freeze(Categories)
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const Cat = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  padding: 15px;
  border-radius: 10px;
  margin-top: 1rem;
  span {
    color: #00875F;
    margin-top: auto;
  }
  img {
    width: 100%;
  }
`
const Label = styled.span`
    color: #00875F;
    font-weight: 700;
    text-align: center;
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and ${devices.sm} {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
    }
`
export const CatSelection = () => {
    const { setCategory } = useContext(SearchContext)
    const cats = useMemo(() => Categories.map(({key, title, img}) => (
        <Cat key={key} onClick={() => setCategory(key)}>
            <div><img src={img} alt={key}/></div>
            <span>{title}</span>
        </Cat>
    )), [setCategory])

    return <Wrapper>
        <Label>Sélectionnez votre usage</Label>
        <Content>
            {cats}
        </Content>
    </Wrapper>
}
