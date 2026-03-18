
"use client";

import { useState, useEffect } from "react";
import { Sparkles, ShoppingBasket, Smile, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GeneratePersonalizedMealRecommendationsInput } from "@/ai/flows/generate-personalized-meal-recommendations";
import { getProfile } from "@/lib/storage";

interface MealRecommendationFormProps {
  onSubmit: (input: GeneratePersonalizedMealRecommendationsInput) => void;
  isLoading: boolean;
}

export function MealRecommendationForm({ onSubmit, isLoading }: MealRecommendationFormProps) {
  const [mood, setMood] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [occasion, setOccasion] = useState("");
  const [numRecs, setNumRecs] = useState("3");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile = getProfile();
    
    // Combine profile preferences into dietaryPreferences string for the AI
    const dietaryPrefs = [
      ...profile.dietaryPreferences,
      ...profile.allergies.map(a => `No ${a}`),
      ...profile.cuisinePreferences.map(c => `Prefer ${c}`)
    ].join(", ");

    onSubmit({
      currentMood: mood,
      availableIngredients: ingredients,
      occasion: occasion,
      numberOfRecommendations: parseInt(numRecs),
      dietaryPreferences: dietaryPrefs || "No specific preferences",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl text-primary">Find Your Next Meal</CardTitle>
        <CardDescription>
          Tell our AI what you're feeling, and we'll cook up some suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="mood" className="flex items-center gap-2">
              <Smile className="h-4 w-4 text-accent" />
              How are you feeling?
            </Label>
            <Input 
              id="mood" 
              placeholder="Comforting, adventurous, light, cozy..." 
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="border-primary/20 focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ingredients" className="flex items-center gap-2">
              <ShoppingBasket className="h-4 w-4 text-accent" />
              What ingredients do you have?
            </Label>
            <Textarea 
              id="ingredients" 
              placeholder="Chicken, spinach, pasta, lemon (optional)..." 
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="border-primary/20 focus-visible:ring-primary min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="occasion" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                What's the occasion?
              </Label>
              <Input 
                id="occasion" 
                placeholder="Quick dinner, family brunch..." 
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="border-primary/20 focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recs">Recommendations</Label>
              <Select value={numRecs} onValueChange={setNumRecs}>
                <SelectTrigger id="recs" className="border-primary/20">
                  <SelectValue placeholder="How many?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Choice</SelectItem>
                  <SelectItem value="3">3 Choices</SelectItem>
                  <SelectItem value="5">5 Choices</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-headline text-lg py-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 animate-spin" />
                Thinking...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Get Recommendations
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
