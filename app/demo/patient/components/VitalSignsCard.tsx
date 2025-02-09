"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Heart, Thermometer, Droplet, Wind, ChevronDown, BarChart2, TrendingUp, Info } from 'lucide-react';

const vitalSigns = [
  { 
    id: 'heartRate',
    name: 'Heart Rate',
    icon: Heart,
    unit: 'bpm',
    color: '#ef4444'
  },
  {
    id: 'bloodPressure',
    name: 'Blood Pressure',
    icon: Activity,
    unit: 'mmHg',
    color: '#3b82f6'
  },
  {
    id: 'temperature',
    name: 'Temperature',
    icon: Thermometer,
    unit: '°C',
    color: '#f59e0b'
  },
  {
    id: 'oxygenSaturation',
    name: 'Oxygen Saturation',
    icon: Droplet,
    unit: '%',
    color: '#10b981'
  },
  {
    id: 'respiratoryRate',
    name: 'Respiratory Rate',
    icon: Wind,
    unit: 'bpm',
    color: '#8b5cf6'
  }
];

const timeRanges = ['6h', '12h', '24h', '7d'];

const graphTypes = [
  { id: 'line', icon: TrendingUp, label: 'Line' },
  { id: 'area', icon: Activity, label: 'Area' },
  { id: 'bar', icon: BarChart2, label: 'Bar' }
];

export default function VitalSignsCard() {
  const [selectedVital, setSelectedVital] = useState(vitalSigns[0]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [graphType, setGraphType] = useState('line');

  // Generate mock data based on the selected time range
  const getData = () => {
    const points = selectedTimeRange === '7d' ? 7 : 24;
    return Array.from({ length: points }, (_, i) => ({
      time: selectedTimeRange === '7d' ? `Day ${i + 1}` : `${i}:00`,
      value: Math.floor(70 + Math.random() * 30),
      normal: 75
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Activity className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-bold text-gray-800">Vital Signs Monitor</h3>
        </div>
        <Info className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-help" />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {vitalSigns.map((vital) => (
          <motion.button
            key={vital.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedVital(vital)}
            className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-colors ${
              selectedVital.id === vital.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <vital.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{vital.name}</span>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          {graphTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setGraphType(type.id)}
              className={`p-2 rounded-lg flex items-center ${
                graphType === type.id
                  ? 'bg-blue-50 text-blue-500'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <type.icon className="w-5 h-5 mr-1" />
              <span className="text-sm">{type.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <motion.button
              key={range}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTimeRange(range)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTimeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="h-[300px] bg-gray-50 p-4 rounded-xl"
      >
        <ResponsiveContainer width="100%" height="100%">
          {graphType === 'area' ? (
            <AreaChart data={getData()}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fill="url(#colorValue)"
                strokeWidth={2}
                dot={{ r: 4, fill: '#3b82f6' }}
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="normal"
                stroke="#9ca3af"
                strokeDasharray="5 5"
                fill="none"
                dot={false}
              />
            </AreaChart>
          ) : graphType === 'bar' ? (
            <BarChart data={getData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <LineChart data={getData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4, fill: '#3b82f6' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="normal"
                stroke="#9ca3af"
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
