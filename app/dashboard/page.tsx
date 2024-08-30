'use client';
import { useStore } from '@/store';
import React from 'react';
const Dashboard = () => {
  const { merged_df } = useStore();
  console.log(merged_df);
  return <div>Dashboard</div>;
};

export default Dashboard;
