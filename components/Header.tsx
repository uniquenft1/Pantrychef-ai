
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 md:px-8">
        <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-green-600">
                PantryChef AI
            </h1>
            <p className="text-slate-500 mt-1">Turn your ingredients into delicious meals.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
