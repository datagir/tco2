import React from 'react'
import styled, { useTheme } from 'styled-components'
import {
  ScatterChart,
  Scatter,
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
  margin-bottom: 2rem;
`
const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
  opacity: ${(props) => (props.isFetching ? 0.3 : 1)};
`
const Title = styled.h2`
  text-align: center;
`
const Text = styled.p`
  text-align: center;
`
export default function Summary() {
  const { data, isFetching } = useTruckComparison()

  const theme = useTheme()

  return (
    <Wrapper>
      <Title>
        Gains en CO2 et en €<br />
        par rapport au diesel B7
      </Title>
      <Text>
        Plus un carburant est à droite, plus le gain en € est élevé.
        <br />
        Plus un carburant est en haut, plus le gain en CO2 est élevé
      </Text>
      <DurationSelector />
      {data?.output?.chart && (
        <ChartWrapper isFetching={isFetching}>
          <ResponsiveContainer width='100%' height={400}>
            <ScatterChart
              width={500}
              height={400}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type='number' dataKey='x' name='x' unit=' €' />
              <YAxis type='number' dataKey='y' name='y' unit='&nbsp;tCO2' />

              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {data.output.chart[7].options.series.map((technology) => (
                <Scatter
                  key={technology.name}
                  name={technology.name}
                  data={[
                    {
                      x: technology.data[0][0],
                      y: technology.data[0][1],
                      name: technology.name,
                    },
                  ]}
                  fill={theme.colors.technologies[technology.name]}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </ChartWrapper>
      )}
    </Wrapper>
  )
}

const CustomTooltip = (test) => {
  return (
    <div>
      Perte de {test.payload.length && test.payload[0].value} € pour un gain de{' '}
      {test.payload.length && test.payload[1].value} tonnes de CO2
    </div>
  )
}
