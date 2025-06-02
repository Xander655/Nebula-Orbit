import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { fetchAdUsers } from "@/api/activeDirectory"
import type { AdUser } from "@/types/adUser"

export const Route = createFileRoute('/admin/active-directory/users')({
  component: UsersPage,
})

function UsersPage() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['adUsers'],
    queryFn: fetchAdUsers,
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-muted-foreground">List and manage Active Directory users.</p>
        </div>
        <Button>Add User</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {(error as Error).message}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Groups</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user: AdUser, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell>{user.displayName ?? user.sAMAccountName}</TableCell>
                    <TableCell>{user.mail ?? user.userPrincipalName}</TableCell>
                    <TableCell>{user.userAccountControl?.includes("ACCOUNTDISABLE") ? "Inactive" : "Active"}</TableCell>
                    <TableCell>{(user.memberOf ?? []).join(", ")}</TableCell>
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
