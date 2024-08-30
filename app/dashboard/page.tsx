'use client';
import { SmallSummaryCard } from '@/components/dashboard-charts/SmallSummaryCard';
import { SummaryChart } from '@/components/dashboard-charts/SummaryChart';
import { ToleranceChart } from '@/components/dashboard-charts/TolleranceChart';
import { useStore } from '@/store';
import React from 'react';
const Dashboard = () => {
  const { merged_df } = useStore();
  return (
    <div className="container mx-auto min-h-screen py-6">
      <p className="text-center text-indigo-700 font-semibold mb-6">Dashboard</p>
      <section className="mb-6">
        <SmallSummaryCard title="Total orders" count={3434} />
      </section>
      <main className="grid grid-cols-2 gap-4">
        <SummaryChart />
        <ToleranceChart />
      </main>
    </div>
  );
};

export default Dashboard;
