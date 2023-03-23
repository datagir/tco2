import { useQuery } from 'react-query'
import axios from 'axios'
import { removeTrailingDot } from '../utils/stringUtils';

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
  return categoryDefault?.DefaultParameters
}
export function selectTruckDefaultUsages(category, data) {
  const defaultParams = selectTruckDefaultParameters(category, data)
  return defaultParams?.usesRepartition
}
export function selectDefaultUsageName(category, data, use) {
  const usageByName = (selectTruckDefaultUsages(category, data) ?? []).filter(u => u.use === use)
  return usageByName?.length > 0 ? usageByName[0].name : use
}
export function selectDefaultAnnualDistance(category, data) {
  const params = selectTruckDefaultParameters(category, data)
  return params?.totalAnnualDistance
}
