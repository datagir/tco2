import { Bar, BarChart, Label, LabelList, Rectangle, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import React, { useState } from 'react';
import { isNil } from '../../utils/global';

const defaultConfig = {
    fontColor: '#FFFFFF',
    dataKey: '',
    fontSize: 12,
    sections: [
        {
            dataKey: 'a',
            color: '',
        }
    ],
    margins: { left: 30, right: 30, top: 30, bottom: 10 }
}

const ChartWrapper = styled.div`
  width: 100%;
`

const renderCustomLabel = (props) => {
    const { content, customLabel, ...rest } = props;
    const position = props.value > 10 ? 'center' : 'top'

    return (props.value && <Label {...rest}
                  value={customLabel}
                  position={position}
                  fontSize={props.fontSize || 12}
                  fill={props.fontColor || '#FFFFFF'}
                  pointerEvents={'none'}
                  fontWeight="Bold" />)
}

export default function HorizontalStackedBarChart(props) {
    const { height, width, margin, data, config } = props
    const [hoveredBar, setHoveredBar] = useState(null)

    if (!data || !data.length || !config || !config.sections) {
        return null;
    }
    const { ticks, tickLabels } = data[0]
    const formatTick = (value, index) => value ? tickLabels[index] : null

    return (
        <ChartWrapper>
            <ResponsiveContainer width={width ?? '100%'} height={height ?? 120}>
                <BarChart data={data} layout="vertical" stackOffset="expand" margin={margin ?? defaultConfig.margins} isAnimationActive={true}>
                    <XAxis type="number"
                           ticks={ticks}
                           unit={'%'}
                           axisLine={false}
                           tickFormatter={formatTick}
                           tick={{ fill: props.fontColor }}/>
                    <YAxis
                        type="category"
                        hide
                        dataKey={config.dataKey}
                        fontSize={config.fontSize ?? defaultConfig.fontSize}
                    />
                    {config.sections.map(s =>
                        (<Bar key={s.dataKey}
                              dataKey={s.dataKey}
                              fill={s.color}
                              stackId={s.stackId}
                              shape={props => {
                                  // Stacked bars are identified by their first interval value
                                  const active = !isNil(hoveredBar) && (props.value[0] === hoveredBar)
                                  // Make hovered bar thicker
                                  if (active) {
                                      props.height += 5;
                                      props.y -= 2.5;
                                  }
                                  return <Rectangle {...props} />
                              }}
                              onMouseEnter={(prop) => setHoveredBar(prop.value[0])}
                              onMouseLeave={() => setHoveredBar(null)}>
                            <LabelList
                                dataKey={s.dataKey}
                                fontSize={config.fontSize ?? defaultConfig.fontSize}
                                fontColor={config.fontColor ?? defaultConfig.fontColor}
                                position={s.position ?? 'center'}
                                customLabel={s.sectionLabel}
                                content={ renderCustomLabel }
                            />
                        </Bar>)) }
                </BarChart>
            </ResponsiveContainer>
        </ChartWrapper>
    )
}
