import { Bar, BarChart, Label, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

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
    margins: { left: 20, right: 20, top: 10, bottom: 10 }
}

const ChartWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`

const renderCustomLabel = (props) => {
    const { content, customLabel, ...rest } = props;
    const position = props.value > 10 ? 'center' : 'top'

    return <Label {...rest}
                  value={customLabel}
                  position={position}
                  fontSize={props.fontSize || 12}
                  fill={props.fontColor || '#FFFFFF'}
                  fontWeight="Bold" />;
};

export default function HorizontalStackedBarChart(props) {
    const { height, width, margin, data, config } = props

    if (!data || !config || !config.sections) {
        return null;
    }

    return (
        <ChartWrapper>
            <ResponsiveContainer width={width ?? '100%'} height={height ?? 100}>
                <BarChart data={data} layout="vertical" stackOffset="expand" margin={margin ?? defaultConfig.margins}>
                    <XAxis hide type="number" />
                    <YAxis
                        type="category"
                        hide
                        dataKey={config.dataKey}
                        fontSize={config.fontSize ?? defaultConfig.fontSize}
                    />
                    {config.sections.map(s =>
                        (<Bar key={s.dataKey} dataKey={s.dataKey} fill={s.color} stackId={s.stackId}>
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
