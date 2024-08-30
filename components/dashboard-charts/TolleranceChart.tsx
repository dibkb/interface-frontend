'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useStore } from '@/store';

// Chart configuration
const toleranceChartConfig = {
  'Tolerance Breached': {
    label: 'Tolerance Breached',
    color: 'hsl(var(--chart-1))',
  },
  'Within Tolerance': {
    label: 'Within Tolerance',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function ToleranceChart() {
  const { tolerance_summary } = useStore();
  // Transform data for the chart
  const chartData = tolerance_summary.map((item) => ({
    browser: item.ToleranceCheck,
    visitors: item.Count,
    fill: getColor(item.ToleranceCheck),
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tolerance Summary</CardTitle>
        <CardDescription>Tolerance Breach Analysis</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={toleranceChartConfig}
          className="mx-auto aspect-square max-h-[450px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="visitors" hideLabel />} />
            <Pie data={chartData} dataKey="visitors"></Pie>
            <ChartLegend content={<ChartLegendContent nameKey="browser" />} className="" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm mt-4">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending analysis based on tolerance data <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Summary of tolerance checks</div>
      </CardFooter>
    </Card>
  );
}

function getColor(key: string) {
  if (key === 'Tolerance Breached') {
    return '#0d9488';
  } else {
    return '#ea580c';
  }
}
