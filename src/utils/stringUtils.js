export const capitalizeFirstLetter = s => typeof s === 'string' ? (s).charAt(0).toUpperCase() + s.slice(1) : ''

export const removeTrailingDot = s => typeof s === 'string' ? s.trimEnd().replace(/\.+$/, '') : s

export const filterNumbers = s => typeof s === 'string' ? s.replaceAll(/[^\d.-]/g, '') : undefined

export const removeWhiteSpaces = s => typeof s === 'string' ? s.replace(/\s/g,'') : s
