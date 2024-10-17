"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface Recipe {
  id: number;
  name: string;
  ingredients: string;
  instructions: string;
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: '', instructions: '' });
  const { toast } = useToast();

  const addRecipe = () => {
    if (newRecipe.name && newRecipe.ingredients && newRecipe.instructions) {
      setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
      setNewRecipe({ name: '', ingredients: '', instructions: '' });
      toast({
        title: "Recipe added",
        description: `${newRecipe.name} has been added to your recipes.`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recipes</h1>
      <div className="grid gap-4 mb-6">
        <Input
          placeholder="Recipe name"
          value={newRecipe.name}
          onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
        />
        <Textarea
          placeholder="Ingredients (one per line)"
          value={newRecipe.ingredients}
          onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
        />
        <Textarea
          placeholder="Instructions"
          value={newRecipe.instructions}
          onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
        />
        <Button onClick={addRecipe}>Add Recipe</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Card key={recipe.id}>
            <CardHeader>
              <CardTitle>{recipe.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Ingredients:</h3>
              <p className="whitespace-pre-line mb-4">{recipe.ingredients}</p>
              <h3 className="font-semibold mb-2">Instructions:</h3>
              <p className="whitespace-pre-line">{recipe.instructions}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}