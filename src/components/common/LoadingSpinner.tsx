import React from "react";
export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center min-h-[400px]">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      <p className="text-gray-600 font-medium">Loading data...</p>
    </div>
  </div>
);
