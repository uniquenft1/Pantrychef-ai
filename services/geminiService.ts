
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "The name of the recipe.",
    },
    description: {
      type: Type.STRING,
      description: "A short, enticing description of the dish.",
    },
    prepTime: {
      type: Type.STRING,
      description: "Estimated preparation time, e.g., '15 minutes'.",
    },
    cookTime: {
      type: Type.STRING,
      description: "Estimated cooking time, e.g., '30 minutes'.",
    },
    servings: {
        type: Type.STRING,
        description: "How many people the recipe serves, e.g., '4 servings'."
    },
    ingredients: {
      type: Type.ARRAY,
      description: "A list of all ingredients required for the recipe.",
      items: {
        type: Type.STRING,
      },
    },
    instructions: {
      type: Type.ARRAY,
      description: "Step-by-step instructions to prepare the dish.",
      items: {
        type: Type.STRING,
      },
    },
  },
  required: ["recipeName", "description", "prepTime", "cookTime", "servings", "ingredients", "instructions"],
};

export const generateRecipe = async (ingredients: string[], mealType?: string, dietaryRestrictions?: string): Promise<Recipe> => {
  const prompt = `
    Create a delicious recipe using the following ingredients: ${ingredients.join(", ")}.
    ${mealType ? `The recipe should be for ${mealType}.` : ''}
    ${dietaryRestrictions ? `It should also adhere to the following dietary restrictions: ${dietaryRestrictions}.` : ''}
    Please be creative and ensure the recipe is easy to follow.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const recipeData = JSON.parse(jsonText);
    
    return recipeData as Recipe;
  } catch (error) {
    console.error("Error generating recipe:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate recipe from Gemini API: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the recipe.");
  }
};
