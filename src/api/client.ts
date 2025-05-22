import { useApiToken } from '../auth/useApiToken'

export async function apiFetch<T = unknown>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const { getAccessToken } = useApiToken()
  const token = await getAccessToken()
  if (!token) throw new Error('Not authenticated')

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) throw new Error(`API error ${res.status}`)

  return res.json()
}
