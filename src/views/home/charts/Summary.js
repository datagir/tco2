import React, { useState, useEffect } from 'react'
import styled, { useTheme } from 'styled-components'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import useTruckComparison from 'hooks/useTruckComparison'
import DurationSelector from './summary/DurationSelector'

const Wrapper = styled.div`
  margin-bottom: 5rem;
`
const ChartWrapper = styled.div`
  width: 100%;
  height: 450px;
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
        data.output.ghg
          .map((emission, index) => ({
            vehicleTechnology: emission.vehicleTechnology,
            CO2: -Math.round(
              emission.landUse + emission.tankToWheel + emission.weelToTank
            ),
            TCO: Math.round(
              data.output.tco[index].energyCost +
                data.output.tco[index].insuranceCost +
                data.output.tco[index].maintenanceCost +
                data.output.tco[index].purchaseCost
            ),
          }))
          .sort((a, b) => (a.CO2 < b.CO2 ? 1 : -1))
      )
    }
  }, [data])

  const theme = useTheme()

  return (
    <Wrapper isFetching={isFetching}>
      <Text>
        Visualisez pour chaque technologie
        <br />
        le <Green>coût total de possession à l'année (en bleu)</Green>
        <br />
        et <Blue>l'impact climatique (en vert)</Blue> de chaque technologie
      </Text>
      <DurationSelector />
      {chart && (
        <ChartWrapper isFetching={isFetching}>
          <ResponsiveContainer width='100%' height={250}>
            <BarChart
              width={500}
              height={300}
              data={chart}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
              barSize={40}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='vehicleTechnology'
                interval={0}
                fontSize={14}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.replace('DIESEL-', '')}
              />
              <YAxis dataKey='TCO' yAxisId='left' unit='&nbsp;€' interval={0} />
              <Tooltip />
              <Bar yAxisId='left' dataKey='TCO' fill={theme.colors.tco} />
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width='100%' height={200}>
            <BarChart
              width={500}
              height={300}
              data={chart}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
              barSize={40}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <YAxis
                interval={0}
                dataKey='CO2'
                yAxisId='right'
                unit='&nbsp;gCO2e/km'
                tickFormatter={(value) => -value}
              />
              <XAxis dataKey='vehicleTechnology' hide />
              <Tooltip />
              <Bar yAxisId='right' dataKey='CO2' fill={theme.colors.co2} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      )}
    </Wrapper>
  )
}
