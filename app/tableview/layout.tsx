'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Breadcrumb,
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
import { Button } from '@/components/ui/button';
import { createPaginator } from '@/utils/paginator';

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
  const [displayResults, setDisplayResults] = useState<MergedDfRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginator, setPaginator] = useState<ReturnType<typeof createPaginator> | null>(null);

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
            results = merged_df;
            break;
          case 'Orders & Payment Received':
            results = extractTotalOrderAndPayment(merged_df);
            break;
          case 'Tolerance rate breached':
            results = extractToleranceBreach(merged_df);
            break;
          case 'Payment Pending':
            results = extractPaymentPending(merged_df);
            break;
        }
        setDisplayResults(results);
        setPaginator(createPaginator(results));
        setCurrentPage(0); // Reset to first page when results change
      } else {
        router.push(`/tableview/${dropdownItems[0].param}`);
      }
    } else if (params.option === undefined) {
      router.push(`/tableview/${dropdownItems[0].param}`);
    }
  }, [params.option, router, dropdownItems, merged_df]);

  const handleOptionClick = (param: string) => {
    router.push(`/tableview/${param}`);
  };

  const incrementPage = () => {
    if (paginator && currentPage < paginator.pageCount - 1) {
      setCurrentPage((p) => p + 1);
    }
  };

  const decrementPage = () => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
    }
  };

  const currentPageItems = paginator ? paginator.getPage(currentPage) : [];
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
        <p className="text-center mb-4 text-zinc-500">A list of the {selected}</p>
        <div className="overflow-x-auto">
          <Table>
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
              {currentPageItems.map((res, id) => (
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
        <div className="flex gap-6 mx-auto items-center justify-center mt-6">
          <Button variant={'outline'} onClick={decrementPage} disabled={currentPage === 0}>
            Prev
          </Button>
          <Button variant={'outline'} onClick={incrementPage}>
            Next
          </Button>
        </div>
      </main>
    </>
  );
}
