import { Button } from '@repo/ui/components/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@repo/ui/components/sidebar';
import * as React from 'react';

interface SidebarItem {
  label: string;
  path?: string;
  icon?: string;
  items?: SidebarItem[];
}

const navMain: SidebarItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    label: 'Staff',
    path: '/staff',
  },
  {
    label: 'Inventory',
    path: '/inventory',
  },
  {
    label: 'Reports',
    items: [
      {
        label: 'Sales Reports',
        path: '/report/sales',
      },
      {
        label: 'Inventory Reports',
        path: '/report/inventory',
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Button variant="ghost" className="justify-start">
                <div className="bg-sidebar-accent text-sidebar-accent-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src="/favicon.svg" alt="brand logo" className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Acme Inc</span>
                  <span className="">Atmin</span>
                </div>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navMain.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  tooltip={item.label}
                  isActive={item.path === window.location.href}
                >
                  {item.icon ? <span className={item.icon} /> : null}
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
