'use client';

import React from 'react';
import { Card } from '../ui/card';
import { ChevronRight } from '../svg/ChevronRight';
import { cn } from '@/lib/utils';
interface SmallSummaryCard {
  title: string;
  count: number;
  className?: string;
}
export const SmallSummaryCard = ({ title = '', count = 0, className }: SmallSummaryCard) => {
  if (!title || !count) return null;
  return (
    <Card
      className={cn(
        'border p-4 flex items-center justify-between gap-2 hover:cursor-pointer hover:bg-zinc-100',
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-zinc-500">{title}</p>
        <h2 className="text-4xl">{count}</h2>
      </div>
      <ChevronRight />
    </Card>
  );
};
