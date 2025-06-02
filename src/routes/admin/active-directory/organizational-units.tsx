import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchAdOUs } from '@/api/activeDirectory'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import type { OrganizationalUnit } from '@/types/organizationalUnit'

export const Route = createFileRoute('/admin/active-directory/organizational-units')({
  component: OUsPage,
})

function OUsPage() {
  const { data: ous, isLoading, error } = useQuery({
    queryKey: ['ad-ous'],
    queryFn: fetchAdOUs,
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Organizational Units</h1>
          <p className="text-muted-foreground">List and manage AD OUs.</p>
        </div>
        <Button>Add OU</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          {isLoading && <p>Loading OUs...</p>}
          {error && <p className="text-red-500">Failed to load OUs</p>}
          {ous && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Distinguished Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ous.map((ou: OrganizationalUnit, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell>{ou.Name}</TableCell>
                    <TableCell>{ou.DistinguishedName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
