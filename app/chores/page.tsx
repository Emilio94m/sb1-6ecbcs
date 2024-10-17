"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

interface Chore {
  id: number;
  name: string;
  assignedTo: string;
  frequency: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export default function ChoresPage() {
  const [chores, setChores] = useState<Chore[]>([]);
  const [newChore, setNewChore] = useState({ name: '', assignedTo: '', frequency: '' });
  const { toast } = useToast();

  const addChore = () => {
    if (newChore.name && newChore.assignedTo && newChore.frequency) {
      setChores([...chores, { ...newChore, id: Date.now(), status: 'Pending' }]);
      setNewChore({ name: '', assignedTo: '', frequency: '' });
      toast({
        title: "Chore added",
        description: `${newChore.name} has been added to the chore list.`,
      });
    }
  };

  const updateChoreStatus = (id: number, status: 'Pending' | 'In Progress' | 'Completed') => {
    setChores(chores.map(chore => 
      chore.id === id ? { ...chore, status } : chore
    ));
    toast({
      title: "Chore status updated",
      description: `Chore status has been updated to ${status}.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chore Management</h1>
      <div className="grid gap-4 mb-6">
        <Input
          placeholder="Chore name"
          value={newChore.name}
          onChange={(e) => setNewChore({ ...newChore, name: e.target.value })}
        />
        <Select onValueChange={(value) => setNewChore({ ...newChore, assignedTo: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Assigned to" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Me">Me</SelectItem>
            <SelectItem value="Partner">Partner</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setNewChore({ ...newChore, frequency: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Daily">Daily</SelectItem>
            <SelectItem value="Weekly">Weekly</SelectItem>
            <SelectItem value="Monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addChore}>Add Chore</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chore</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chores.map((chore) => (
            <TableRow key={chore.id}>
              <TableCell>{chore.name}</TableCell>
              <TableCell>{chore.assignedTo}</TableCell>
              <TableCell>{chore.frequency}</TableCell>
              <TableCell>{chore.status}</TableCell>
              <TableCell>
                <Select
                  defaultValue={chore.status}
                  onValueChange={(value: 'Pending' | 'In Progress' | 'Completed') => updateChoreStatus(chore.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}