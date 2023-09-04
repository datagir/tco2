import React, {useCallback, useMemo} from 'react'
import styled from "styled-components";
import {useHistory, useLocation} from "react-router-dom";
import {devices} from "../../utils/Constants";
import cityDistribution from 'components/misc/city-distribution.svg'
import municipal from 'components/misc/municipal.svg'
import regional from 'components/misc/regional.svg'
import construction from 'components/misc/construction.svg'
import shuttle from 'components/misc/shuttle.svg'

export const Categories = [
    {
        key: 'city-distribution',
        title: 'Livraison urbaine',
        img: cityDistribution
    },{
        key: 'national',
        title: 'National',
        img: municipal
    },{
        key: 'regional',
        title: 'Régional',
        img: regional
    },{
        key: 'construction',
        title: 'Travaux public',
        img: construction
    },{
        key: 'shuttle',
        title: 'Trajet',
        img: shuttle
    },
]
Object.freeze(Categories)
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and ${devices.sm} {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }
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
    margin-top: auto;
  }
  img {
    width: 100%;
  }
`
export const CatSelection = () => {
    const history = useHistory();
    const location = useLocation();

    const onSelection = useCallback(key => {
        history.push({ pathname: `/${key}`, search: location.search })
    }, [location?.search, history])
    const cats = useMemo(() => Categories.map(({key, title, img}) => (
        <Cat key={key} onClick={() => onSelection(key)}>
            <div><img src={img} alt={key}/></div>
            <span>{title}</span>
        </Cat>
    )), [onSelection])
    return <Wrapper>
        {cats}
    </Wrapper>
}
