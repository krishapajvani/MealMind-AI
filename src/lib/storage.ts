
"use client";

import { GeneratePersonalizedMealRecommendationsOutput } from "@/ai/flows/generate-personalized-meal-recommendations";

export type SavedMeal = GeneratePersonalizedMealRecommendationsOutput['recommendations'][0] & {
  id: string;
  savedAt: number;
};

export type UserProfile = {
  dietaryPreferences: string[];
  allergies: string[];
  cuisinePreferences: string[];
};

const FAVORITES_KEY = "mealmind_favorites";
const PROFILE_KEY = "mealmind_profile";

export function getFavorites(): SavedMeal[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveToFavorites(meal: GeneratePersonalizedMealRecommendationsOutput['recommendations'][0]) {
  const favorites = getFavorites();
  const id = `${meal.name}-${Date.now()}`;
  const newMeal: SavedMeal = { ...meal, id, savedAt: Date.now() };
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([newMeal, ...favorites]));
}

export function removeFromFavorites(id: string) {
  const favorites = getFavorites();
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.filter((m) => m.id !== id)));
}

export function getProfile(): UserProfile {
  if (typeof window === "undefined") return { dietaryPreferences: [], allergies: [], cuisinePreferences: [] };
  const stored = localStorage.getItem(PROFILE_KEY);
  return stored ? JSON.parse(stored) : { dietaryPreferences: [], allergies: [], cuisinePreferences: [] };
}

export function saveProfile(profile: UserProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}
