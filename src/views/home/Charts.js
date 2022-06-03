import React from 'react'

import Critair from './charts/Critair'
import Summary from './charts/Summary'
import Tco from './charts/Tco'
import Technologies from './charts/Technologies'

export default function Charts() {
  return (
    <>
      <Summary />
      <Tco />
      <Critair />
      <Technologies />
    </>
  )
}
