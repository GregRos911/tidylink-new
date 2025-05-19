
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export interface LocationDataPoint {
  location: string;
  count: number;
  location_country?: string;
}

interface LocationChartProps {
  data: LocationDataPoint[];
  loading?: boolean;
}

const LocationChart: React.FC<LocationChartProps> = ({ data, loading }) => {
  const isEmpty = !data || data.length === 0;
  
  if (isEmpty) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>No data available for this chart</p>
      </div>
    );
  }
  
  // Transform data to ensure it has the correct format
  const transformedData = data.map(item => ({
    location: item.location || item.location_country || 'Unknown',
    count: item.count || 0
  }));
  
  // Check if we have any non-Unknown locations
  const hasKnownLocations = transformedData.some(item => item.location !== 'Unknown');
  
  // If we have known locations, filter out the Unknown ones
  const filteredData = hasKnownLocations 
    ? transformedData.filter(item => item.location !== 'Unknown')
    : transformedData;
  
  // Sort and limit data to top locations
  const processedData = [...filteredData]
    .sort((a, b) => b.count - a.count)
    .slice(0, 7);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={processedData}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
      >
        <XAxis type="number" />
        <YAxis 
          dataKey="location" 
          type="category" 
          width={70}
          tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 10)}...` : value}
        />
        <Tooltip 
          formatter={(value) => [`${value} visits`, 'Visits']}
          labelFormatter={(label) => `Location: ${label}`}
        />
        <Bar 
          dataKey="count" 
          fill="#2767FF" 
          radius={[0, 4, 4, 0]}
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LocationChart;
