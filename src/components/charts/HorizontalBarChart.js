import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import React from 'react';

const defaultConfig = {
  fontColor: '#FFFFFF',
  dataKey: '',
  fontSize: 13,
  sections: [
    {
      dataKey: 'a',
      color: '',
    }
  ],
  margins: { left: 30, right: 30, top: 5, bottom: 5 }
}

const ChartWrapper = styled.div`
  width: 100%;
  path {
    transition: d 0.1s ease-in-out;
  }
`

export default function HorizontalBarChart(props) {
  const { height,
    width,
    margin,
    data,
    fontSize,
    fontColor,
    dataKey,
    tooltipBackground,
    axisFontColor
  } = props

  if (!data || !data.length) {
    return null;
  }

  return (
    <ChartWrapper>
      <ResponsiveContainer width={width ?? '100%'} height={height ?? 180}>
        <BarChart data={data} layout="vertical" stackOffset="expand" margin={margin ?? defaultConfig.margins}
                  isAnimationActive={true}>
          <XAxis type="number"
                 hide
                 unit={'%'}
                 minTickGap={0}
                 axisLine={false}
                 interval={0}
          />
          <YAxis
            fill={fontColor}
            type="category"
            interval={0}
            tick={{ stroke: axisFontColor, fontWeight: 300, fontSize: 12 }}
            dataKey="name"
            fontSize={fontSize ?? defaultConfig.fontSize}
          />
          <Tooltip cursor={{ fill: tooltipBackground ?? '#ddd' }}
                   labelStyle={{ color: axisFontColor ?? '#333', fontWeight: 700, background: tooltipBackground }} />
          <Bar
            dataKey={dataKey ?? 'percentage'}
            unit={'%'}
            name={'Usage'}
          >
            <LabelList dataKey={dataKey ?? 'percentage'} position="center" fill={axisFontColor} content={renderLabel} fontSize={13}/>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

function renderLabel(props) {
  const { x, y, fontSize, offset, height, width, value, fill } = props
  const { leftX, color } = width < 30 ? { leftX: width + 5, color: fill } : { leftX: (width / 2 - 8), color: '#333' }
  return <text x={x + leftX }
               y={y + height/2 + offset}
               fill={color}
               fontSize={fontSize || 13}
               fontWeight={'bold'}>{value}%</text>
}
