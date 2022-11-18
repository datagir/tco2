import { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import HorizontalBarChart from '../../../components/charts/HorizontalBarChart';
import SearchContext from '../../../utils/SearchContext';
import useTruckDefaultSettings, {
  selectDefaultUsageName,
  selectTruckDefaultDescription,
  selectTruckDefaultUsages
} from '../../../hooks/useTruckDefaultSettings';
import { parseLocalNumber } from '../../../utils/numberUtils';
import useTruckComparison from '../../../hooks/useTruckComparison';
import { FuelConsumption } from './usage-visualization/FuelConsumption';
import { linearInterpolateColors } from '../../../utils/globalUtils';

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
  min-height: 180px;

  ${(props) => props.theme.mq.small} {
    padding: 1rem 1rem 0.5rem;
  }
`
const UsageDescription = styled.div`
  max-width: 29rem;
  margin: 0 auto 0.5rem;
  text-align: center;
`
/**
 * Chart colors, for building the color scale
 */
const START_COLOR = [0, 120, 240]
const END_COLOR = [151, 228, 255]
const buildChartData = (usesRepartition, category, vehicleDefaults) => {
  const defaultUsageRepartition = selectTruckDefaultUsages(category, vehicleDefaults)
  // Prepare the portions over 1, for the color scale
  // Start adding real diff only if there are more than 2 elements, else just use 1 (will force using the 2 defined colors)
  const linearColorDiff = (defaultUsageRepartition?.length > 1) ? (1 / (defaultUsageRepartition.length - 1)) : 1

  if (defaultUsageRepartition && usesRepartition &&
    defaultUsageRepartition.length !== usesRepartition.length) {
    throw Error('Uses repartition results different from default, please check comparison results')
  }

  return (usesRepartition ?? []).map(({ use, percentage, name }, index) => ({
    use,
    percentage,
    name: name ?? selectDefaultUsageName(category, vehicleDefaults, use),
    fill: linearInterpolateColors(START_COLOR, END_COLOR, linearColorDiff * (index)),
  }))
}

const buildVehicleDescription = (vehicleCategory, defaultSettings, payload, totalAnnualDistance) => {
  const { truckDescription } = selectTruckDefaultDescription(vehicleCategory, defaultSettings)
  return truckDescription ?
    `${truckDescription} chargé à ${payload}% parcourant ${parseLocalNumber(totalAnnualDistance)}km par an selon cet usage:`
    : ''
}

export default function UsageVisualization() {
  const { vehicleCategory, payload, totalAnnualDistance } = useContext(SearchContext)
  // Retrieve current theme for resolving chart style (font..)
  const themeContext = useContext(ThemeContext)

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
    setChartData(buildChartData(comparisonData?.output?.usesRepartition, vehicleCategory, defaultSettings))
  }, [comparisonData, vehicleCategory, defaultSettings])

  return (chartData && isSuccess &&
    <Wrapper>
      <UsageDescription>
        <strong>Voici le cas d'usage que vous avez renseigné:</strong>
        <br />
        <br />
        <p>{vehicleDescription}</p>
      </UsageDescription>
      <ChartWrapper>
        <HorizontalBarChart key='usesRepartitionChart'
                            data={chartData}
                            dataKey={'percentage'}
                            fontColor={themeContext.colors.text}
                            fontSize={13}
                            tooltipBackground={themeContext.colors.secondLight}
                            axisFontColor={themeContext.colors.main}
        />
      </ChartWrapper>
      <FuelConsumption meanFuelConsumption={comparisonData?.output?.meanFuelConsumption} />
    </Wrapper>
  )
}
