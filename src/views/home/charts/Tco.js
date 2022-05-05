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

const Wrapper = styled.div`
  width: 100%;
  height: 400px;
`
export default function Tco() {
  const { data } = useTruckComparison()

  const theme = useTheme()

  return data?.output?.chart ? (
    <Wrapper>
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
    </Wrapper>
  ) : null
}

const CustomTooltip = (test) => {
  return (
    <div>
      Perte de {test.payload.length && test.payload[0].value} € pour un gain de{' '}
      {test.payload.length && test.payload[1].value} tonnes de CO2
    </div>
  )
}
