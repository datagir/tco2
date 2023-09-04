import React, {useState, useEffect, useContext, useCallback} from 'react'
import styled, {useTheme} from 'styled-components'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer, Cell,
} from 'recharts'

import useTruckDefaultSettings from 'hooks/useTruckDefaultSettings'
import useTruckComparison from 'hooks/useTruckComparison'
import Button from 'components/base/Button'
import DurationSelector from './summary/DurationSelector'
import {parseLocalNumber} from '../../../utils/numberUtils'
import SearchContext from "../../../utils/SearchContext";
import {isTechnologyAvailable} from "../../../utils/globalUtils";

const Wrapper = styled.div`
  max-width: 44rem;
  margin: 0 auto 3rem auto;
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
const Small = styled.p`
  margin: 0 6rem 1rem;
  font-size: 0.75rem;
  text-align: center;
`
const Blue = styled.span`
  color: ${(props) => props.theme.colors.tco};
`
const Green = styled.span`
  color: ${(props) => props.theme.colors.co2};
`
const Warn = styled.span`
  color: ${(props) => props.theme.colors.textLight};
`
const Disclaimer = styled.p`
  margin-top: 1.5rem; //erk
  text-align: center;
`

const TEXT_VE_BATTERY_WARN = 'Le TCO du véhicule électrique pour une durée de possession supérieure à 7 ans ne prends pas en compte le coût de renouvellement de la batterie.'
const TEXT_COMING_SOON = 'Energie bientôt renseignée.'

const getBarColor = (theme, color, unavailable = false) => {
    let colorKey = color
    switch (color){
        case 'Achat':
            colorKey = 'purchaseCost'
            break;
        case 'Assurance':
            colorKey = 'insuranceCost'
            break;
        case 'Maintenance':
            colorKey = 'maintenanceCost'
            break;
        case 'Énergie':
            colorKey = 'energyCost'
            break;
        case 'TCO':
            colorKey = 'tco'
            break;
        case 'CO2':
            colorKey = 'co2'
            break;
        default:
    }
    return unavailable ? theme.colors.textLight : theme.colors[colorKey]
}

const CustomTooltip = ({active, contentStyle, labelStyle, label, formatter, itemStyle, payload}) => {
    const theme = useTheme()
    if (active && payload && payload.length) {
        const finalStyle = {
            margin: 0,
            padding: 10,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            whiteSpace: 'nowrap',
            ...contentStyle,
        };
        const finalLabelStyle = {
            margin: 0,
            ...labelStyle,
        };
        const finalItemStyle = {
            display: 'block',
            paddingTop: 4,
            paddingBottom: 4,
            ...itemStyle,
        }
        const listStyle = {padding: 0, margin: 0};
        const items = payload[0]?.payload.unavailable ? [(
            <li className="recharts-tooltip-item" key={`tooltip-item-unavailable`} style={{...finalItemStyle, color: theme.colors.textLight,}}>
                <span className="recharts-tooltip-item-name">{TEXT_COMING_SOON}</span>
            </li>
        )] : payload.map((entry, i) => {
            let {name, value} = entry;
            return (
                <li className="recharts-tooltip-item" key={`tooltip-item-${i}`} style={{...finalItemStyle, color: entry.color || '#000'}}>
                    <span className="recharts-tooltip-item-name">{name}</span>
                    :
                    <span className="recharts-tooltip-item-value">{formatter(value, name)}</span>
                    <span className="recharts-tooltip-item-unit">{entry.unit || ''}</span>
                </li>
            )
        })
        if(payload[0]?.payload.warn){
            items.unshift(
                <li className="recharts-tooltip-item" key={`tooltip-item-unavailable`} style={{...finalItemStyle, color: theme.colors.textLight,}}>
                    <span className="recharts-tooltip-item-name">{payload[0]?.payload.warn}</span>
                </li>
            )
        }
        return (
            <div style={finalStyle}>
                <p style={finalLabelStyle}>{label}</p>
                <ul className="recharts-tooltip-item-list" style={listStyle}>
                    {items}
                </ul>
            </div>
        );
    }
    return null;
};

export default function Summary() {
    const {data: descriptions} = useTruckDefaultSettings()
    const {possessionDuration} = useContext(SearchContext)
    const {data, isFetching, isError} = useTruckComparison()
    const [chart, setChart] = useState(null)
    useEffect(() => {
        if (data?.output && descriptions?.output) {
            setChart(
                data.output.ghg
                    .map((emission, index) => {
                        const vehicleTechnology = descriptions.output.vehicleTechnologiesDescriptions
                            .find((description) =>
                                description.vehicleTechnology === emission.vehicleTechnology
                            )
                        const d = {
                            vehicleTechnology: vehicleTechnology.shortName,
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
                        }
                        if (descriptions.output.vehicleCategoriesDescriptions
                            .some(desc => isTechnologyAvailable(desc.vehicleTechnologiesAvailability.find(tech => tech.vehicleTechnology === emission.vehicleTechnology)))) {
                            // set unavailable flag
                            d.unavailable = true
                        }
                        return d
                    })
                    .sort((a, b) => (a.CO2 < b.CO2 ? 1 : -1))
            )
        }
    }, [data, descriptions, possessionDuration])

    const theme = useTheme()

    const [detail, setDetail] = useState(false)

    const buildBars = useCallback((dataKeys, yAxisId, withLegend = false) => {
        const items = dataKeys.map(key => (
            <Bar key={key} stackId='a' yAxisId={yAxisId} dataKey={key} fill={getBarColor(theme, key)}>
                {chart?.map(({vehicleTechnology, unavailable}, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(theme, key, unavailable)}/>))}
            </Bar>
        ))
        return (
            <>
                {withLegend && (<Legend verticalAlign='top'/>)}
                {items}
            </>
        )
    }, [theme, chart])

    return !isError && chart ? (
        <Wrapper isFetching={isFetching}>
            <Text>
                Visualisez pour chaque technologie
                <br/>
                le{' '}
                <Blue>
                    coût total de possession à l'année (<strong>TCO</strong>, en bleu)
                </Blue>
                <br/>
                et les <Green>émissions de gaz à effets de serre (en vert)</Green> de
                chaque technologie
            </Text>
            <DurationSelector/>
            {
                (possessionDuration > 6) && (
                    <Small>
                        <Warn>{TEXT_VE_BATTERY_WARN}</Warn>
                    </Small>
                )
            }
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
                        <CartesianGrid strokeDasharray='3 3'/>
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
                            content={<CustomTooltip/>}
                        />
                        {buildBars(detail ? ['Achat', 'Assurance', 'Maintenance', 'Énergie'] : ['TCO'], 'left', detail)}
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
                        }}
                        maxBarSize={40}
                    >
                        <CartesianGrid strokeDasharray='3 3'/>
                        <YAxis
                            interval={0}
                            dataKey='CO2'
                            yAxisId='right'
                            fontSize={14}
                            unit='&nbsp;gCO2e/km'
                            tickFormatter={(value) => parseLocalNumber(-value)}
                        />
                        <XAxis dataKey='vehicleTechnology' hide/>
                        <Tooltip
                            formatter={(value) => parseLocalNumber(-value) + ' gCO2e/km'}
                            content={<CustomTooltip/>}
                        />
                        <Bar yAxisId='right' dataKey='CO2' fill={getBarColor(theme, 'co2')}>
                            {chart?.map(({vehicleTechnology, unavailable}, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(theme, 'co2', unavailable)}/>))}
                        </Bar>
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
