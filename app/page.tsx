import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Household Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/pantry">
          <Button className="w-full h-32 text-xl">Pantry Inventory</Button>
        </Link>
        <Link href="/recipes">
          <Button className="w-full h-32 text-xl">Recipes</Button>
        </Link>
        <Link href="/meal-planning">
          <Button className="w-full h-32 text-xl">Meal Planning</Button>
        </Link>
        <Link href="/shopping-list">
          <Button className="w-full h-32 text-xl">Shopping List</Button>
        </Link>
        <Link href="/chores">
          <Button className="w-full h-32 text-xl">Chore Management</Button>
        </Link>
      </div>
    </div>
  );
}