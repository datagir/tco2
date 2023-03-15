import { capitalizeFirstLetter } from './stringUtils';
import { parseString, safeNumber } from './numberUtils';

/* Costs */
/**
 * Technology identifiers and their related energy cost unit
 *
 * @type {Map<string, string>}
 */
const EnergyCostUnitMap = new Map([
  ['DIESEL-B7', 'l'],
  ['DIESEL-B100', 'l'],
  ['DIESEL-HVO', 'l'],
  ['GNC', 'kg'],
  ['BIO-GNC', 'kg'],
  ['HEV', 'l'],
  ['BEV', 'kWh'],
  ['GNL', 'kg'],
  ['PHEV-DIESEL-B7', 'l'],
  ['PHEV-ESSENCE-E10', 'l'],
  ['ESSENCE-E10', 'l'],
  ['HYDROGÈNE', 'l'],
])
/**
 * Returns the formatted text for the energy cost unit
 *
 * @param vehicleTechnology the identifier for the vehicle technology
 * @returns {`€/${string}`|"€/N/C"} the formatted string for the associated energy cost unit
 */
export const resolveEnergyCostUnit = (vehicleTechnology) => `€/${ EnergyCostUnitMap.get(vehicleTechnology) || '' }`
/**
 * Build the default property name based on the original property name
 *
 * energyCost -> defaultEnergyCost
 *
 * @param propertyName the name for the actual property
 * @returns {string|string} returns the default property name
 */
export const resolveDefaultPropertyName = (propertyName) => propertyName ? `default${ capitalizeFirstLetter(propertyName) }` : ''

/* General */
export const isNil = value => value === undefined || value === null
export const isEmpty = value => isNil(value) || ((isObject(value) || typeof value === 'string') && (Object.values(value).length === 0 || value.length === 0))
export const isObject = value => !isNil(value) && typeof value === 'object'
export const findUsageByName = (name, usages) => (usages ?? []).find(u => u.use === name)

export const updateUsage = (nextValue, usages) => {
  if (Array.isArray(nextValue)) {
    return nextValue
  }
  if (!usages) {
    return []
  }
  const { name, value } = nextValue
  if (!name) {
    return usages
  }
  const usageToUpdate = findUsageByName(name, usages)
  if (!usageToUpdate) {
    // No usage found, return
    return usages
  }
  // Make sure value is valid
  const cleanValue = parseString(value, 0, 100)
  usageToUpdate.percentage = safeNumber(cleanValue, 0, 100)
  // Check if sum equals 100
  return adjustUsageValues(usageToUpdate, usages)
}

export const getTotalUsage = (usages) => (usages ?? []).reduce((m, u) => (m + u.percentage), 0)

const adjustUsageValues = (modifiedUsage, usages) => {
  // If only one item, set its value to max and return
  if (usages?.length === 1) {
    usages[0].percentage = 100
  }
  let diffTo100 = getTotalUsage(usages) - 100
  if (diffTo100 === 0 || diffTo100 === -100) {
    return usages
  }
  const modifiedIndex = usages.indexOf(modifiedUsage)
  let nextIndex = modifiedIndex === (usages.length - 1) ? 0 : (modifiedIndex + 1)
  while (diffTo100 !== 0 && nextIndex !== modifiedIndex) {
    const targetValue = usages[nextIndex].percentage - diffTo100
    const resolvedValue = safeNumber(targetValue, 0, 100)
    diffTo100 = resolvedValue - targetValue
    usages[nextIndex].percentage = resolvedValue
    nextIndex = nextIndex === (usages.length - 1) ? 0 : (nextIndex + 1)
  }
  return usages
}

const isArrayValidRGB = (color) => color?.length === 3 && color.every(v => v >= 0 && v <= 255)

const colorArrayToRGB = (color) => `rgb(${ color[0] }, ${ color[1] }, ${ color[2] })`

const linearInterpolate = (a, b, dX) => safeNumber((a + (b - a) * dX), 0 , 255)

export const linearInterpolateColors = (startColor, endColor, dX) =>
  (isArrayValidRGB(startColor) && isArrayValidRGB(endColor)) ?
    colorArrayToRGB([
      linearInterpolate(startColor[0], endColor[0], dX),
      linearInterpolate(startColor[1], endColor[1], dX),
      linearInterpolate(startColor[2], endColor[2], dX),
    ]) : 'rgb(0, 0, 0)'

/**
 * Find associated technologies
 * Associated technologies are listed in `otherVehicleTechnologyWithSameEnergy` attribute
 * ```
 *   {
 *     "vehicleTechnology": "DIESEL-B7",
 *     "defaultPurchaseCost": 61176,
 *     "defaultMaintenanceCost": 6000,
 *     "defaultInsuranceCost": 1400,
 *     "defaultEnergyCost": 1.201,
 *     "critAir": "2",
 *     "otherVehicleTechnologyWithSameEnergy": [
 *       "HEV"
 *     ],
 *     "name": "Diesel B7",
 *     "shortName": "B7",
 *   },
 * ```
 * Techs are linked to a given tech if they are listed in given tech's `otherVehicleTechnologyWithSameEnergy` attribute,
 * or if they list given tech in their own `otherVehicleTechnologyWithSameEnergy` attribute
 *
 * @param openTech the current technology
 * @param allTechs the whole list of technologies
 * @returns {*} an array with the vehicleTechnologies (string) linked to current technology
 */
export const findAssociatedTechs = (openTech, allTechs) =>
  (allTechs ?? []).reduce((memo, current) => {
    if (current.vehicleTechnology !== openTech.vehicleTechnology // Open tech otherTechs have already been added, ignore
      && memo.indexOf(current.vehicleTechnology) === -1 // Prevent duplicates
      && (current.otherVehicleTechnologyWithSameEnergy ?? []).includes(openTech.vehicleTechnology)) {
      // Found another tech that lists open Tech as linked, store it
      memo.push(current.vehicleTechnology)
    }
    return memo
  }, [...(openTech?.otherVehicleTechnologyWithSameEnergy ?? [])])

export const deleteEmptyFields = (srcObj) => {
  const objWithoutEmpties = { ...srcObj }
  Object.entries(objWithoutEmpties).forEach(([key, value]) => {
    if (isEmpty(value) && Object.prototype.hasOwnProperty.call(objWithoutEmpties, key)) {
      delete objWithoutEmpties[key]
    }
  })
  return objWithoutEmpties
}
