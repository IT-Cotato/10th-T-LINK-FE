import React, { useState, useEffect } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Loading from '../pages/Loading';
import { DataType } from '../pages/Statistics/Statistics';
import NoStatsData from './NoStatsData';

interface ChartProps {
  data: DataType[];
}

const Chart = ({ data }: ChartProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" className="bg-white rounded-lg" height={180}>
        <ComposedChart data={data} margin={{ right: 20, left: -15, top: 24 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="name"
            tickFormatter={(value, index) => (selectedIndex === index ? `${data[index].grade}점` : '')}
            className="text-[13px] font-semibold"
          />
          <YAxis domain={[0, 100]} tickCount={3} className="text-[12px] font-semibold" />
          <Bar dataKey="grade" radius={[3, 3, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={selectedIndex === index ? '#12B500' : '#D3D3D3'}
                onClick={() => setSelectedIndex(index)}
                cursor="pointer"
              />
            ))}
          </Bar>
          <Line type="monotone" dataKey="grade" stroke="#12B500" />
        </ComposedChart>
      </ResponsiveContainer>
      {data.length == 0 && <NoStatsData />}
    </div>
  );
};

export default Chart;
