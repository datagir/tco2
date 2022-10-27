import { useQuery } from 'react-query'
import axios from 'axios'
import { removeTrailingDot } from '../utils/strings';

export default function useTruckDefaultSettings() {
  const { data: token } = useToken()
  return useQuery(
    ['TruckDefaultSettings', token],
    () => axios
            .get(
              `https://staging--tco2.netlify.app/.netlify/functions/getTruckDefaultSettings?token=${token}`
            )
            .then((res) => res.data),
    {
      enabled: !!token,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
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
      staleTime: Infinity,
    }
  )
}

export function selectCategory(category, data) {
  return (data?.output?.vehicleCategoriesDescriptions ?? []).find(c => c.vehicleCategory === category)
}
export function selectTruckDescriptions(category, data) {
  return data?.output?.vehicleCategoriesDescriptions ?? []
}
export function selectTruckDefaultDescription(category, data) {
  const categoryDefault = selectCategory(category, data)
  return {
    truckDescription: removeTrailingDot(categoryDefault?.description)
  }
}
export function selectTruckDefaultParameters(category, data) {
  const categoryDefault = selectCategory(category, data)
  const defaultParams = categoryDefault?.DefaultParameters
  return {
    ...defaultParams,
    usesRepartition: (defaultParams?.usesRepartition ?? []).map(rep => rep.percentage)
  }
}
