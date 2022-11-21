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

import useTruckDefaultSettings from 'hooks/useTruckDefaultSettings'
import useTruckComparison from 'hooks/useTruckComparison'
import Button from 'components/base/Button'
import DurationSelector from './summary/DurationSelector'
import { parseLocalNumber } from '../../../utils/numberUtils'

const Wrapper = styled.div`
  margin-bottom: 3rem;
`
const ChartWrapper = styled.div`
  width: 100%;
  height: 450px;
  margin-bottom: 1.5rem;
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
const Disclaimer = styled.p`
  margin-top: 1.5rem; //erk
  text-align: center;
`
export default function Summary() {
  const { data: descriptions } = useTruckDefaultSettings()

  const { data, isFetching, isError } = useTruckComparison()
  const [chart, setChart] = useState(null)
  useEffect(() => {
    if (data?.output && descriptions?.output) {
      setChart(
        data.output.ghg
          .map((emission, index) => ({
            vehicleTechnology:
              descriptions.output.vehicleTechnologiesDescriptions.find(
                (description) =>
                  description.vehicleTechnology === emission.vehicleTechnology
              ).shortName,
            CO2: -Math.round(
              emission.landUse + emission.tankToWheel + emission.weelToTank
            ),
            Énergie: data.output.tco[index].energyCost,
            Assurance: data.output.tco[index].insuranceCost,
            Maintenance: data.output.tco[index].maintenanceCost,
            Achat: data.output.tco[index].purchaseCost,
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
  }, [data, descriptions])

  const theme = useTheme()

  const [detail, setDetail] = useState(false)

  return !isError && chart ? (
    <Wrapper isFetching={isFetching}>
      <Text>
        Visualisez pour chaque technologie
        <br />
        le{' '}
        <Blue>
          coût total de possession à l'année (<strong>TCO</strong>, en bleu)
        </Blue>
        <br />
        et les <Green>émissions de gaz à effets de serre (en vert)</Green> de
        chaque technologie
      </Text>
      <DurationSelector />
      <ChartWrapper isFetching={isFetching}>
        <ResponsiveContainer width='100%' height={250}>
          <BarChart
            width={500}
            height={300}
            data={chart}
            margin={{
              top: detail ? 0 : 22,
              right: 10,
              left: 60,
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
            />
            <YAxis
              dataKey='TCO'
              yAxisId='left'
              unit='&nbsp;€'
              interval={0}
              fontSize={14}
              tickFormatter={parseLocalNumber}
            />
            <Tooltip
              formatter={(value) => parseLocalNumber(value) + ' €'}
            />
            {detail ? (
              <>
                <Legend verticalAlign='top' />
                <Bar
                  stackId='a'
                  yAxisId='left'
                  dataKey='Achat'
                  fill={theme.colors.purchaseCost}
                />
                <Bar
                  stackId='a'
                  yAxisId='left'
                  dataKey='Assurance'
                  fill={theme.colors.insuranceCost}
                />
                <Bar
                  stackId='a'
                  yAxisId='left'
                  dataKey='Maintenance'
                  fill={theme.colors.maintenanceCost}
                />
                <Bar
                  stackId='a'
                  yAxisId='left'
                  dataKey='Énergie'
                  fill={theme.colors.energyCost}
                />
              </>
            ) : (
              <Bar yAxisId='left' dataKey='TCO' fill={theme.colors.tco} />
            )}
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width='100%' height={200}>
          <BarChart
            width={500}
            height={300}
            data={chart}
            margin={{
                top: 0,
                right: 10,
                left: 60,
                bottom: 0,
            } }
            maxBarSize={40}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <YAxis
              interval={0}
              dataKey='CO2'
              yAxisId='right'
              fontSize={14}
              unit='&nbsp;gCO2e/km'
              tickFormatter={(value) => parseLocalNumber(-value)}
            />
            <XAxis dataKey='vehicleTechnology' hide />
            <Tooltip
              formatter={(value) => parseLocalNumber(-value) + ' gCO2e/km'}
            />
            <Bar yAxisId='right' dataKey='CO2' fill={theme.colors.co2} />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
      <Button.Wrapper>
        <Button
          onClick={() => setDetail((prevDetail) => !prevDetail)}
          small
          hollow
        >
          {detail ? 'Cacher' : 'Voir'} le détail du TCO
        </Button>
      </Button.Wrapper>
      <Disclaimer>
        <strong>
          CO<sub>2</sub>e (CO2 équivalent)
        </strong>
        . Sont incluses les émissions directes, et la production et distribution
        de carburant et d'électricité.{' '}
        <strong>La construction des véhicules</strong> (camions, batteries…){' '}
        <strong>et des infrastructures</strong> (routes, entrepôts, stations
        d’avitaillement...) <strong>n'est pas incluse</strong>.
      </Disclaimer>
    </Wrapper>
  ) : null
}
