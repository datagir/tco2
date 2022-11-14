import { capitalizeFirstLetter } from './strings';
import { parseString, safeChangeValue } from './numbers';

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
])
/**
 * Returns the formatted text for the energy cost unit
 *
 * @param vehicleTechnology the identifier for the vehicle technology
 * @returns {`€/${string}`|"€/N/C"} the formatted string for the associated energy cost unit
 */
export const resolveEnergyCostUnit = (vehicleTechnology) => `€/${EnergyCostUnitMap.get(vehicleTechnology) || ''}`
/**
 * Build the default property name based on the original property name
 *
 * energyCost -> defaultEnergyCost
 *
 * @param propertyName the name for the actual property
 * @returns {string|string} returns the default property name
 */
export const resolveDefaultPropertyName = (propertyName) => propertyName ? `default${capitalizeFirstLetter(propertyName)}` : ''

/* General */
export const isNil = value => value === undefined || value === null
export const isEmpty = value => isNil(value) || Object.values(value).length === 0 || value.length === 0

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
    // Récupération de l'usage correspondant au nom
    const usageToUpdate = findUsageByName(name, usages)
    if (!usageToUpdate) {
        return usages
    }
    const cleanValue = parseString(value, 0, 100)
    usageToUpdate.percentage = safeChangeValue(cleanValue, 0, 100)
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
        const resolvedValue = safeChangeValue(targetValue, 0, 100)
        diffTo100 = resolvedValue - targetValue
        usages[nextIndex].percentage = resolvedValue
        nextIndex = nextIndex === (usages.length - 1) ? 0 : (nextIndex + 1)
    }
    return usages
}
