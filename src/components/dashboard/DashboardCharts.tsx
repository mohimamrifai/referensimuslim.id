'use client';

import { useState, useEffect } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid
} from 'recharts';
import type { DashboardStats } from '@/utils/dashboard-stats';

interface DashboardChartsProps {
  stats: DashboardStats;
}

interface TooltipPayload {
  value: number;
  name?: string;
  dataKey?: string;
  payload: {
    name?: string;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const labelText = payload[0].payload.name || label;
    const valueText = payload[0].value.toLocaleString('id-ID');
    
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md text-sm">
        <p className="font-medium text-gray-900">{labelText}</p>
        <p className="text-gray-600">
          {valueText} {payload[0].dataKey === 'views' || payload[0].name === undefined ? 'Views' : 'Konten'}
        </p>
      </div>
    );
  }
  return null;
};

export default function DashboardCharts({ stats }: DashboardChartsProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-4">5 Kategori Terpopuler (Views)</h3>
          <div className="h-[300px] w-full bg-gray-50 animate-pulse rounded-lg" />
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Performa per Tipe (Rata-rata Views)</h3>
          <div className="h-[300px] w-full bg-gray-50 animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Category Distribution Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-w-0">
        <h3 className="text-lg font-bold text-gray-900 mb-4">5 Kategori Terpopuler (Views)</h3>
        <div className="h-[300px] w-full" style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats.popularCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {stats.popularCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Custom Legend */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {stats.popularCategories.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full shrink-0" 
                style={{ backgroundColor: entry.color }} 
              />
              <span className="text-sm text-gray-600 truncate" title={entry.name}>
                {entry.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Media Type Performance Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-w-0">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Performa per Tipe (Rata-rata Views)</h3>
        <div className="h-[300px] w-full" style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stats.typeDistribution}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6B7280', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6B7280', fontSize: 12 }} 
              />
              <Tooltip 
                cursor={{ fill: '#F3F4F6' }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md text-sm">
                        <p className="font-medium text-gray-900">{label}</p>
                        <p className="text-orange-600 font-semibold">
                          {payload[0].value} Views
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Rata-rata per konten
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="views" 
                fill="#EA580C" 
                radius={[4, 4, 0, 0]} 
                barSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
