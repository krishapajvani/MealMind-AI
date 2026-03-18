
"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MealCard } from "@/components/MealCard";
import { SavedMeal, getFavorites, removeFromFavorites } from "@/lib/storage";
import { Heart, Trash2, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<SavedMeal[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (id: string) => {
    removeFromFavorites(id);
    setFavorites(getFavorites());
  };

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Heart className="h-6 w-6 text-accent fill-accent" />
            </div>
            <h1 className="text-4xl font-headline font-bold text-primary">Your Favorites</h1>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-primary/20 space-y-6">
              <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center mx-auto">
                <UtensilsCrossed className="h-10 w-10 text-primary/30" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-headline font-bold text-primary">No favorites yet</h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Browse meal recommendations and save the ones you love for quick access later.
                </p>
              </div>
              <Button asChild className="bg-primary">
                <Link href="/recommend">Get Recommendations</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((meal) => (
                <div key={meal.id} className="relative group">
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => handleRemove(meal.id)}
                      className="h-8 w-8 rounded-full shadow-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <MealCard meal={meal} isSaved />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
