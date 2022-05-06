import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`
const Item = styled.li`
  color: ${(props) => props.theme.colors.technologies[props.technology]};
`
export default function List(props) {
  return (
    <Wrapper>
      {props.data.output.chart[5].options.series[0].data.map(
        (level, index) =>
          level === props.level && (
            <Item
              key={props.data.output.chart[5].options.xAxis.data[index]}
              technology={props.data.output.chart[5].options.xAxis.data[index]}
            >
              {props.data.output.chart[5].options.xAxis.data[index]}
            </Item>
          )
      )}
    </Wrapper>
  )
}
