import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { useFileUpload } from '../hooks/useFileUpload';

export function FileUpload() {
  const { uploadFile, uploading, progress, error } = useFileUpload();
  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      try {
        const url = await uploadFile(file);
        console.log('File uploaded:', url);
      } catch (error) {
        // Error is handled by the hook
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadFile(file);
        console.log('File uploaded:', url);
      } catch (error) {
        // Error is handled by the hook
      }
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`w-full p-8 border-2 border-dashed rounded-lg transition-colors cursor-pointer bg-gray-50
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}
          ${error ? 'border-red-300' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-4">
          <Upload className={`w-12 h-12 ${uploading ? 'text-blue-500 animate-pulse' : error ? 'text-red-500' : 'text-gray-400'}`} />
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              {uploading ? 'Uploading...' : 'Drag and drop your files here'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports PDF, DOC, DOCX, PNG, and JPG (max 10MB)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.png,.jpg"
            id="fileInput"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className={`px-4 py-2 bg-blue-600 text-white rounded-md transition-colors cursor-pointer
              ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            Browse Files
          </label>
        </div>
      </div>
      
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}