"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Search, Filter, PieChart, TrendingUp, Calendar, Users, ChevronDown, ChevronRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AIReportsContent() {
  const [activeTab, setActiveTab] = useState('reports');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const reports = [
    {
      id: 1,
      title: 'Weekly Patient Analysis',
      date: '2024-01-15',
      type: 'Analytics',
      summary: 'AI-generated analysis of patient trends and treatment outcomes for the past week.',
      stats: {
        patientCount: 145,
        trend: 'up',
        percentage: 12
      }
    },
    {
      id: 2,
      title: 'Drug Prescription Patterns',
      date: '2024-01-14',
      type: 'Prescriptions',
      summary: 'Analysis of prescription patterns and effectiveness across different patient groups.',
      stats: {
        patientCount: 89,
        trend: 'down',
        percentage: 5
      }
    },
    {
      id: 3,
      title: 'Treatment Success Rates',
      date: '2024-01-13',
      type: 'Outcomes',
      summary: 'Comprehensive analysis of treatment success rates categorized by condition types.',
      stats: {
        patientCount: 234,
        trend: 'up',
        percentage: 18
      }
    },
  ];

  const insights = [
    {
      title: 'Patient Satisfaction',
      value: '92%',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Treatment Efficiency',
      value: '87%',
      change: '+3%',
      trend: 'up'
    },
    {
      title: 'Recovery Rate',
      value: '95%',
      change: '+2%',
      trend: 'up'
    },
    {
      title: 'Average Visit Duration',
      value: '24m',
      change: '-2m',
      trend: 'down'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <FileText className="w-7 h-7 text-blue-500" />
            <h2 className="text-2xl font-semibold">AI Intelligence Center</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            {['reports', 'insights', 'trends'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === tab 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search reports..."
                      className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
                    />
                  </div>
                  
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      <Filter className="w-5 h-5" />
                      <span>Filter by</span>
                      <ChevronDown className="w-4 h-4" />
                    </motion.button>

                    {showFilters && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border p-2 z-10">
                        {['all', 'analytics', 'prescriptions', 'outcomes'].map((filter) => (
                          <button
                            key={filter}
                            onClick={() => {
                              setSelectedFilter(filter);
                              setShowFilters(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                              selectedFilter === filter
                                ? 'bg-blue-50 text-blue-600'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {reports.map((report) => (
                    <motion.div
                      key={report.id}
                      whileHover={{ scale: 1.01 }}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-medium text-lg">{report.title}</h3>
                          <p className="text-gray-600">{report.summary}</p>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">{report.date}</span>
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {report.type}
                            </span>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{report.stats.patientCount} patients</span>
                            </div>
                            <div className={`flex items-center space-x-1 ${
                              report.stats.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {report.stats.trend === 'up' ? (
                                <ArrowUpRight className="w-4 h-4" />
                              ) : (
                                <ArrowDownRight className="w-4 h-4" />
                              )}
                              <span className="text-sm">{report.stats.percentage}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 hover:bg-blue-50 rounded-full"
                        >
                          <Download className="w-5 h-5 text-blue-500" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {insights.map((insight, index) => (
                    <motion.div
                      key={insight.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-gray-600">{insight.title}</h3>
                        <span className={`flex items-center ${
                          insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {insight.trend === 'up' ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          {insight.change}
                        </span>
                      </div>
                      <p className="text-3xl font-semibold mt-2">{insight.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'trends' && (
              <div className="space-y-6">
                {/* Add your trends content here */}
                <div className="h-64 flex items-center justify-center border rounded-lg bg-gray-50">
                  <p className="text-gray-500">Trends visualization coming soon</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
