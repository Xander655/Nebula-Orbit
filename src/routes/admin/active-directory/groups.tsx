import { useQuery } from '@tanstack/react-query'
import { fetchAdGroups } from '@/api/activeDirectory'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle } from 'lucide-react'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/active-directory/groups')({
  component: AdGroupsPage,
})

export default function AdGroupsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['ad-groups'],
    queryFn: fetchAdGroups,
  })

  if (isLoading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[80px] w-full rounded-xl" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 flex items-center gap-2">
        <AlertCircle className="w-5 h-5" /> Failed to load groups
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {data?.map((group) => (
        <Card key={group.distinguishedName}>
          <CardHeader>
            <CardTitle>{group.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {group.distinguishedName}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
