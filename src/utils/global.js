import { capitalizeFirstLetter } from './strings';

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
