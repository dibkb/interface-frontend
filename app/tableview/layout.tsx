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
import { useStore } from '@/store';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MergedDfRecord } from '@/types/process-data';
import {
  extractPaymentPending,
  extractToleranceBreach,
  extractTotalOrderAndPayment,
} from '@/utils/calucate-dashboard-metrics';

const dropdownItems = [
  { label: 'Total Orders', param: 'total-orders' },
  { label: 'Orders & Payment Received', param: 'order-payment' },
  { label: 'Tolerance rate breached', param: 'total-rate-breched' },
  { label: 'Payment Pending', param: 'payment-pending' },
];

export default function TableViewLayout({ children }: { children: ReactNode }) {
  const { merged_df } = useStore();
  const router = useRouter();
  const params = useParams();
  const [selected, setSelected] = useState<string>(dropdownItems[0].label);
  const [displayResults, setDisplayResults] = useState<MergedDfRecord[]>();

  useEffect(() => {
    if (!merged_df) return; // Guard clause
    if (typeof params.option === 'string') {
      const match = dropdownItems.find((d) => d.param === params.option);
      let results: MergedDfRecord[] = [];
      if (match) {
        setSelected(match.label);
        const label = match.label;
        switch (label) {
          case 'Total Orders':
            // select all
            results = merged_df;
            break;
          case 'Orders & Payment Received':
            // select with only orders & payment recieved
            results = extractTotalOrderAndPayment(merged_df);
            break;
          case 'Tolerance rate breached':
            // select with only tolerance rate breached
            results = extractToleranceBreach(merged_df);

            break;
          case 'Payment Pending':
            // select with only payment pending
            results = extractPaymentPending(merged_df);
            break;
        }
        setDisplayResults(results);
      } else {
        // If no match found, redirect to the first option
        router.push(`/tableview/${dropdownItems[0].param}`);
      }
    } else if (params.option === undefined) {
      // If no option is provided, redirect to the first option
      router.push(`/tableview/${dropdownItems[0].param}`);
    }
  }, [params.option, router, dropdownItems, merged_df]);

  const handleOptionClick = (param: string) => {
    router.push(`/tableview/${param}`);
  };
  if (!displayResults) return null;
  return (
    <>
      <div className="container mx-auto py-6">
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
                    <DropdownMenuItem
                      key={item.param}
                      onClick={() => handleOptionClick(item.param)}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <main className="py-6 sm:px-6 lg:px-8">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>A list of the {selected}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>InvoiceAmount</TableHead>
                <TableHead>InvoiceDate</TableHead>
                <TableHead>ItemDescription</TableHead>
                <TableHead>NetAmount</TableHead>
                <TableHead>OrderDate</TableHead>
                <TableHead>OrderId</TableHead>
                <TableHead>PaymentDate</TableHead>
                <TableHead>PaymentType</TableHead>
                <TableHead>ShipmentDate</TableHead>
                <TableHead>ShipmentItemId</TableHead>
                <TableHead>ToleranceCheck</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>TransactionType_mtr</TableHead>
                <TableHead>TransactionType_payment</TableHead>
                <TableHead>mark</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayResults.slice(0, 100).map((res, id) => (
                <TableRow key={res.OrderId + id} className="">
                  <TableCell className="font-medium">{res.Description}</TableCell>
                  <TableCell className="font-medium">{res.InvoiceAmount}</TableCell>
                  <TableCell className="font-medium">{res.InvoiceDate}</TableCell>
                  <TableCell className="font-medium">{res.ItemDescription}</TableCell>
                  <TableCell className="font-medium">{res.NetAmount}</TableCell>
                  <TableCell className="font-medium">{res.OrderDate}</TableCell>
                  <TableCell className="font-medium">{res.OrderId}</TableCell>
                  <TableCell className="font-medium">{res.PaymentDate}</TableCell>
                  <TableCell className="font-medium">{res.PaymentType}</TableCell>
                  <TableCell className="font-medium">{res.ShipmentDate}</TableCell>
                  <TableCell className="font-medium">{res.ShipmentItemId}</TableCell>
                  <TableCell className="font-medium">{res.ToleranceCheck}</TableCell>
                  <TableCell className="font-medium">{res.TransactionType_mtr}</TableCell>
                  <TableCell className="font-medium">{res.TransactionType_payment}</TableCell>
                  <TableCell className="font-medium">{res.mark}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
