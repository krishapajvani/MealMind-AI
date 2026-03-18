
"use client";

import { useState } from "react";
import { Clock, ChefHat, Info, Heart, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GeneratePersonalizedMealRecommendationsOutput } from "@/ai/flows/generate-personalized-meal-recommendations";
import { cn } from "@/lib/utils";
import { saveToFavorites } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

interface MealCardProps {
  meal: GeneratePersonalizedMealRecommendationsOutput['recommendations'][0];
  isSaved?: boolean;
}

export function MealCard({ meal, isSaved }: MealCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    saveToFavorites(meal);
    toast({
      title: "Saved to favorites!",
      description: `${meal.name} is now in your collection.`,
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-primary/10">
      <div className="bg-primary/5 p-4 flex justify-between items-start">
        <Badge variant="outline" className="bg-background text-primary border-primary/20">
          {meal.cuisineType}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
          <Clock className="h-3 w-3" />
          <span>{meal.estimatedPrepTimeMinutes} mins</span>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary">{meal.name}</CardTitle>
        <CardDescription className="line-clamp-2 text-muted-foreground italic">
          "{meal.description}"
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="ingredients" className="border-none">
            <AccordionTrigger className="hover:no-underline py-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Info className="h-4 w-4 text-accent" />
                Ingredients
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 list-disc list-inside text-sm text-muted-foreground">
                {meal.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="instructions" className="border-none">
            <AccordionTrigger className="hover:no-underline py-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <ChefHat className="h-4 w-4 text-accent" />
                Instructions
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ol className="space-y-3 list-decimal list-inside text-sm text-muted-foreground leading-relaxed">
                {meal.instructions.map((step, i) => (
                  <li key={i} className="pl-2 -indent-5">
                    <span className="inline-block ml-4">{step}</span>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>

      {!isSaved && (
        <CardFooter className="bg-muted/30 pt-4 flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSave}
            className="text-muted-foreground hover:text-accent hover:bg-accent/10"
          >
            <Heart className="h-4 w-4 mr-2" />
            Favorite
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
