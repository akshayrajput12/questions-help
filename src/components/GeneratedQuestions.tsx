import React from 'react';
import { Download, Copy } from 'lucide-react';

export function GeneratedQuestions() {
  const mockQuestions = [
    {
      type: 'mcq',
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      answer: 'Paris',
    },
    {
      type: 'subjective',
      question: 'Explain the process of photosynthesis.',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          Generated Questions
        </h3>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Copy className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {mockQuestions.map((q, i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                {q.type.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500">Question {i + 1}</span>
            </div>
            <p className="text-gray-800 font-medium">{q.question}</p>
            {q.type === 'mcq' && (
              <div className="grid grid-cols-2 gap-2">
                {q.options?.map((option, j) => (
                  <div
                    key={j}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}