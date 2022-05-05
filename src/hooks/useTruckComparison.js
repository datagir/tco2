import { useQuery } from 'react-query'
import axios from 'axios'

export default function useTruckComparison(search) {
  const { data: csrfToken } = useCsrfToken()
  console.log('csrfToken', csrfToken)
  return useQuery(
    ['truckComparison'],
    () =>
      axios
        .get(
          `/response_1651673032373.json`
          /*  {
          vehicle: { vehicleCategory: 'RIGIDTRUCK-12T' },
          use: {
            operatingRange: 'URBAN',
            usesRepartition: [20, 30, 50],
            OriginDestination: {
              origin: { latitude: null, longitude: null },
              destination: { latitude: null, longitude: null },
            },
            totalAnnualDistance: 100000,
            payload: 60,
          },
          tcoParameters: { possessionDuration: 10, fuelConsumption: 0 },
          echartsConfiguration: true,
        },
        {
          auth: {
            username: 'Florian',
            password: 'Bidoubidou95!',
          },
        }*/
        )
        .then((res) => res.data),

    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
}

export function useCsrfToken() {
  return useQuery(['csrfToken'], () =>
    axios
      .post(`https://mobicloud.ifpen.com/api/authenticate`, {
        username: 'Florian',
        password: '',
      })
      .then((res) => res.data)
  )
}
