
"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { User, CheckCircle2, ShieldAlert, Globe, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile, getProfile, saveProfile } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

const DIETARY_OPTIONS = ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo", "Pescatarian", "Dairy-Free"];
const ALLERGY_OPTIONS = ["Peanuts", "Tree Nuts", "Shellfish", "Soy", "Egg", "Wheat"];
const CUISINE_OPTIONS = ["Italian", "Mexican", "Asian", "Indian", "Mediterranean", "American", "French"];

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    dietaryPreferences: [],
    allergies: [],
    cuisinePreferences: [],
  });
  const { toast } = useToast();

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  const handleToggle = (category: keyof UserProfile, item: string) => {
    setProfile((prev) => {
      const current = [...prev[category]];
      const index = current.indexOf(item);
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(item);
      }
      return { ...prev, [category]: current };
    });
  };

  const handleSave = () => {
    saveProfile(profile);
    toast({
      title: "Profile Updated",
      description: "Your preferences have been saved and will influence future recommendations.",
    });
  };

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-headline font-bold text-primary">Your Preferences</h1>
                <p className="text-muted-foreground">Manage your dietary needs and tastes.</p>
              </div>
            </div>
            <Button onClick={handleSave} className="bg-accent hover:bg-accent/90">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>

          <div className="grid gap-8">
            {/* Dietary Preferences */}
            <Card className="border-primary/10 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary font-headline">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  Dietary Preferences
                </CardTitle>
                <CardDescription>Select any general dietary lifestyles you follow.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {DIETARY_OPTIONS.map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`diet-${opt}`} 
                      checked={profile.dietaryPreferences.includes(opt)}
                      onCheckedChange={() => handleToggle("dietaryPreferences", opt)}
                    />
                    <Label htmlFor={`diet-${opt}`} className="text-sm font-medium leading-none cursor-pointer">
                      {opt}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card className="border-primary/10 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary font-headline">
                  <ShieldAlert className="h-5 w-5 text-destructive" />
                  Allergies & Restrictions
                </CardTitle>
                <CardDescription>Tell us what to strictly avoid in your recommendations.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ALLERGY_OPTIONS.map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`allergy-${opt}`} 
                      checked={profile.allergies.includes(opt)}
                      onCheckedChange={() => handleToggle("allergies", opt)}
                    />
                    <Label htmlFor={`allergy-${opt}`} className="text-sm font-medium leading-none cursor-pointer">
                      {opt}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cuisine Preferences */}
            <Card className="border-primary/10 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary font-headline">
                  <Globe className="h-5 w-5 text-accent" />
                  Favorite Cuisines
                </CardTitle>
                <CardDescription>Help us lean towards the flavors you love most.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CUISINE_OPTIONS.map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`cuisine-${opt}`} 
                      checked={profile.cuisinePreferences.includes(opt)}
                      onCheckedChange={() => handleToggle("cuisinePreferences", opt)}
                    />
                    <Label htmlFor={`cuisine-${opt}`} className="text-sm font-medium leading-none cursor-pointer">
                      {opt}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
