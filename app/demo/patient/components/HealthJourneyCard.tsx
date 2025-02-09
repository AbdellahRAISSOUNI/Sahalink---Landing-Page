"use client"

import { motion, useAnimation } from 'framer-motion';
import { Trophy, Award, Star, Smile, Target } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HealthJourneyCardProps {
  currentScore: number;
  goals: Array<{
    title: string;
    progress: number;
    target: number;
    unit: string;
  }>;
}

export default function HealthJourneyCard({ currentScore, goals }: HealthJourneyCardProps) {
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 2, repeat: Infinity }
    });
  }, [controls]);

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
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 shadow-xl"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
        Health Journey
      </h3>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-700">Current Score</span>
          <motion.div
            animate={controls}
            className="flex items-center bg-yellow-100 px-4 py-2 rounded-full"
          >
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-xl font-bold text-yellow-700">{currentScore}</span>
          </motion.div>
        </div>

        <div className="relative h-24 mb-4">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 300 }}
            dragElastic={0.1}
            whileDrag={{ scale: 1.1 }}
            onDragEnd={(_, info) => {
              setDragPosition({ ...dragPosition, x: info.point.x });
            }}
            className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer z-10"
          >
            <Trophy className="w-8 h-8 text-yellow-500" />
          </motion.div>
          <div className="absolute bottom-6 left-0 right-0 h-3 bg-gradient-to-r from-red-300 via-yellow-300 to-green-300 rounded-full" />
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-sm text-gray-600">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedGoal(selectedGoal === index ? null : index)}
            className={`p-4 rounded-xl cursor-pointer transition-colors ${
              selectedGoal === index ? 'bg-green-100' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Target className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-medium text-gray-800">{goal.title}</span>
              </div>
              <motion.div
                animate={selectedGoal === index ? { rotate: 180 } : { rotate: 0 }}
                className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center"
              >
                <Smile className="w-5 h-5 text-green-500" />
              </motion.div>
            </div>

            <motion.div
              initial="hidden"
              animate={selectedGoal === index ? "visible" : "hidden"}
              variants={{
                visible: { height: "auto", opacity: 1 },
                hidden: { height: 0, opacity: 0 }
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                        Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-green-600">
                        {Math.round((goal.progress / goal.target) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex h-2 mb-4 overflow-hidden rounded bg-green-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(goal.progress / goal.target) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="flex flex-col justify-center rounded bg-green-500"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{goal.progress} {goal.unit}</span>
                    <span>Target: {goal.target} {goal.unit}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl font-medium flex items-center justify-center"
      >
        <Award className="w-5 h-5 mr-2" />
        Set New Goal
      </motion.button>
    </motion.div>
  );
}
