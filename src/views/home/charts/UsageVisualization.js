import { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import HorizontalStackedBarChart from '../../../components/charts/HorizontalStackedBarChart';
import SearchContext from '../../../utils/SearchContext';
import useTruckDefaultSettings, { selectTruckDefaultDescription } from '../../../hooks/useTruckDefaultSettings';
import { parseLocalNumber } from '../../../utils/numbers';
import useTruckComparison from '../../../hooks/useTruckComparison';
import { FuelConsumption } from './usage-visualization/FuelConsumption';

const Wrapper = styled.div`
  margin-bottom: 1rem;
  padding: 1.5rem 1.5rem 0.5rem;
  background-color: ${(props) => props.theme.colors.secondLight};
  border-radius: 1rem;
`
const ChartWrapper = styled.div`
  margin-bottom: 1rem;
  padding: 1.25rem;
  background-color: ${(props) => props.theme.colors.footerLight};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    padding: 1rem 1rem 0.5rem;
  }
`
const UsageDescription = styled.div`
  max-width: 29rem;
  margin: 0 auto 0.5rem;
  text-align: center;
`

const chartConfig = (theme) => ({
  dataKey: 'name',
  fontColor: theme.colors.text ?? '#333',
  sections: [
    { dataKey: 'URBAN', color: '#00B0F0', stackId: 'a', sectionLabel: 'Urbain' },
    { dataKey: 'INTERURBAN', color: '#53D2FF', stackId: 'a', sectionLabel: 'Extra urbain' },
    { dataKey: 'LONGHAUL', color: '#97E4FF', stackId: 'a', sectionLabel: 'Autoroute' },
  ]
})

const buildChartData = (usesRepartition) => {
  // Percentage cumulation, for calculating the current tick position on the x-axis
  let cumulatedXPosition = 0

  return usesRepartition ? [usesRepartition.reduce((memo, { use, percentage }) => {
    if (percentage === 0) {
      return memo
    }
    memo[use] = percentage
    // Tick must be positioned at the middle of its bar section
    // use previous bar ending position as origin and add half current bar width
    memo.ticks.push((cumulatedXPosition + (percentage / (100 * 2))))
    // Save tick value to display on the X-Axis
    memo.tickLabels.push(percentage)
    // Update right position bar value for next tick
    cumulatedXPosition += percentage / 100
    return memo
  }, { name: 'Repartition', ticks: [], tickLabels: [] })] : null
}

const buildVehicleDescription = (vehicleCategory, defaultSettings, payload, totalAnnualDistance) => {
  const { truckDescription } = selectTruckDefaultDescription(vehicleCategory, defaultSettings)
  return truckDescription ?
    `${truckDescription} chargé à ${ payload }% parcourant ${parseLocalNumber(totalAnnualDistance)}km par an selon cet usage:`
    : ''
}

export default function UsageVisualization() {
  const themeContext = useContext(ThemeContext)
  const { vehicleCategory, payload, totalAnnualDistance } = useContext(SearchContext)

  const { data: defaultSettings, isSuccess } = useTruckDefaultSettings()
  const { data: comparisonData } = useTruckComparison()

  const [chartData, setChartData] = useState(null)
  const [vehicleDescription, setVehicleDescription] = useState(null)

  useEffect(() => {
    setVehicleDescription(buildVehicleDescription(
      vehicleCategory,
      defaultSettings,
      payload,
      totalAnnualDistance))
  }, [vehicleCategory, defaultSettings, payload, totalAnnualDistance])

  useEffect(() => {
    setChartData(buildChartData(comparisonData?.output?.usesRepartition))
  }, [comparisonData])

  return (chartData && isSuccess &&
          <Wrapper>
            <UsageDescription>
              <strong>Voici le cas d'usage que vous avez renseigné:</strong>
              <br/>
              <br/>
              <p>{ vehicleDescription }</p>
            </UsageDescription>
            <ChartWrapper>
              <HorizontalStackedBarChart key='usesRepartitionChart'
                                         data={ chartData }
                                         dataKey={ 'name' }
                                         fontColor={ themeContext.colors.text ?? '#FFFFFF' }
                                         config={ chartConfig(themeContext) }/>
            </ChartWrapper>
            <FuelConsumption/>
          </Wrapper>
  )
}
