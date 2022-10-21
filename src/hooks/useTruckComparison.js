import { useContext } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

import SearchContext from 'utils/SearchContext'
import useDebounce from './useDebounce';
import { isNil } from '../utils/global';

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
  } = useContext(SearchContext)

  // Disable query while locations are partially filled
  const enabled = areLocationsReady(start, end)

  const debouncedCosts = useDebounce(costs)
  const debouncedPossessionDuration = useDebounce(possessionDuration, 100)

  const { data: token } = useToken()
  return useQuery(
    [
      'truckComparison',
      token,
      vehicleCategory,
      totalAnnualDistance,
      debouncedPossessionDuration,
      usesRepartition,
      start,
      end,
      payload,
      debouncedCosts,
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
                  usesRepartition,
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
                  totalAnnualDistance,
                  payload,
                },
                tcoParameters: {
                  possessionDuration: debouncedPossessionDuration,
                  fuelConsumption: 0,
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
