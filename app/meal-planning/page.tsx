"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

interface MealPlan {
  id: number;
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

export default function MealPlanningPage() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [newMealPlan, setNewMealPlan] = useState({ date: '', breakfast: '', lunch: '', dinner: '' });
  const { toast } = useToast();

  const addMealPlan = () => {
    if (newMealPlan.date && newMealPlan.breakfast && newMealPlan.lunch && newMealPlan.dinner) {
      setMealPlans([...mealPlans, { ...newMealPlan, id: Date.now() }]);
      setNewMealPlan({ date: '', breakfast: '', lunch: '', dinner: '' });
      toast({
        title: "Meal plan added",
        description: `Meal plan for ${newMealPlan.date} has been added.`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Meal Planning</h1>
      <div className="grid gap-4 mb-6">
        <Input
          type="date"
          value={newMealPlan.date}
          onChange={(e) => setNewMealPlan({ ...newMealPlan, date: e.target.value })}
        />
        <Select onValueChange={(value) => setNewMealPlan({ ...newMealPlan, breakfast: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select breakfast" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Oatmeal">Oatmeal</SelectItem>
            <SelectItem value="Eggs and Toast">Eggs and Toast</SelectItem>
            <SelectItem value="Smoothie">Smoothie</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setNewMealPlan({ ...newMealPlan, lunch: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select lunch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Salad">Salad</SelectItem>
            <SelectItem value="Sandwich">Sandwich</SelectItem>
            <SelectItem value="Soup">Soup</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setNewMealPlan({ ...newMealPlan, dinner: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select dinner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Grilled Chicken">Grilled Chicken</SelectItem>
            <SelectItem value="Pasta">Pasta</SelectItem>
            <SelectItem value="Stir Fry">Stir Fry</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addMealPlan}>Add Meal Plan</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Breakfast</TableHead>
            <TableHead>Lunch</TableHead>
            <TableHead>Dinner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mealPlans.map((plan) => (
            <TableRow key={plan.id}>
              <TableCell>{plan.date}</TableCell>
              <TableCell>{plan.breakfast}</TableCell>
              <TableCell>{plan.lunch}</TableCell>
              <TableCell>{plan.dinner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}