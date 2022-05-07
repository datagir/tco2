import React, { useState, useEffect } from 'react'
import styled, { useTheme } from 'styled-components'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import useTruckComparison from 'hooks/useTruckComparison'
import DurationSelector from './summary/DurationSelector'

const Wrapper = styled.div`
  margin-bottom: 5rem;
`
const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
  opacity: ${(props) => (props.isFetching ? 0.3 : 1)};

  svg {
    overflow: visible;
  }
`
const Text = styled.p`
  margin-bottom: 1.5rem;
  text-align: center;
`
const Green = styled.span`
  color: ${(props) => props.theme.colors.tco};
`
const Blue = styled.span`
  color: ${(props) => props.theme.colors.co2};
`
export default function Summary() {
  const { data, isFetching } = useTruckComparison()
  const [chart, setChart] = useState(null)
  useEffect(() => {
    if (data?.output) {
      setChart(
        data.output.ghg.map((emission, index) => ({
          vehicleTechnology: emission.vehicleTechnology,
          CO2: Math.round(
            emission.landUse + emission.tankToWheel + emission.weelToTank
          ),
          TCO: Math.round(
            data.output.tco[index].energyCost +
              data.output.tco[index].insuranceCost +
              data.output.tco[index].maintenanceCost +
              data.output.tco[index].purchaseCost
          ),
        }))
      )
    }
  }, [data])

  const theme = useTheme()

  return (
    <Wrapper>
      <Text>
        Visualisez pour chaque technologie
        <br />
        le <Green>coût total de possession à l'année (en vert)</Green>
        <br />
        et <Blue>l'impact climatique (en bleu)</Blue> de chaque technologie
      </Text>
      <DurationSelector />
      {chart && (
        <ChartWrapper isFetching={isFetching}>
          <ResponsiveContainer width='100%' height={400}>
            <BarChart
              width={500}
              height={300}
              data={chart}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='vehicleTechnology'
                interval={0}
                tick={<CustomizedAxisTick />}
              />
              <YAxis dataKey='TCO' yAxisId='left' unit='&nbsp;€' />
              <YAxis
                dataKey='CO2'
                yAxisId='right'
                unit='&nbsp;gCO2e/km'
                orientation='right'
              />
              <Tooltip />
              <Legend verticalAlign='top' />
              <Bar yAxisId='left' dataKey='TCO' fill={theme.colors.tco} />
              <Bar yAxisId='right' dataKey='CO2' fill={theme.colors.co2} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      )}
    </Wrapper>
  )
}

const CustomizedAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={16}
      fontSize={12}
      textAnchor='end'
      fill='#666'
      transform='rotate(-35)'
    >
      {payload.value}
    </text>
  </g>
)
