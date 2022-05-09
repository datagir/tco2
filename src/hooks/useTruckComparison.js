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
                    origin: { latitude: null, longitude: null },
                    destination: { latitude: null, longitude: null },
                  },
                  totalAnnualDistance,
                  payload: 60,
                },
                tcoParameters: { possessionDuration, fuelConsumption: 0 },
                echartsConfiguration: true,
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
