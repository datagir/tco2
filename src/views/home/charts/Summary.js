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
const Blue = styled.span`
  color: ${(props) => props.theme.colors.tco};
`
const Green = styled.span`
  color: ${(props) => props.theme.colors.co2};
`
export default function Summary() {
  const { data, isFetching, isError } = useTruckComparison()
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

  return !isError ? (
    <Wrapper isFetching={isFetching}>
      <Text>
        Visualisez pour chaque technologie
        <br />
        le <Blue>coût total de possession à l'année (en bleu)</Blue>
        <br />
        et les <Green>émissions de gaz à effets de serre (en vert)</Green> de
        chaque technologie
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
              maxBarSize={40}
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
              <Tooltip content={<CustomTooltip data={data} />} />
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
              maxBarSize={40}
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
              <Tooltip formatter={(value) => -value + ' gCO2e/km'} />
              <Bar yAxisId='right' dataKey='CO2' fill={theme.colors.co2} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      )}
    </Wrapper>
  ) : null
}

const StyledTooltip = styled.div`
  padding: 0.75rem;
  background-color: ${(props) => props.theme.colors.background};
  border: 0.0675rem solid ${(props) => props.theme.colors.secondLight};
  border-radius: 0.5rem;
`
const Title = styled.h4`
  margin-bottom: 0.75rem;
  color: ${(props) => props.theme.colors.main};
`
const Costs = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`
const Cost = styled.li`
  margin: 0 0 0.5rem;
  padding: 0;
`
const CustomTooltip = (props) => {
  if (props.active && props.payload && props.payload.length) {
    const tco = props.data.output.tco.find(
      (technology) => technology.vehicleTechnology === props.label
    )
    return (
      <StyledTooltip>
        <Title>{props.label}</Title>
        <Costs>
          <Cost>
            Achat : <b>{tco.purchaseCost} €</b>
          </Cost>
          <Cost>
            Assurance : <b>{tco.insuranceCost} €</b>
          </Cost>
          <Cost>
            Énergie : <b>{tco.energyCost} €</b>
          </Cost>
          <Cost>
            Maintenance : <b>{tco.maintenanceCost} €</b>
          </Cost>
        </Costs>
      </StyledTooltip>
    )
  }
  return null
}
