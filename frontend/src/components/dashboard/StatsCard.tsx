import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'blue' | 'green' | 'amber' | 'red' | 'indigo';
}

const colorClasses = {
  blue: {
    bgLight: 'bg-blue-50',
    bgDark: 'bg-blue-500',
    text: 'text-blue-700',
    border: 'border-blue-200'
  },
  green: {
    bgLight: 'bg-green-50',
    bgDark: 'bg-green-500',
    text: 'text-green-700',
    border: 'border-green-200'
  },
  amber: {
    bgLight: 'bg-amber-50',
    bgDark: 'bg-amber-500',
    text: 'text-amber-700',
    border: 'border-amber-200'
  },
  red: {
    bgLight: 'bg-red-50',
    bgDark: 'bg-red-500',
    text: 'text-red-700',
    border: 'border-red-200'
  },
  indigo: {
    bgLight: 'bg-indigo-50',
    bgDark: 'bg-indigo-500',
    text: 'text-indigo-700',
    border: 'border-indigo-200'
  }
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  color
}) => {
  const colorClass = colorClasses[color];

  return (
    <div className={`relative rounded-lg border ${colorClass.border} overflow-hidden hover:shadow-md transition-shadow duration-300`}>
      <div className="p-5">
        <div className="flex items-center">
          <div className={`rounded-full p-3 ${colorClass.bgLight} ${colorClass.text}`}>
            {icon}
          </div>
          
          <div className="ml-5">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
              
              {trend && (
                <p className={`ml-2 flex items-baseline text-sm font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.isPositive ? '↑' : '↓'}
                  <span className="ml-1">{trend.value}%</span>
                </p>
              )}
            </div>
          </div>
        </div>
        
        {description && (
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        )}
      </div>
      
      <div className={`h-1 ${colorClass.bgDark}`}></div>
    </div>
  );
};

export default StatsCard;