import React from 'react';
import { ListChecks, AlignLeft, Settings2 } from 'lucide-react';

export function QuestionOptions() {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Question Type
        </label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: ListChecks, label: 'MCQ', value: 'mcq' },
            { icon: AlignLeft, label: 'Subjective', value: 'subjective' },
            { icon: Settings2, label: 'Both', value: 'both' },
          ].map(({ icon: Icon, label, value }) => (
            <button
              key={value}
              className="flex flex-col items-center p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Icon className="w-6 h-6 text-blue-600" />
              <span className="mt-2 text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Number of Questions
        </label>
        <input
          type="range"
          min="1"
          max="50"
          defaultValue="10"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>1</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>
    </div>
  );
}