
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, MapPin } from 'lucide-react';

interface TopStatsCardProps {
  topDate?: { date: string; count: number } | null;
  topLocation?: { location: string; count: number } | null;
  title?: string;
  label?: string;
  value?: number;
  icon?: React.ReactNode;
  loading?: boolean;
}

const TopStatsCard: React.FC<TopStatsCardProps> = ({ 
  topDate, 
  topLocation, 
  title, 
  label, 
  value, 
  icon,
  loading 
}) => {
  // If it's a single stat card
  if ((title || label) && value !== undefined) {
    const displayTitle = title || label || '';
    
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            {icon && icon}
            <CardTitle className="text-lg font-medium">{displayTitle}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
        </CardContent>
      </Card>
    );
  }
  
  // Original dual stats card view
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg font-medium">Top Performing Day</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {topDate ? (
            <>
              <div className="text-2xl font-bold">{topDate.date}</div>
              <CardDescription>{topDate.count} engagements</CardDescription>
            </>
          ) : (
            <div className="text-gray-500">No data available</div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-lg font-medium">Top Location</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {topLocation && topLocation.location !== 'Unknown' ? (
            <>
              <div className="text-2xl font-bold">{topLocation.location}</div>
              <CardDescription>{topLocation.count} engagements</CardDescription>
            </>
          ) : (
            <div className="text-gray-500">No location data available yet</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TopStatsCard;
