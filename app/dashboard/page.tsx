'use client';
import { SummaryChart } from '@/components/dashboard-charts/SummaryChart';
import { useStore } from '@/store';
import React from 'react';
const Dashboard = () => {
  const { merged_df } = useStore();
  return (
    <div className="container mx-auto min-h-screen py-6">
      <p className="text-center text-indigo-700 font-semibold mb-6">Dashboard</p>
      <SummaryChart />
    </div>
  );
};

export default Dashboard;
