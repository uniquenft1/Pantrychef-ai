
import React from 'react';
import type { Recipe } from '../types';

interface RecipeDisplayProps {
  recipe: Recipe;
}

const ClockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
);

const UserGroupIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg>
);


const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-green-700 mb-2">{recipe.recipeName}</h2>
      <p className="text-slate-600 mb-6 italic">{recipe.description}</p>
      
      <div className="flex flex-wrap gap-4 mb-6 text-slate-500">
          <div className="flex items-center bg-slate-100 px-3 py-1 rounded-full">
              <ClockIcon /> Prep: {recipe.prepTime}
          </div>
          <div className="flex items-center bg-slate-100 px-3 py-1 rounded-full">
              <ClockIcon /> Cook: {recipe.cookTime}
          </div>
          <div className="flex items-center bg-slate-100 px-3 py-1 rounded-full">
              <UserGroupIcon /> {recipe.servings}
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-3 text-slate-700 border-b-2 border-green-200 pb-2">Ingredients</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-3 text-slate-700 border-b-2 border-green-200 pb-2">Instructions</h3>
          <ol className="list-decimal list-inside space-y-4 text-slate-700">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="pl-2">{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
