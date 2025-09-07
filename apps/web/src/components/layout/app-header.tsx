import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui/components/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { Separator } from '@repo/ui/components/separator';
import { SidebarTrigger } from '@repo/ui/components/sidebar';
// import { authClient } from '~/clients/auth-client'

const user = {
  name: 'shadcn',
  email: 'm@example.com',
  avatar: '/avatars/shadcn.jpg',
};

const breadcrumbs: { label: string; path?: string }[] = [
  { label: 'Dashboard' },
];

function UserProfile() {
  // const { data } = authClient.useSession()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-foreground/70 dark:text-foreground/60">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AppBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <>
              {breadcrumbs.length - 1 === index ? (
                <>
                  {breadcrumbs.length - 1 === 0 ? null : (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                  <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              ) : (
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={breadcrumb.path}>
                    {breadcrumb.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <AppBreadcrumb />
      <div className="ml-auto flex items-center gap-2">
        <UserProfile />
      </div>
    </header>
  );
}
