import React from 'react'

import Critair from './charts/Critair'
import Summary from './charts/Summary'
import Technologies from './charts/Technologies'
import UsageVisualization from './charts/UsageVisualization';
import styled from "styled-components";
import {devices} from "../../utils/Constants";

const Wrapper = styled.div`
  @media screen and ${devices.sm} {
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
  }
`
export default function Charts() {
  return (
    <Wrapper>
      <UsageVisualization />
      <Summary />
      <Critair />
      <Technologies />
    </Wrapper>
  )
}
