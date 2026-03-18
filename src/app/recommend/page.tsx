
"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MealRecommendationForm } from "@/components/MealRecommendationForm";
import { MealCard } from "@/components/MealCard";
import { generatePersonalizedMealRecommendations, GeneratePersonalizedMealRecommendationsInput, GeneratePersonalizedMealRecommendationsOutput } from "@/ai/flows/generate-personalized-meal-recommendations";
import { Sparkles, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RecommendPage() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<GeneratePersonalizedMealRecommendationsOutput['recommendations']>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleGenerate = async (input: GeneratePersonalizedMealRecommendationsInput) => {
    setLoading(true);
    try {
      const result = await generatePersonalizedMealRecommendations(input);
      setRecommendations(result.recommendations);
      setHasSearched(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } catch (error) {
      console.error("Failed to generate recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <MealRecommendationForm onSubmit={handleGenerate} isLoading={loading} />
          </section>

          {hasSearched && (
            <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center justify-between border-b border-primary/10 pb-4">
                <h2 className="text-3xl font-headline font-bold text-primary flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-accent" />
                  Your Personalized Menu
                </h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setHasSearched(false)}
                  className="text-muted-foreground"
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((meal, i) => (
                    <MealCard key={i} meal={meal} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/20 rounded-xl">
                  <p className="text-muted-foreground">No recommendations found. Try adjusting your inputs.</p>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </>
  );
}
