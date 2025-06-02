import { Link } from '@tanstack/react-router'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import  {LogoutButton}  from '@/components/LogoutButton'
import { useMsal } from '@azure/msal-react'
import { cn } from '@/lib/utils'
import * as React from 'react'

export default function NavBar() {
  const { accounts } = useMsal()
  const user = accounts[0]

  return (
    <header className="w-full border-b bg-background p-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* LEFT SIDE — Main Nav */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <Link to="/" className={navigationMenuTriggerStyle()}>
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/provisioning" className={navigationMenuTriggerStyle()}>
                Provisioning
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Active Directory</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-1">
                  <ListItem href="/admin/active-directory" title="Overview">
                    Summary page for AD search and quick links.
                  </ListItem>
                  <ListItem href="/admin/active-directory/users" title="Users">
                    Manage individual Active Directory users.
                  </ListItem>
                  <ListItem href="/admin/active-directory/groups" title="Groups">
                    View and manage AD security/distribution groups.
                  </ListItem>
                  <ListItem
                    href="/admin/active-directory/organizational-units"
                    title="Organizational Units"
                  >
                    Manage OU structure and assignments.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* RIGHT SIDE — User Info + Logout */}
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.name}</span>
            <LogoutButton />
          </div>
        )}
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
