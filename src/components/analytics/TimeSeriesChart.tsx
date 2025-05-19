
import React from 'react';
import { AnalyticsDataPoint } from '@/services/analytics/useAnalyticsData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TimeSeriesChartProps {
  data: AnalyticsDataPoint[];
  loading?: boolean;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data, loading }) => {
  const isEmpty = !data || data.length === 0;
  
  if (isEmpty) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>No data available for this chart</p>
      </div>
    );
  }
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
      >
        <XAxis 
          dataKey="date" 
          tickFormatter={(value) => {
            const date = new Date(value);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }}
        />
        <YAxis />
        <Tooltip
          formatter={(value, name) => [value, name === 'total' ? 'Total' : name === 'clicks' ? 'Clicks' : 'Scans']}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="total" 
          name="Total"
          stroke="#8884d8" 
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
          animationDuration={1500}
        />
        <Line 
          type="monotone" 
          dataKey="clicks" 
          name="Clicks"
          stroke="#2767FF" 
          strokeWidth={2}
          dot={{ r: 3 }}
          animationDuration={1500}
        />
        <Line 
          type="monotone" 
          dataKey="scans" 
          name="Scans"
          stroke="#D946EF" 
          strokeWidth={2}
          dot={{ r: 3 }}
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeSeriesChart;
