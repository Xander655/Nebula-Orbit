import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandInput,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandList,
} from "@/components/ui/command"
import { Users, FolderTree, ShieldCheck, Search } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute('/admin/active-directory/')({
  component: ActiveDirectoryIndex,
})

function ActiveDirectoryIndex() {
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const items = [
    { label: "Alex Shelton", type: "user", path: "/admin/active-directory/users" },
    { label: "Dana Yu", type: "user", path: "/admin/active-directory/users" },
    { label: "Staff", type: "group", path: "/admin/active-directory/groups" },
    { label: "IT", type: "group", path: "/admin/active-directory/groups" },
    { label: "Users OU", type: "ou", path: "/admin/active-directory/organizational-units" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Active Directory</h1>
        <p className="text-muted-foreground">Search and manage users, groups, and organizational units.</p>
      </div>

      {/* 🔍 Searchable Dropdown */}
      <Popover open={searchOpen} onOpenChange={setSearchOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[300px] justify-start">
            <Search className="w-4 h-4 mr-2" />
            {searchValue || "Search directory..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search users, groups, or OUs..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Results">
                {items.map((item) => (
                  <CommandItem
                    key={item.label}
                    value={item.label}
                    onSelect={() => {
                      setSearchValue(item.label)
                      setSearchOpen(false)
                      navigate({ to: item.path })
                    }}
                  >
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* ⚡ Quick links */}
      <div className="grid gap-4 md:grid-cols-3">
        <QuickLinkCard
          icon={<Users className="w-6 h-6 text-blue-600" />}
          title="Users"
          description="View and manage all AD users"
          path="/admin/active-directory/users"
        />
        <QuickLinkCard
          icon={<ShieldCheck className="w-6 h-6 text-green-600" />}
          title="Groups"
          description="Review group memberships and security roles"
          path="/admin/active-directory/groups"
        />
        <QuickLinkCard
          icon={<FolderTree className="w-6 h-6 text-yellow-600" />}
          title="Organizational Units"
          description="Browse OU structure and hierarchy"
          path="/admin/active-directory/organizational-units"
        />
      </div>

      {/* 📊 Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <StatCard label="Total Users" value="35" />
        <StatCard label="Groups" value="7" />
        <StatCard label="OUs" value="5" />
      </div>
    </div>
  )
}

function QuickLinkCard({
  icon,
  title,
  description,
  path,
}: {
  icon: React.ReactNode
  title: string
  description: string
  path: string
}) {
  const navigate = useNavigate()
  return (
    <Card
      onClick={() => navigate({ to: path })}
      className="cursor-pointer hover:shadow-md transition-shadow"
    >
      <CardContent className="p-4 flex flex-col items-start gap-2">
        {icon}
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
