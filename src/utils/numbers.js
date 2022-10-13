/**
 * Parses the number to string, applying locales
 *
 * If value is null, undefined or -0, returns '0'
 *
 * @param value the number value
 * @param locales the locales to use
 * @returns {string|string} the number to local string
 */
export const parseLocalNumber = (value, locales = 'fr-fr') => !value ? '0' : value.toLocaleString(locales)
