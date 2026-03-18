'use server';
/**
 * @fileOverview A Genkit flow for generating personalized meal recommendations.
 *
 * - generatePersonalizedMealRecommendations - A function that generates meal recommendations based on user input.
 * - GeneratePersonalizedMealRecommendationsInput - The input type for the generatePersonalizedMealRecommendations function.
 * - GeneratePersonalizedMealRecommendationsOutput - The return type for the generatePersonalizedMealRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MealRecommendationSchema = z.object({
  name: z.string().describe('The name of the meal.'),
  description: z.string().describe('A brief description of the meal.'),
  ingredients: z.array(z.string()).describe('A list of ingredients required for the meal.'),
  instructions: z.array(z.string()).describe('Step-by-step cooking instructions.'),
  estimatedPrepTimeMinutes: z.number().describe('Estimated preparation time in minutes.'),
  cuisineType: z.string().describe('The cuisine type of the meal (e.g., Italian, Mexican, Asian).'),
});

const GeneratePersonalizedMealRecommendationsInputSchema = z.object({
  dietaryPreferences: z
    .string()
    .optional()
    .describe('User specified dietary preferences (e.g., vegetarian, gluten-free, vegan).'),
  availableIngredients: z
    .string()
    .optional()
    .describe('A comma-separated list of ingredients the user currently has available.'),
  currentMood: z
    .string()
    .optional()
    .describe('The user\'s current mood or desired food vibe (e.g., cozy, adventurous, light, comforting).'),
  occasion: z
    .string()
    .optional()
    .describe('The occasion for the meal (e.g., quick dinner, special date night, family brunch, potluck).'),
  numberOfRecommendations: z
    .number()
    .int()
    .positive()
    .default(3)
    .optional()
    .describe('The desired number of meal recommendations.'),
});
export type GeneratePersonalizedMealRecommendationsInput = z.infer<
  typeof GeneratePersonalizedMealRecommendationsInputSchema
>;

const GeneratePersonalizedMealRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(MealRecommendationSchema)
    .describe('An array of personalized meal recommendations.'),
});
export type GeneratePersonalizedMealRecommendationsOutput = z.infer<
  typeof GeneratePersonalizedMealRecommendationsOutputSchema
>;

export async function generatePersonalizedMealRecommendations(
  input: GeneratePersonalizedMealRecommendationsInput,
): Promise<GeneratePersonalizedMealRecommendationsOutput> {
  return generatePersonalizedMealRecommendationsFlow(input);
}

const generatePersonalizedMealRecommendationsPrompt = ai.definePrompt({
  name: 'generatePersonalizedMealRecommendationsPrompt',
  input: { schema: GeneratePersonalizedMealRecommendationsInputSchema },
  output: { schema: GeneratePersonalizedMealRecommendationsOutputSchema },
  prompt: `You are an expert AI meal recommendation engine. Your task is to provide personalized and diverse meal recommendations based on the user's input.

For each recommendation, include the meal name, a brief description, a list of ingredients, step-by-step cooking instructions, estimated preparation time in minutes, and the cuisine type.

Ensure the recommendations are creative, suitable for the given criteria, and adhere strictly to any dietary preferences.

User preferences:
{{#if dietaryPreferences}}Dietary Preferences: {{{dietaryPreferences}}}
{{/if}}{{#if availableIngredients}}Available Ingredients: {{{availableIngredients}}}
{{/if}}{{#if currentMood}}Current Mood: {{{currentMood}}}
{{/if}}{{#if occasion}}Occasion: {{{occasion}}}
{{/if}}Please provide {{numberOfRecommendations}} diverse meal recommendations.

`,
});

const generatePersonalizedMealRecommendationsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedMealRecommendationsFlow',
    inputSchema: GeneratePersonalizedMealRecommendationsInputSchema,
    outputSchema: GeneratePersonalizedMealRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await generatePersonalizedMealRecommendationsPrompt(input);
    return output!;
  },
);
