import { useContext } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

import SearchContext from 'utils/SearchContext'

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

  const { data: token } = useToken()
  return useQuery(
    [
      'truckComparison',
      token,
      vehicleCategory,
      totalAnnualDistance,
      possessionDuration,
      usesRepartition,
      start,
      end,
      payload,
      costs,
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
                  possessionDuration,
                  fuelConsumption: 0,
                  costs: Object.keys(costs).map((vehicleTechnology) => ({
                    vehicleTechnology,
                    purchaseCost: costs[vehicleTechnology].purchaseCost,
                    purchaseGrant: costs[vehicleTechnology].purchaseGrant,
                  })),
                },
                echartsConfiguration: false,
              }
            )
            .then((res) => res.data)
        : Promise.resolve([]),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
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
