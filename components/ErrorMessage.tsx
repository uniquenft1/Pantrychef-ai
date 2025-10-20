
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
      <p className="font-bold">Oops! Something went wrong.</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
