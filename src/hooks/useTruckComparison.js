import { useContext } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

import SearchContext from 'utils/SearchContext'
import useDebounce from './useDebounce';
import { isEmpty, isNil } from '../utils/global';
import useTruckDefaultSettings from './useTruckDefaultSettings';

const areLocationsReady = (start, end) => {
  const locations = [start?.longitude, start?.latitude, end?.longitude, end?.latitude];
  return (isNil(start) && isNil(end)) || ((!isNil(start) && !isNil(end)) &&
    (locations.every(v => isNil(v)) || (locations.every(v => !isNil(v))))
  )
}

export default function useTruckComparison() {
  const {
    vehicleCategory,
    totalAnnualDistance,
    possessionDuration,
    usesRepartition,
    start,
    end,
    payload,
    costs,
    fuelConsumption
  } = useContext(SearchContext)

  const debouncedCosts = useDebounce(costs)
  const debouncedPossessionDuration = useDebounce(possessionDuration)
  const debouncedFuelConsumption = useDebounce(fuelConsumption)
  const debouncedPayload = useDebounce(payload)
  const debouncedUsesRepartition = useDebounce(usesRepartition)
  const debouncedTotalAnnualDistance = useDebounce(totalAnnualDistance)

  const { data: token } = useToken()
  const { data: defaultSettings } = useTruckDefaultSettings()
  // Disable query while locations are partially filled or default settings are not ready yet
  const enabled = areLocationsReady(start, end) && !isEmpty(debouncedUsesRepartition) && !!defaultSettings
  return useQuery(
    [
      'truckComparison',
      token,
      vehicleCategory,
      debouncedTotalAnnualDistance,
      debouncedPossessionDuration,
      debouncedUsesRepartition,
      start,
      end,
      debouncedPayload,
      debouncedCosts,
      debouncedFuelConsumption,
    ],
    () =>
      token
        ? axios
            .post(
              `https://staging--tco2.netlify.app/.netlify/functions/getTruckComparison?token=${token}`,
              {
                vehicle: { vehicleCategory },
                use: {
                  operatingRange: 'URBAN',
                  usesRepartitionNew: debouncedUsesRepartition,
                  OriginDestination: {
                    origin: {
                      latitude: start?.latitude || null,
                      longitude: start?.longitude || null,
                    },
                    destination: {
                      latitude: end?.latitude || null,
                      longitude: end?.longitude || null,
                    },
                  },
                  totalAnnualDistance: debouncedTotalAnnualDistance,
                  payload: debouncedPayload,
                },
                tcoParameters: {
                  possessionDuration: debouncedPossessionDuration,
                  fuelConsumption: debouncedFuelConsumption,
                  costs: Object.keys(debouncedCosts).map((vehicleTechnology) => ({
                    vehicleTechnology,
                    purchaseCost: debouncedCosts[vehicleTechnology].purchaseCost,
                    purchaseGrant: debouncedCosts[vehicleTechnology].purchaseGrant,
                    maintenanceCost: debouncedCosts[vehicleTechnology].maintenanceCost,
                    insuranceCost: debouncedCosts[vehicleTechnology].insuranceCost,
                    resaleCost: debouncedCosts[vehicleTechnology].resaleCost,
                    energyCost: debouncedCosts[vehicleTechnology].energyCost,
                  })),
                },
                chartsConfiguration: false,
              }
            )
            .then((res) => res.data)
        : Promise.resolve([]),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      enabled
    }
  )
}

export function useToken() {
  return useQuery(
    ['token'],
    () =>
      axios
        .get(`https://staging--tco2.netlify.app/.netlify/functions/getToken`)
        .then((res) => res.data?.id_token),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
}
