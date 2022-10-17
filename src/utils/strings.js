export const capitalizeFirstLetter = s => s ? (s).charAt(0).toUpperCase() + s.slice(1) : '';

export const removeTrailingDot = s => (s ?? '').trimEnd().replace(/\.+$/, '')
