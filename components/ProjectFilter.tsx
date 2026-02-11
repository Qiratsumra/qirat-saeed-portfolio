'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ProjectFilterProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function ProjectFilter({ activeFilter, setActiveFilter }: ProjectFilterProps) {
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'featured', label: 'Featured' },
    { id: 'agentic-ai', label: 'Agentic AI' },
    { id: 'full-stack', label: 'Full-Stack' },
    { id: 'streamlit', label: 'Streamlit Apps' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? 'default' : 'outline'}
          onClick={() => setActiveFilter(filter.id)}
          className={`px-4 py-2 rounded-full capitalize ${
            activeFilter === filter.id 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-background text-foreground hover:bg-accent'
          }`}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}