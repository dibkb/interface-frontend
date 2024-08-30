import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { LogResponse } from '@/types/api-response-body';

interface LogtableInterface {
  apiResults: LogResponse[];
}
export const Logtable = ({ apiResults }: LogtableInterface) => {
  return (
    <div className="pb-8">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow className="grid grid-cols-1 md:grid-cols-9 gap-4 mb-4">
            <TableHead className="md:col-span-1">LEVEL</TableHead>
            <TableHead className="md:col-span-2">MESSAGE</TableHead>
            <TableHead className="md:col-span-2">CONTEXT</TableHead>
            <TableHead className="md:col-span-3">TIME STAMP</TableHead>
            <TableHead className="whitespace-nowrap">ADDITIONAL INFO</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiResults.map((res) => (
            <TableRow key={res.id} className="grid grid-cols-1 md:grid-cols-9 gap-4 mb-4">
              <TableCell className="font-medium md:col-span-1">{res.level}</TableCell>
              <TableCell className="md:col-span-1">{res.message}</TableCell>
              <TableCell className="md:col-span-2">{res.context}</TableCell>
              <TableCell className="md:col-span-2">{res.timestamp}</TableCell>
              <TableCell className="md:col-span-3 break-words whitespace-pre-wrap overflow-wrap break-word">
                {JSON.stringify(res.additional_info, null, 2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
