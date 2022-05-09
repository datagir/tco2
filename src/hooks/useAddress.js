import { useQuery } from 'react-query'
import axios from 'axios'

export function useAutocomplete(query) {
  const { data: token } = useToken()

  return useQuery(
    ['autocomplete', query],
    () =>
      query?.length > 2
        ? axios
            .get(
              `https://staging--tco2.netlify.app/.netlify/functions/getAutocomplete?token=${token}&query=${query}`
            )
            .then((res) => res.data)
        : Promise.resolve([]),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
}
export function usePosition(locationId) {
  const { data: token } = useToken()

  return useQuery(
    ['address', locationId],
    () =>
      axios
        .get(
          `https://staging--tco2.netlify.app/.netlify/functions/getPosition?token=${token}&locationId=${locationId}`
        )
        .then((res) => res.data),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: locationId ? true : false,
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
