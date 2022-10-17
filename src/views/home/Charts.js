import React from 'react'

import Critair from './charts/Critair'
import Summary from './charts/Summary'
import Technologies from './charts/Technologies'
import UsageVisualization from './charts/UsageVisualization';

export default function Charts() {
  return (
    <>
      <UsageVisualization />
      <Summary />
      <Critair />
      <Technologies />
    </>
  )
}
