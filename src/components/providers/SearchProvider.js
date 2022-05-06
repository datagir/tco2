import React from 'react'
import {
  useQueryParam,
  withDefault,
  StringParam,
  NumberParam,
} from 'use-query-params'

import SearchContext from 'utils/SearchContext'

export default function SearchProvider(props) {
  const [vehicleCategory, setVehicleCategory] = useQueryParam(
    'vehicleCategory',
    withDefault(StringParam, 'RIGIDTRUCK-12T')
  )
  const [totalAnnualDistance, setTotalAnnualDistance] = useQueryParam(
    'totalAnnualDistance',
    withDefault(NumberParam, 1000)
  )
  const [possessionDuration, setPossessionDuration] = useQueryParam(
    'possessionDuration',
    withDefault(NumberParam, 10)
  )

  return (
    <SearchContext.Provider
      value={{
        vehicleCategory,
        setVehicleCategory,
        totalAnnualDistance,
        setTotalAnnualDistance,
        possessionDuration,
        setPossessionDuration,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}
