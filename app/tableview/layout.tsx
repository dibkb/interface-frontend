'use client';

import React, { ReactNode, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const dropdownItems = [{ label: 'order&payment' }, { label: 'Themes' }, { label: 'GitHub' }];

export default function TableViewLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      router.push('/tableview/order&payment');
    }
  }, [params, router]);

  return (
    <div className="min-h-screen container mx-auto py-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="font-medium text-indigo-600">TableView</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {dropdownItems.map((item) => (
                  <DropdownMenuItem key={item.label}>
                    {/* <a href={item}>{item.label}</a> */}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
