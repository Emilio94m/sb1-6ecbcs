"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { ToastProvider } from '@/components/ui/toast';

interface PantryItem {
  id: number;
  name: string;
  quantity: number;
  expirationDate: string;
}

export default function PantryPage() {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', expirationDate: '' });
  const { toast } = useToast();

  const addItem = () => {
    if (newItem.name && newItem.quantity && newItem.expirationDate) {
      setItems([...items, { ...newItem, id: Date.now(), quantity: parseInt(newItem.quantity) }]);
      setNewItem({ name: '', quantity: '', expirationDate: '' });
      toast({
        title: "Item added",
        description: `${newItem.name} has been added to your pantry.`,
      });
    }
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your pantry.",
      variant: "destructive",
    });
  };

  return (
    <ToastProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Pantry Inventory</h1>
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Item name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          />
          <Input
            type="date"
            value={newItem.expirationDate}
            onChange={(e) => setNewItem({ ...newItem, expirationDate: e.target.value })}
          />
          <Button onClick={addItem}>Add Item</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Expiration Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.expirationDate}</TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => deleteItem(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ToastProvider>
  );
}