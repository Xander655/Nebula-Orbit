import { useRouterState } from '@tanstack/react-router'

export default function UserInfo() {
    const match = useRouterState({
        select: (s) => s.matches[s.matches.length - 1], // last match in the route tree
      })
    
      const user = match?.context?.auth.user

  if (!user) return null

  const roles = user.roles ?? []

  return (
    <div className="text-sm text-gray-700 text-right">
      <div>
        Signed in as <span className="font-medium">{user.name}</span>
      </div>
      <div className="text-xs text-gray-500">{user.username}</div>

      {roles.length > 0 && (
        <div className="mt-1">
            <span className="font-medium">Roles:</span>{' '}
            <span className="text-gray-600">{roles.join(', ')}</span>
        </div>
        )}

    </div>
  )
}

