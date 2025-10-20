
import React, { useState, useCallback } from 'react';
import type { Recipe } from './types';
import { generateRecipe } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import IngredientInput from './components/IngredientInput';
import Tag from './components/Tag';
import Button from './components/Button';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import RecipeDisplay from './components/RecipeDisplay';

const ChefIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zM12 6v6h4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l-4 2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9 11.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9 15.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
);


const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>(['1 lb ground beef', '1 can diced tomatoes', '1 onion']);
  const [mealType, setMealType] = useState<string>('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addIngredient = (ingredient: string) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const removeIngredient = (indexToRemove: number) => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  const handleGenerateRecipe = useCallback(async () => {
    if (ingredients.length === 0) {
      setError("Please add at least one ingredient.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const result = await generateRecipe(ingredients, mealType, dietaryRestrictions);
      setRecipe(result);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred.");
        }
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, mealType, dietaryRestrictions]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <ErrorMessage message={error} />;
    }
    if (recipe) {
      return <RecipeDisplay recipe={recipe} />;
    }
    return (
        <div className="text-center p-8 bg-slate-100/50 rounded-2xl">
            <ChefIcon />
            <h3 className="text-xl font-semibold text-slate-700 mt-4">Ready to cook?</h3>
            <p className="text-slate-500">Your generated recipe will appear here once you're ready.</p>
        </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 p-6 bg-white rounded-2xl shadow-lg h-fit">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Your Ingredients</h2>
            <div className="mb-4">
              <IngredientInput onAddIngredient={addIngredient} />
            </div>
            <div className="flex flex-wrap gap-2 mb-6 min-h-[40px]">
              {ingredients.map((ingredient, index) => (
                <Tag key={index} text={ingredient} onRemove={() => removeIngredient(index)} />
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-3 text-slate-800">Options (Optional)</h3>
            <div className="space-y-4 mb-6">
                <div>
                    <label htmlFor="mealType" className="block text-sm font-medium text-slate-700 mb-1">Meal Type</label>
                    <input id="mealType" type="text" value={mealType} onChange={(e) => setMealType(e.target.value)} placeholder="e.g., dinner, dessert" className="w-full p-2 border border-slate-300 rounded-lg"/>
                </div>
                <div>
                    <label htmlFor="dietary" className="block text-sm font-medium text-slate-700 mb-1">Dietary Restrictions</label>
                    <input id="dietary" type="text" value={dietaryRestrictions} onChange={(e) => setDietaryRestrictions(e.target.value)} placeholder="e.g., gluten-free, vegetarian" className="w-full p-2 border border-slate-300 rounded-lg"/>
                </div>
            </div>

            <Button onClick={handleGenerateRecipe} disabled={ingredients.length === 0 || isLoading}>
              {isLoading ? 'Generating...' : 'Generate Recipe'}
            </Button>
          </div>

          <div className="lg:col-span-2">
            {renderContent()}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
