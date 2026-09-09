export const useApiUrl = (endpoint: string = '') => {
  const config = useRuntimeConfig()
  const base = (config.public?.apiBase as string) || '/api'
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base
  const cleanEndpoint = endpoint ? (endpoint.startsWith('/') ? endpoint : `/${endpoint}`) : ''
  return `${cleanBase}${cleanEndpoint}`
}
