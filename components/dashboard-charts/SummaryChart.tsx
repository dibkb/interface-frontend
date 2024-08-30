'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useStore } from '@/store';
import { TrendingUp } from 'lucide-react';

const chartConfig = {} satisfies ChartConfig;

export function SummaryChart() {
  const { transaction_summary } = useStore();
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Reimbursement by Dispute Type</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={transaction_summary}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={'Description'}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="NetAmount" fill="#06b6d4" radius={4} />
          </BarChart>
        </ChartContainer>
        <CardFooter className="flex-col gap-2 text-sm mt-4">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending analysis based on transaction data <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">Summary of transaction types</div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
