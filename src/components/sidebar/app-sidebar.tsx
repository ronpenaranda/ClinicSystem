"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChartPie,
  User2,
  ChevronUp,
  LayoutDashboard,
  SquareKanban,
} from "lucide-react";
import { NavMain } from "./sidebar-main";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: ChartPie,
      items: [
        {
          title: "Patient Management",
          url: "/patient-management",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const handleNavigation = (url: string) => {
    router.push(url);
  };

  return (
    <Sidebar {...props}>
      <div className="flex justify-center p-4 pb-10">
        
      </div>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {"Admin"}
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
                      {`Sign out`}
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