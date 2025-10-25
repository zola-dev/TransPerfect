import React from "react";
import { ErrorDisplayProps } from "../../types";
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
}) => (
  <div className="flex justify-center items-center min-h-[400px]">
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
      <div className="flex items-start gap-3">
        <div className="text-red-600 text-xl">⚠️</div>
        <div className="flex-1">
          <h3 className="text-red-800 font-semibold mb-2">
            Error Loading Data
          </h3>
          <p className="text-red-700 text-sm mb-2">{error.message}</p>
          {error.status && (
            <p className="text-red-600 text-xs mb-4">
              Status: {error.status} {error.statusText}
            </p>
          )}
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  </div>
);
