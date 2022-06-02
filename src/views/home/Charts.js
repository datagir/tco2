import React from 'react'

import Critair from './charts/Critair'
import Summary from './charts/Summary'
import Technologies from './charts/Technologies'

export default function Charts() {
  return (
    <>
      <Summary />
      <Critair />
      <Technologies />
    </>
  )
}
