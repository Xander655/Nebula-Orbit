import { apiFetch } from './client'

export function getEmployees() {
  return apiFetch('/api/employees')
}

export function createEmployee(data: any) {
  return apiFetch('/api/employees', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
