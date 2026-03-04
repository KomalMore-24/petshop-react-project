import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const containerSizeClasses = {
    small: 'p-2',
    medium: 'p-4',
    large: 'p-8'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${containerSizeClasses[size]}`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin`}>
          <div className={`${sizeClasses[size]} border-4 border-blue-600 dark:border-blue-400 rounded-full animate-spin border-t-transparent`}></div>
        </div>
      </div>
      {text && (
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
