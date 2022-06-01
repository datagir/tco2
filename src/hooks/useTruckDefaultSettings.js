import { useQuery } from 'react-query'
import axios from 'axios'

export default function useTruckDefaultSettings() {
  const { data: token } = useToken()
  return useQuery(
    ['TruckDefaultSettings', token],
    () =>
      token
        ? axios
            .get(
              `https://staging--tco2.netlify.app/.netlify/functions/getTruckDefaultSettings?token=${token}`
            )
            .then((res) => res.data)
        : Promise.reject('no token yet'),
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
