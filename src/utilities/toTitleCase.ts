export const toTitleCase = (string: string): string =>
  string.replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase())
