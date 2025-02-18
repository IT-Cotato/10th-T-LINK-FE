import React, { PureComponent } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DataType {
  name: string;
  grade: number;
}

const data: DataType[] = [
  { name: 'Page A', grade: 50 },
  { name: 'Page B', grade: 60 },
  { name: 'Page C', grade: 60 },
  { name: 'Page D', grade: 90 },
  { name: 'Page E', grade: 80 },
  { name: 'Page F', grade: 100 },
];

interface StateType {
  selectedIndex: number | null;
}

export default class Example extends PureComponent<{}, StateType> {
  state: StateType = {
    selectedIndex: null,
  };

  handleClick = (entry: DataType, index: number) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { selectedIndex } = this.state;

    return (
      <ResponsiveContainer width="100%" className="bg-white rounded-lg" height={180}>
        <ComposedChart data={data} margin={{ right: 20, left: 0, top: 24 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="name"
            tickFormatter={(value, index) => (selectedIndex === index ? `${data[index].grade}점` : '')}
            className="text-[13px] font-semibold"
          />
          <YAxis domain={[0, 100]} tickCount={3} className="text-[12px] font-semibold" />
          <Bar dataKey="grade" radius={[3, 3, 0, 0]}>
            {data.map((entry: DataType, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={selectedIndex === index ? '#12B500' : '#D3D3D3'}
                onClick={() => this.handleClick(entry, index)}
                cursor="pointer"
              />
            ))}
          </Bar>
          <Line type="monotone" dataKey="grade" stroke="#12B500" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
