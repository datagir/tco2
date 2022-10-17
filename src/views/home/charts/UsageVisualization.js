import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import HorizontalStackedBarChart from '../../../components/charts/HorizontalStackedBarChart';
import SearchContext from '../../../utils/SearchContext';
import useTruckDefaultSettings from '../../../hooks/useTruckDefaultSettings';
import { removeTrailingDot } from '../../../utils/strings';
import { parseLocalNumber } from '../../../utils/numbers';

const Wrapper = styled.div`
  margin-bottom: 1rem;
  padding: 1.5rem 1.5rem 0.5rem;
  background-color: ${(props) => props.theme.colors.secondLight};
  border-radius: 1rem;
`
const UsageDescription = styled.div`
  max-width: 29rem;
  margin: 0 auto 0.5rem;
  text-align: center;
`
const REPARTITION_INFO = [
  { name: 'URBAN' },
  { name: 'INTERURBAN' },
  { name: 'LONGHAUL' },
]

const chartConfig = {
  dataKey: 'name',
  fontColor: '#333',
  sections: [
    { dataKey: 'URBAN', color: '#00B0F0', stackId: 'a', sectionLabel: 'Urbain' },
    { dataKey: 'INTERURBAN', color: '#53D2FF', stackId: 'a', sectionLabel: 'Extra urbain' },
    { dataKey: 'LONGHAUL', color: '#97E4FF', stackId: 'a', sectionLabel: 'Autoroute' },
  ]
}

const buildChartData = (usesRepartition) => {
  return [(usesRepartition ?? []).reduce((memo, percentage, index) => {
    if (index >= REPARTITION_INFO.length) {
      throw Error('Could not build uses repartition chart data, please check input format: ' + usesRepartition)
    }
    const info = REPARTITION_INFO[index]
    if (percentage) {
      memo[info.name] = percentage
    }
    return memo
  }, { name: 'Repartition' })]
}

const buildVehicleDescription = (selectedCategory, categoryDescriptions, payload, totalAnnualDistance) => {
  const vehicleInfo = (categoryDescriptions ?? []).find(c => c.vehicleCategory === selectedCategory)
  return vehicleInfo ?
      `${ removeTrailingDot(vehicleInfo.description) } chargé à ${ payload }% parcourant ${ parseLocalNumber(totalAnnualDistance) }km par an selon cet usage:`
      : ''
}

export default function UsageVisualization() {
  const { data } = useTruckDefaultSettings()
  const descriptions = data?.output?.vehicleCategoriesDescriptions

  const { usesRepartition, vehicleCategory, payload, totalAnnualDistance } = useContext(SearchContext)
  const [chartData, setChartData] = useState(null)
  const [vehicleDescription, setVehicleDescription] = useState(null)

  useEffect(() => {
    setVehicleDescription(buildVehicleDescription(
        vehicleCategory,
        descriptions,
        payload,
        totalAnnualDistance))
  }, [descriptions, vehicleCategory, payload, totalAnnualDistance])

  useEffect(() => {
    setChartData(buildChartData(usesRepartition))
  }, [usesRepartition])

  return (chartData ?
          <Wrapper>
            <UsageDescription>
              <strong>Voici le cas d'usage que vous avez renseigné:</strong>
              <br/>
              <br/>
              <p>{ vehicleDescription }</p>
            </UsageDescription>
            <HorizontalStackedBarChart key='usesRepartitionChart' data={ chartData } dataKey={ 'name' }
                                       fontColor={ '#FFFFFF' } config={ chartConfig }/>
          </Wrapper> : null
  )
}
