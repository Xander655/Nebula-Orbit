import { getAccessToken } from '@/auth/getAccessToken'
import { type FormData } from '@/routes/provisioning'
const API_URL = import.meta.env.VITE_API_URL

export async function submitOnboardingRequest(data: FormData): Promise<void> {
  const token = await getAccessToken()
  const response = await fetch(`${API_URL}/api/onboarding`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorBody = await response.json()
    throw errorBody
  }
}
