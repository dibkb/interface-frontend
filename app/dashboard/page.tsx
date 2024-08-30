'use client';

import React, { useEffect, useState } from 'react';
import { SmallSummaryCard } from '@/components/dashboard-charts/SmallSummaryCard';
import { SummaryChart } from '@/components/dashboard-charts/SummaryChart';
import { ToleranceChart } from '@/components/dashboard-charts/TolleranceChart';
import { useStore } from '@/store';
import { calculateToleranceBreach } from '@/utils/calucate-dashboard-metrics';
import { useHydration } from '@/components/hooks/useHydration';

const Dashboard = () => {
  const { merged_df } = useStore();
  const { hydrated } = useHydration();

  if (!hydrated) {
    return null;
  }

  const totalOrders = merged_df?.length ?? 0;
  const totalTolerance = calculateToleranceBreach(merged_df ?? []);

  return (
    <main className="container mx-auto min-h-screen py-6">
      <p className="text-center text-indigo-700 font-semibold mb-6">Dashboard</p>
      <section className="mb-6 grid gap-x-4 gap-y-4 md:grid-cols-2">
        <SmallSummaryCard title="Total orders" count={totalOrders} className="col-span-1" />
        <SmallSummaryCard title="Tolerance rate breached" count={totalTolerance} />
        <SmallSummaryCard title="Order & Payment Received" count={3434} />
        <SmallSummaryCard title="Payment Received" count={3434} />
      </section>
      <main className="grid md:grid-cols-2 gap-4">
        <SummaryChart />
        <ToleranceChart />
      </main>
    </main>
  );
};

export default Dashboard;
