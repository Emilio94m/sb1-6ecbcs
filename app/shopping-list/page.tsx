"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

interface ShoppingItem {
  id: number;
  name: string;
  completed: boolean;
}

export default function ShoppingListPage() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const { toast } = useToast();

  const addItem = () => {
    if (newItem) {
      setItems([...items, { id: Date.now(), name: newItem, completed: false }]);
      setNewItem('');
      toast({
        title: "Item added",
        description: `${newItem} has been added to your shopping list.`,
      });
    }
  };

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your shopping list.",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping List</h1>
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Add item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <Button onClick={addItem}>Add</Button>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <Checkbox
              checked={item.completed}
              onCheckedChange={() => toggleItem(item.id)}
              id={`item-${item.id}`}
            />
            <label
              htmlFor={`item-${item.id}`}
              className={`flex-grow ${item.completed ? 'line-through text-gray-500' : ''}`}
            >
              {item.name}
            </label>
            <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}