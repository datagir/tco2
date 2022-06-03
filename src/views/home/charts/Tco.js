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
import Button from 'components/base/Button'

const Wrapper = styled.div`
  margin-bottom: 5rem;
`
const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 1rem;
  opacity: ${(props) => (props.isFetching ? 0.3 : 1)};

  svg {
    overflow: visible;
  }
`
export default function Tco() {
  const { data, isFetching, isError } = useTruckComparison()
  const [chart, setChart] = useState(null)
  useEffect(() => {
    if (data?.output) {
      setChart(
        data.output.ghg
          .map((emission, index) => ({
            vehicleTechnology: emission.vehicleTechnology,
            Énergie: data.output.tco[index].energyCost,
            Assurance: data.output.tco[index].insuranceCost,
            Maintenance: data.output.tco[index].maintenanceCost,
            Achat: data.output.tco[index].purchaseCost,
            CO2: -Math.round(
              emission.landUse + emission.tankToWheel + emission.weelToTank
            ),
          }))
          .sort((a, b) => (a.CO2 < b.CO2 ? 1 : -1))
      )
    }
  }, [data])

  const [open, setOpen] = useState(false)
  const theme = useTheme()

  return !isError ? (
    <Wrapper isFetching={isFetching}>
      <Button.Wrapper>
        <Button onClick={() => setOpen((prevOpen) => !prevOpen)} small hollow>
          {open ? 'Cacher' : 'Voir'} le détail du TCO
        </Button>
      </Button.Wrapper>
      {chart && open && (
        <ChartWrapper isFetching={isFetching}>
          <ResponsiveContainer width='100%' height={300}>
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
              <YAxis unit='&nbsp;€' interval={0} />
              <Tooltip content={<CustomTooltip data={data} />} />
              <Legend />
              <Bar
                stackId='a'
                dataKey='Énergie'
                fill={theme.colors.energyCost}
              />
              <Bar
                stackId='a'
                dataKey='Assurance'
                fill={theme.colors.insuranceCost}
              />
              <Bar
                stackId='a'
                dataKey='Maintenance'
                fill={theme.colors.maintenanceCost}
              />
              <Bar
                stackId='a'
                dataKey='Achat'
                fill={theme.colors.purchaseCost}
              />
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
