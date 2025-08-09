"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Package,
  ShoppingCart,
  FileText,
  User2,
  ChevronUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Patient Management", icon: Package, path: "/patient-management" },
  { label: "Doctors Management", icon: Package, path: "/doctor-management" },
  { label: "Reports", icon: FileText, path: "/reports" },
];

export function AppSidebar() {
  const router = useRouter();

  const handleNavigation = (url: string) => {
    router.push(url);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-center p-4 mb-5 text-lg font-semibold">
            Great Smiles
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(({ label, icon: Icon, path }) => (
                <SidebarMenuItem key={path}>
                  <SidebarMenuButton asChild>
                    <button
                      className="flex gap-4 items-center"
                      onClick={() => handleNavigation(path)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{label}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Guest
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span className="w-full text-center">
                    <button onClick={() => handleNavigation("/login")}>
                      Sign out
                    </button>
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
