import React, { useEffect, useState } from 'react'
import { NumberParam, StringParam, useQueryParam, withDefault, } from 'use-query-params'

import SearchContext from 'utils/SearchContext'
import { usePosition } from 'hooks/useAddress'
import useTruckDefaultSettings, { selectTruckDefaultParameters } from '../../hooks/useTruckDefaultSettings';
import { updateUsage } from '../../utils/global';

const UsageRepartitionParam = (fullUsage) => ({
  encode: (v => v.map(r => r.percentage)),
  decode: (v => (v && fullUsage && (v.length === fullUsage?.length)
    ?  fullUsage.map((u, index) => ({ ...u, percentage: +v[index] }))
    : undefined))
})

export default function SearchProvider(props) {
  const { data: truckDefaults } = useTruckDefaultSettings()
  const [vehicleCategory, setVehicleCategory] = useQueryParam(
    'vehicleCategory',
    withDefault(StringParam, 'RIGIDTRUCK-12T')
  )
  const defaultSettings = selectTruckDefaultParameters(vehicleCategory, truckDefaults)
  const [totalAnnualDistance, setTotalAnnualDistance] = useQueryParam(
    'totalAnnualDistance',
    withDefault(NumberParam, defaultSettings?.totalAnnualDistance)
  )
  const [payload, setPayload] = useQueryParam(
    'payload',
    withDefault(NumberParam, defaultSettings?.payload)
  )
  const [possessionDuration, setPossessionDuration] = useQueryParam(
    'possessionDuration',
    withDefault(NumberParam, defaultSettings?.possessionDuration)
  )
  const [usesRepartition, setUsesRepartition] = useQueryParam(
    'usesRepartition',
    withDefault(UsageRepartitionParam(defaultSettings?.usesRepartition), defaultSettings?.usesRepartition)
  )
  const [fuelConsumption, setFuelConsumption] = useQueryParam(
    'fuelConsumption',
    withDefault(NumberParam, undefined)
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
          setUsesRepartition(updateUsage(e, usesRepartition))
        },
        start,
        setStart,
        end,
        setEnd,
        costs,
        setCosts,
        fuelConsumption,
        setFuelConsumption
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}
