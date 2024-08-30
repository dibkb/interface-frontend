import React from 'react';
import { Card, CardContent } from '../ui/card';
import { ChevronRight } from '../svg/ChevronRight';
interface SmallSummaryCard {
  title: string;
  count: number;
}
export const SmallSummaryCard = ({ title, count }: SmallSummaryCard) => {
  return (
    <Card className="border p-4 flex items-center justify-between gap-2 hover:cursor-pointer hover:bg-zinc-100">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-zinc-500">{title}</p>
        <h2 className="text-4xl">{count}</h2>
      </div>
      <ChevronRight />
    </Card>
  );
};
