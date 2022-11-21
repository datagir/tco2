/**
 * Parses the number to string, applying locales
 *
 * If value is null, undefined or -0, returns '0'
 *
 * @param value the number value
 * @param locales the locales to use
 * @returns {string|string} the number to local string
 */
import { isEmpty, isNil } from './globalUtils';
import { filterNumbers, removeWhiteSpaces } from './stringUtils';

export const parseLocalNumber = (value, nilValue, locales = 'fr-fr') => {
  if (isEmpty(value)) {
    return nilValue
  }
  if (value === '-0' || value === -0) {
    return '0'
  }
  const cleanValue = value.toLocaleString(locales)
    .replace(/[^\d\s,-]/g, '')
    .replace(',', '.')
  return cleanValue !== '' ? cleanValue : nilValue
}

export const parseString = (v, min, max, nilValue) => {
  let numberValue = removeWhiteSpaces(v);
  numberValue = (!numberValue || Number.isNaN(numberValue)) ? (nilValue ?? null) : +numberValue;

  return safeNumber(numberValue, min, max)
}

export const safeNumber = (value, min, max) => {
  if (isNil(value)) {
    return value
  }
  if (!isNil(min) && min !== '' && value < min) {
    value = min
  }
  if (!isNil(max) && max !== '' && value > max) {
    value = max
  }
  return value
}
/**
 * For 'textNumbers' TextInputs, to modify incoming values
 *
 * @param v the number value
 * @param min the min
 * @param max the max
 * @returns {*|string|string} the number in text, formatted with the locales
 */
export const encodeLocalizedNumber = (v, min, max) => {
  const cleanNumber = safeNumber(v, min, max)
  return parseLocalNumber(cleanNumber, '')
}
/**
 * For 'textNumbers' TextInputs, to modify changed values
 *
 * @param v the string value, formatted with locales
 * @param min the min
 * @param max the max
 * @returns {*|string|string} the number value
 */
export const decodeLocalizedNumber = (v, min, max) => {
  const cleanNumber = safeNumber(removeWhiteSpaces(filterNumbers(v)), min, max)
  return isEmpty(cleanNumber) ? undefined : Number(cleanNumber)
}
