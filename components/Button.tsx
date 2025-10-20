
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
