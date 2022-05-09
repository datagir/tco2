import React from 'react'
import {
  useQueryParam,
  withDefault,
  StringParam,
  NumberParam,
  DelimitedNumericArrayParam,
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

  const [usesRepartition, setUsesRepartition] = useQueryParam(
    'usesRepartition',
    withDefault(DelimitedNumericArrayParam, [40, 40, 30])
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
        usesRepartition,
        setUsesRepartition: (e) => {
          const index = { urbain: 0, extraurbain: 1, autoroute: 2 }[e.name]
          const tempRepartition = [...usesRepartition]
          tempRepartition[index] =
            e.value > 100 ? 100 : e.value < 0 ? 0 : e.value

          let total = tempRepartition.reduce(
            (acc, cur) => Number(acc) + Number(cur),
            0
          )
          let nextIndex = index > 1 ? 0 : index + 1
          if (total !== 100) {
            tempRepartition[nextIndex] =
              tempRepartition[nextIndex] - (total - 100)
            tempRepartition[nextIndex] =
              tempRepartition[nextIndex] < 0 ? 0 : tempRepartition[nextIndex]
          }
          total = tempRepartition.reduce(
            (acc, cur) => Number(acc) + Number(cur),
            0
          )
          nextIndex = nextIndex > 1 ? 0 : nextIndex + 1
          if (total !== 100) {
            tempRepartition[nextIndex] =
              tempRepartition[nextIndex] - (total - 100)
            tempRepartition[nextIndex] =
              tempRepartition[nextIndex] < 0 ? 0 : tempRepartition[nextIndex]
          }
          setUsesRepartition(tempRepartition)
        },
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}
