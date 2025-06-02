import { getAccessToken } from '@/auth/getAccessToken'
import type { AdGroup } from '@/types/adGroup'
import { type AdUser } from '@/types/adUser'

const API_URL = import.meta.env.VITE_API_URL

export async function fetchAdUsers(): Promise<AdUser[]> {
  const response = await fetch(`${API_URL}/api/ActiveDirectory/users`, {
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch AD users')
  }

  return response.json()
}

export async function fetchAdOUs() {
  const token = await getAccessToken()
  const response = await fetch(`${API_URL}/api/ActiveDirectory/ous`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch OUs')
  }

  return response.json()
}

export async function fetchAdGroups(): Promise<AdGroup[]>{
  const token = await getAccessToken()
  const response = await fetch(`${API_URL}/api/ActiveDirectory/groups`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch groups')
  }

  return response.json()
}