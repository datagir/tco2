import React, { useState, useEffect } from 'react'
import {
  useQueryParam,
  withDefault,
  StringParam,
  NumberParam,
  DelimitedNumericArrayParam,
} from 'use-query-params'

import SearchContext from 'utils/SearchContext'
import { usePosition } from 'hooks/useAddress'

export default function SearchProvider(props) {
  const [vehicleCategory, setVehicleCategory] = useQueryParam(
    'vehicleCategory',
    withDefault(StringParam, 'RIGIDTRUCK-12T')
  )
  const [totalAnnualDistance, setTotalAnnualDistance] = useQueryParam(
    'totalAnnualDistance',
    withDefault(NumberParam, 60000)
  )
  const [payload, setPayload] = useQueryParam(
    'payload',
    withDefault(NumberParam, 60)
  )
  const [possessionDuration, setPossessionDuration] = useQueryParam(
    'possessionDuration',
    withDefault(NumberParam, 5)
  )

  const [usesRepartition, setUsesRepartition] = useQueryParam(
    'usesRepartition',
    withDefault(DelimitedNumericArrayParam, [20, 20, 60])
  )

  const [start, setStart] = useState(null)

  const { data: startPlaceData } = usePosition(start?.locationId)
  useEffect(() => {
    startPlaceData &&
      setStart((prevStart) => ({
        ...prevStart,
        ...startPlaceData,
      }))
  }, [startPlaceData, setStart])

  const [end, setEnd] = useState(null)
  const { data: endPlaceData } = usePosition(end?.locationId)
  useEffect(() => {
    endPlaceData &&
      setEnd((prevEnd) => ({
        ...prevEnd,
        ...endPlaceData,
      }))
  }, [endPlaceData, setEnd])

  const [costs, setCosts] = useState([])

  return (
    <SearchContext.Provider
      value={{
        vehicleCategory,
        setVehicleCategory,
        totalAnnualDistance,
        setTotalAnnualDistance,
        payload,
        setPayload,
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
        start,
        setStart,
        end,
        setEnd,
        costs,
        setCosts,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}
