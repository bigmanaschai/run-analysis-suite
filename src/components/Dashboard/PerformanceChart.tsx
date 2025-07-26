import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface PerformanceData {
  time: number;
  position: number;
  velocity: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
  title: string;
  type: 'line' | 'bar';
  dataKey: 'position' | 'velocity';
}

export const PerformanceChart = ({ data, title, type, dataKey }: PerformanceChartProps) => {
  const strokeColor = dataKey === 'velocity' ? '#8B8AC4' : '#A2AADB';
  
  return (
    <Card className="font-prompt">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'line' ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `${value}s`}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => dataKey === 'velocity' ? `${value}m/s` : `${value}m`}
                />
                <Tooltip 
                  labelFormatter={(value) => `Time: ${value}s`}
                  formatter={(value: number) => [
                    `${value.toFixed(3)}${dataKey === 'velocity' ? 'm/s' : 'm'}`,
                    dataKey === 'velocity' ? 'Velocity' : 'Position'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke={strokeColor} 
                  strokeWidth={2}
                  dot={{ fill: strokeColor, strokeWidth: 2 }}
                />
              </LineChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `${value}s`}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => dataKey === 'velocity' ? `${value}m/s` : `${value}m`}
                />
                <Tooltip 
                  labelFormatter={(value) => `Time: ${value}s`}
                  formatter={(value: number) => [
                    `${value.toFixed(3)}${dataKey === 'velocity' ? 'm/s' : 'm'}`,
                    dataKey === 'velocity' ? 'Velocity' : 'Position'
                  ]}
                />
                <Bar dataKey={dataKey} fill={strokeColor} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};