export const getKeyValue = (obj: Record<string, any>) => (key: string) =>
  obj[key]

export const genId = (): string =>
  'css-theme-' + Math.random().toString(36).substring(2, 12)
