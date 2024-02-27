import React, {useContext, useMemo} from 'react'
import Search from './home/Search'
import Charts from './home/Charts'
import {Categories, CatSelection} from "./home/CatSelection";
import styled from "styled-components";
import {devices} from "../utils/Constants";
import SearchContext from "../utils/SearchContext";

const Wrapper = styled.div`
  display: block;
  @media screen and ${devices.sm} {
    display: flex;
    justify-content: center;
  }
`
export default function Home() {
    const { category } = useContext(SearchContext)

    const needCatSelection = useMemo(() => {
        return category==='' || !Categories.map(({key}) => key).includes(category)
    }, [category])
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
