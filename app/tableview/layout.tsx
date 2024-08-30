'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
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

const dropdownItems = [
  { label: 'Total Orders', param: 'total-orders' },
  { label: 'Orders & Payment Received', param: 'order-payment' },
  { label: 'Tolerance rate breached', param: 'total-rate-breched' },
  { label: 'Payment Pending', param: 'payment-pending' },
];

export default function TableViewLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const [selected, setSelected] = useState<string>(dropdownItems[0].label);

  useEffect(() => {
    if (typeof params.option === 'string') {
      const match = dropdownItems.find((d) => d.param === params.option);
      if (match) {
        setSelected(match.label);
      } else {
        // If no match found, redirect to the first option
        router.push(`/tableview/${dropdownItems[0].param}`);
      }
    } else if (params.option === undefined) {
      // If no option is provided, redirect to the first option
      router.push(`/tableview/${dropdownItems[0].param}`);
    }
  }, [params.option, router]);

  const handleOptionClick = (param: string) => {
    router.push(`/tableview/${param}`);
  };

  return (
    <div className="min-h-screen container mx-auto py-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/tableview" className="font-medium text-indigo-600">
                TableView
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                {selected}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {dropdownItems.map((item) => (
                  <DropdownMenuItem key={item.param} onClick={() => handleOptionClick(item.param)}>
                    {item.label}
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
