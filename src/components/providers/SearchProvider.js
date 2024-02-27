import React, { useEffect, useState } from 'react'
import { NumberParam, StringParam, useQueryParam, withDefault, } from 'use-query-params'

import SearchContext from 'utils/SearchContext'
import { usePosition } from 'hooks/useAddress'
import useTruckDefaultSettings, { selectTruckDefaultParameters } from '../../hooks/useTruckDefaultSettings';
import { updateUsage } from '../../utils/globalUtils';

export const SearchKeys = {
    Category: 'category',
    VehicleCategory: 'vehicleCategory',
    TotalAnnualDistance: 'totalAnnualDistance',
    Payload: 'payload',
    PossessionDuration: 'possessionDuration',
    UsesRepartition: 'usesRepartition',
    FuelConsumption: 'fuelConsumption'
}
Object.freeze(SearchKeys)
/**
 * Encoding / decoding functions for the usage repartition query params
 *
 * Encoding: [{ use: 'X', percentage: 25 }, { use: 'Y', percentage: 75 }] => '25_75'
 *              (final query param: usesRepartition=25_75)
 *
 * Decoding: '20_80' => [{ use: 'X', percentage: 20 }, { use: 'Y', percentage: 80 }]
 *
 * @param fullUsage the default usage for decoding from query params
 * @returns {{encode: (function(*): *), decode: (function(*): *|undefined)}}
 * @constructor
 */
const usageRepartitionParam = (fullUsage) => ({
  encode: v => v.reduce((memo, current, index) => {
    memo += index === 0 ? current.percentage : `_${current.percentage}`
    return memo
  }, ''),
  decode: v => {
    const usageValues = (v ?? '').split('_')
    return (usageValues && fullUsage && (usageValues.length === fullUsage.length)) ?
      fullUsage.map((u, index) => ({ ...u, percentage: +usageValues[index] }))
      : undefined
  }
})

export default function SearchProvider(props) {
  const { data: truckDefaults } = useTruckDefaultSettings()
  const [category, setCategory] = useQueryParam(
    SearchKeys.Category,
    withDefault(StringParam, '')
  )
  const [vehicleCategory, setVehicleCategory] = useQueryParam(
    SearchKeys.VehicleCategory,
    withDefault(StringParam, 'RIGIDTRUCK-12T')
  )
  const defaultSettings = selectTruckDefaultParameters(vehicleCategory, truckDefaults)
  const [totalAnnualDistance, setTotalAnnualDistance] = useQueryParam(
    SearchKeys.TotalAnnualDistance,
    withDefault(NumberParam, undefined)
  )
  const [payload, setPayload] = useQueryParam(
    SearchKeys.Payload,
    withDefault(NumberParam, undefined)
  )
  const [possessionDuration, setPossessionDuration] = useQueryParam(
    SearchKeys.PossessionDuration,
    withDefault(NumberParam, defaultSettings?.possessionDuration)
  )
  const [usesRepartition, setUsesRepartition] = useQueryParam(
    SearchKeys.UsesRepartition,
    withDefault(usageRepartitionParam(defaultSettings?.usesRepartition), defaultSettings?.usesRepartition)
  )
  const [fuelConsumption, setFuelConsumption] = useQueryParam(
    SearchKeys.FuelConsumption,
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

  useEffect(() => {
    // Reinitialize costs after vehicle selection changed
    setCosts([])
  }, [vehicleCategory])

  return (
    <SearchContext.Provider
      value={{
        category,
        setCategory,
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
