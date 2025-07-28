'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import { SidebarTrigger } from "./ui/sidebar" 
  
  export function BreadcrumbDemo() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);

    const breadcrumbMap: Record<string, string> = {
      projects: 'Projects',
      'weather-app': 'Weatherly',
      'inventory-management': 'InventoryFi',
      'settings': 'Settings',
      'inventory': 'Inventory',
      'pos': 'Point Of Sale',
      'dashboard': 'Dashboard',
      'reports': 'Reports',
    };


    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbPage>
              <SidebarTrigger/>
          </BreadcrumbPage>
          <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem key={index}>
              {index < pathSegments.length - 1 ? <BreadcrumbLink href={href}>{breadcrumbMap[segment] || segment}</BreadcrumbLink> : <BreadcrumbPage>{breadcrumbMap[segment] || segment}</BreadcrumbPage>}
              </BreadcrumbItem>
              {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
        </BreadcrumbList>
      </Breadcrumb>
    )
  }
  