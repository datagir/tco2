import React, {useEffect, useMemo} from 'react'

import Search from './home/Search'
import Charts from './home/Charts'
import {useHistory, useLocation} from "react-router-dom";
import {Categories, CatSelection} from "./home/CatSelection";
import styled from "styled-components";
import {devices} from "../utils/Constants";

const Wrapper = styled.div`
  display: block;
  @media screen and ${devices.sm} {
    display: flex;
    justify-content: center;
  }
`
export default function Home() {
    const location = useLocation();
    const history = useHistory();

    const needCatSelection = useMemo(() => {
        const currentCat = location.pathname.split('/')[1].trim()
        return currentCat==='' || !Categories.map(({key}) => key).includes(currentCat)
    }, [location.pathname])

    useEffect(() => {
        if(location.pathname.split('/').length > 2) {
            history.push({pathname: '/', search: location.search})
        }
    }, [location.pathname, location.search, history])
    return (
        <Wrapper>
            {
                needCatSelection ? <CatSelection />:
                    <>
                        <Search />
                        <Charts />
                    </>
            }
        </Wrapper>
    )
}
