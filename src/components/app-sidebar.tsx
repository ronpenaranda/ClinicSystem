"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/greatsmile_logo.png";
import Image from "next/image";
import {
  Home,
  Users,
  Stethoscope,
  CalendarDays,
  FileText,
  User2,
  ChevronUp,
  LogOut,
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

import useAuth from "@/hooks/useAuth";

const menuItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard", disabled: false },
  {
    label: "Patient Management",
    icon: Users,
    path: "/patient-management",
    disabled: false,
  },
  {
    label: "Doctors Management",
    icon: Stethoscope,
    path: "/doctor-management",
    disabled: false,
  },
  {
    label: "Appointment",
    icon: CalendarDays,
    path: "/appointment",
    disabled: false,
  },
  { label: "Reports", icon: FileText, path: "/reports", disabled: true },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const { user, logout, loading } = useAuth();

  const handleNavigation = (url: string) => {
    router.push(url);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-center p-4 mb-5 text-xl font-bold tracking-wide text-blue-600">
            <Image
              src={logo}
              alt="Great Smiles Logo"
              width={190}
              height={130}
            />
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(({ label, icon: Icon, path, disabled }) => {
                const split_path = pathname.split("/");
                const isActive = `/${split_path[1]}` === path;
                return (
                  <SidebarMenuItem key={path}>
                    <SidebarMenuButton asChild>
                      <button
                        disabled={disabled}
                        onClick={() => handleNavigation(path)}
                        className={`flex gap-4 items-center w-full rounded-md px-3 py-2 transition-colors ${
                          isActive ? "bg-black text-white" : "text-gray-700"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{label}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-2">
                  <User2 className="w-5 h-5" /> {user}
                  <ChevronUp className="ml-auto w-4 h-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <button
                    onClick={() => logout()}
                    className="flex w-full items-center justify-center gap-2 text-red-600"
                  >
                    {loading ? (
                      <div className="flex gap-2 items-center">
                        <LogOut className="h-4 w-4 animate-spin" />
                        Signing out..
                      </div>
                    ) : (
                      "Sign out"
                    )}
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
