/**
 * Parses the number to string, applying locales
 *
 * If value is null, undefined or -0, returns '0'
 *
 * @param value the number value
 * @param locales the locales to use
 * @returns {string|string} the number to local string
 */
import { isNil } from './global';
import { removeWhiteSpaces } from './strings';

export const parseLocalNumber = (value, locales = 'fr-fr') => !value ? '0' : value.toLocaleString(locales)

export const parseString = (v, min, max) => {
  let numberValue = removeWhiteSpaces(v);
  numberValue = (!numberValue || Number.isNaN(numberValue)) ? 0 : +numberValue;

  if (!isNil(min) && min !== '' && numberValue < min) {
    numberValue = min
  }
  if (!isNil(max) && max !== '' && numberValue > max) {
    numberValue = max
  }
  return numberValue
}
