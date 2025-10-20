
import React, { useState } from 'react';

interface IngredientInputProps {
  onAddIngredient: (ingredient: string) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onAddIngredient }) => {
  const [ingredient, setIngredient] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredient.trim()) {
      onAddIngredient(ingredient.trim());
      setIngredient('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="e.g., chicken breast, tomatoes"
        className="flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
      />
      <button
        type="submit"
        className="bg-green-500 text-white font-semibold py-3 px-5 rounded-lg hover:bg-green-600 transition-colors duration-300"
      >
        Add
      </button>
    </form>
  );
};

export default IngredientInput;
