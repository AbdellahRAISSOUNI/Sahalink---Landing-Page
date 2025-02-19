"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Loader2, ChevronRight, Activity, FileText, Stethoscope, ArrowRight, Thermometer, Pill } from 'lucide-react';

export default function AIDiagnosisContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [symptoms, setSymptoms] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  const commonSymptoms = [
    'Fever', 'Cough', 'Headache', 'Fatigue', 'Nausea',
    'Dizziness', 'Chest Pain', 'Shortness of Breath', 'Body Aches'
  ];

  const handleSymptomClick = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setDiagnosisResult({
        possibleConditions: [
          { condition: 'Upper Respiratory Infection', probability: 85, severity: 'Moderate' },
          { condition: 'Seasonal Allergies', probability: 65, severity: 'Mild' },
          { condition: 'Bronchitis', probability: 45, severity: 'Moderate' },
        ],
        recommendedTests: [
          { name: 'Complete Blood Count', urgency: 'High', timeframe: '24 hours' },
          { name: 'Chest X-Ray', urgency: 'Medium', timeframe: '48 hours' },
          { name: 'Throat Culture', urgency: 'Low', timeframe: '72 hours' },
        ],
        suggestedTreatment: {
          immediate: ['Rest', 'Hydration', 'Antipyretics'],
          medications: ['Antibiotic consideration', 'Symptom-specific relief'],
          followUp: '1 week'
        }
      });
      setIsAnalyzing(false);
      setCurrentStep(3);
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Select Symptoms', icon: Thermometer },
    { number: 2, title: 'Additional Details', icon: FileText },
    { number: 3, title: 'AI Analysis', icon: Brain },
  ];

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-3 gap-3">
              {commonSymptoms.map((symptom) => (
                <motion.button
                  key={symptom}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSymptomClick(symptom)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedSymptoms.includes(symptom)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {symptom}
                </motion.button>
              ))}
            </div>
            {selectedSymptoms.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentStep(2)}
                className="w-full py-3 bg-blue-500 text-white rounded-lg flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Add any additional symptoms or details..."
            />
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 border rounded-lg"
              >
                Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalysis}
                className="flex-1 py-3 bg-blue-500 text-white rounded-lg flex items-center justify-center space-x-2"
              >
                <Brain className="w-5 h-5" />
                <span>Start AI Analysis</span>
              </motion.button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <AnimatePresence>
            {isAnalyzing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 space-y-4"
              >
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <p className="text-lg font-medium">Analyzing symptoms...</p>
              </motion.div>
            ) : diagnosisResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-white">
                    <h3 className="font-medium mb-4 flex items-center">
                      <Activity className="w-5 h-5 text-blue-500 mr-2" />
                      Possible Conditions
                    </h3>
                    {diagnosisResult.possibleConditions.map((condition, index) => (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={index}
                        className="flex items-center justify-between mb-3 p-2 bg-white rounded-lg shadow-sm"
                      >
                        <div>
                          <p className="font-medium">{condition.condition}</p>
                          <p className="text-sm text-gray-500">Severity: {condition.severity}</p>
                        </div>
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          condition.probability > 80 ? 'bg-green-100 text-green-800' :
                          condition.probability > 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {condition.probability}%
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border rounded-lg p-4 bg-gradient-to-br from-purple-50 to-white">
                    <h3 className="font-medium mb-4 flex items-center">
                      <Stethoscope className="w-5 h-5 text-purple-500 mr-2" />
                      Recommended Tests
                    </h3>
                    {diagnosisResult.recommendedTests.map((test, index) => (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={index}
                        className="mb-3 p-2 bg-white rounded-lg shadow-sm"
                      >
                        <div className="flex justify-between items-center">
                          <p className="font-medium">{test.name}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            test.urgency === 'High' ? 'bg-red-100 text-red-800' :
                            test.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {test.urgency}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">Timeframe: {test.timeframe}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4 bg-gradient-to-br from-green-50 to-white"
                >
                  <h3 className="font-medium mb-4 flex items-center">
                    <Pill className="w-5 h-5 text-green-500 mr-2" />
                    Treatment Plan
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <h4 className="font-medium text-sm text-gray-600 mb-2">Immediate Actions</h4>
                      <ul className="space-y-1">
                        {diagnosisResult.suggestedTreatment.immediate.map((action, index) => (
                          <li key={index} className="text-sm flex items-center">
                            <ChevronRight className="w-4 h-4 text-green-500 mr-1" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <h4 className="font-medium text-sm text-gray-600 mb-2">Medications</h4>
                      <ul className="space-y-1">
                        {diagnosisResult.suggestedTreatment.medications.map((med, index) => (
                          <li key={index} className="text-sm flex items-center">
                            <ChevronRight className="w-4 h-4 text-green-500 mr-1" />
                            {med}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <h4 className="font-medium text-sm text-gray-600 mb-2">Follow-up</h4>
                      <p className="text-sm">Recommended in {diagnosisResult.suggestedTreatment.followUp}</p>
                    </div>
                  </div>
                </motion.div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentStep(1);
                      setSelectedSymptoms([]);
                      setSymptoms('');
                      setDiagnosisResult(null);
                    }}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Start New Analysis
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        );
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold flex items-center">
              <Brain className="w-7 h-7 text-blue-500 mr-2" />
              AI Diagnosis Assistant
            </h2>
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="flex items-center"
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step.number === currentStep ? 'bg-blue-500 text-white' :
                    step.number < currentStep ? 'bg-green-500 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ${
                      step.number < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {renderStepContent()}
      </div>
    </div>
  );
}
