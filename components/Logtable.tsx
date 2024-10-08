import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { LogResponse } from '@/types/api-response-body';
import { Badge } from './ui/badge';
import { Courier_Prime } from 'next/font/google';
import { cn } from '@/lib/utils';

const mono = Courier_Prime({ weight: '400', subsets: ['latin'] });

interface LogtableInterface {
  apiResults: LogResponse['results'];
  children?: React.ReactNode;
}
export const Logtable = ({ apiResults, children }: LogtableInterface) => {
  return (
    <div className="pb-8">
      <Table>
        <TableCaption>A list of the recent logs</TableCaption>
        <TableHeader>
          <TableRow className="grid grid-cols-1 md:grid-cols-9">
            <TableHead className="md:col-span-1">LEVEL</TableHead>
            <TableHead className="md:col-span-2">MESSAGE</TableHead>
            <TableHead className="md:col-span-2">CONTEXT</TableHead>
            <TableHead className="md:col-span-2">TIME STAMP</TableHead>
            <TableHead className="whitespace-nowrap md:col-span-2">ADDITIONAL INFO</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiResults.map((res) => (
            <TableRow key={res.id} className="grid grid-cols-1 md:grid-cols-9">
              <TableCell className="font-medium md:col-span-1">
                <Badge variant={res.level === 'ERROR' ? 'destructive' : 'default'}>
                  {res.level}
                </Badge>
              </TableCell>
              <TableCell className="md:col-span-2">{res.message}</TableCell>
              <TableCell className="md:col-span-2">{res.context}</TableCell>
              <TableCell className="md:col-span-2">
                {new Date(res.timestamp).toLocaleString('en-IN').toString()}
              </TableCell>
              <TableCell
                className={
                  (cn(
                    'md:col-span-2 break-words whitespace-pre-wrap overflow-wrap break-word text-xs overflow-hidden'
                  ),
                  mono.className)
                }
              >
                {JSON.stringify(res.additional_info, null, 2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {children}
    </div>
  );
};
