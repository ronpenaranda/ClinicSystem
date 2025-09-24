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

const menuItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Patient Management", icon: Users, path: "/patient-management" },
  {
    label: "Doctors Management",
    icon: Stethoscope,
    path: "/doctor-management",
  },
  { label: "Appointment", icon: CalendarDays, path: "/appointment" },
  { label: "Reports", icon: FileText, path: "/reports" },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

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
              {menuItems.map(({ label, icon: Icon, path }) => {
                const split_path = pathname.split("/");
                console.log(split_path);
                const isActive = `/${split_path[1]}` === path;
                return (
                  <SidebarMenuItem key={path}>
                    <SidebarMenuButton asChild>
                      <button
                        onClick={() => handleNavigation(path)}
                        className={`flex gap-4 items-center w-full rounded-md px-3 py-2 transition-colors ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
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
                  <User2 className="w-5 h-5" /> Guest
                  <ChevronUp className="ml-auto w-4 h-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="flex w-full items-center justify-center gap-2 text-red-600"
                  >
                    <LogOut className="w-4 h-4" /> Sign out
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
