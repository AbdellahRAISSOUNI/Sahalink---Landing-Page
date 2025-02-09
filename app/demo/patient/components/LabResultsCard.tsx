"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown, AlertTriangle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';

interface LabResult {
  testName: string;
  date: string;
  value: number;
  unit: string;
  normalRange: {
    min: number;
    max: number;
  };
  trend: 'up' | 'down' | 'stable';
  status: 'normal' | 'high' | 'low';
}

interface LabResultsCardProps {
  results: LabResult[];
}

export default function LabResultsCard({ results }: LabResultsCardProps) {
  const [expandedTest, setExpandedTest] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high':
        return 'text-red-500 bg-red-50';
      case 'low':
        return 'text-yellow-500 bg-yellow-50';
      default:
        return 'text-green-500 bg-green-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0
    }
  };

  const filteredResults = results.filter(result => {
    if (selectedFilter === 'all') return true;
    return result.status === selectedFilter;
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl p-6 shadow-xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <FileText className="w-6 h-6 text-blue-500 mr-2" />
          Lab Results
        </h3>
        <div className="flex space-x-2">
          {['all', 'normal', 'high', 'low'].map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                selectedFilter === filter
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div className="space-y-4">
        <AnimatePresence>
          {filteredResults.map((result, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border rounded-xl overflow-hidden"
            >
              <motion.div
                whileHover={{ backgroundColor: '#f9fafb' }}
                className="p-4 cursor-pointer"
                onClick={() => setExpandedTest(expandedTest === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(result.status)}`}>
                      {result.status === 'normal' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{result.testName}</h4>
                      <p className="text-sm text-gray-500">{result.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        {result.value} {result.unit}
                      </p>
                      <div className="flex items-center text-sm">
                        <span className={`flex items-center ${
                          result.trend === 'up' ? 'text-red-500' : 'text-green-500'
                        }`}>
                          {getTrendIcon(result.trend)}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedTest === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedTest === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t"
                    >
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Normal Range</p>
                          <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 1 }}
                              className="absolute h-full"
                            >
                              <div className="absolute h-full bg-green-200"
                                   style={{
                                     left: `${(result.normalRange.min / (result.normalRange.max * 1.5)) * 100}%`,
                                     width: `${((result.normalRange.max - result.normalRange.min) / (result.normalRange.max * 1.5)) * 100}%`
                                   }} />
                              <motion.div
                                initial={{ x: -10 }}
                                animate={{ x: `${(result.value / (result.normalRange.max * 1.5)) * 100}%` }}
                                transition={{ duration: 1 }}
                                className="absolute w-4 h-4 top-1/2 -mt-2 -ml-2 bg-blue-500 rounded-full"
                              />
                            </motion.div>
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>0</span>
                            <span>{result.normalRange.min}</span>
                            <span>{result.normalRange.max}</span>
                            <span>{result.normalRange.max * 1.5}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
