// components/jobs/JobList.tsx
'use client';

import { useState } from 'react';
import { JobCard } from './JobCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { useQuery } from '@tanstack/react-query';
import { fetchJobs } from '@/services/api/jobs';
import { useDebounce } from 'use-debounce';
import { Job } from '@/types/job';

export function JobList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contractFilter, setContractFilter] = useState<string>('all');
  const [debouncedSearch] = useDebounce(searchQuery, 500)

  const {
    data: jobs = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['jobs', debouncedSearch, contractFilter],
    queryFn: () => 
        fetchJobs({
            search: debouncedSearch,
            contract: contractFilter,
        }),
    placeholderData: (previousData) => previousData,
  })

  console.log(jobs);
//   const filteredJobs = MOCK_JOBS.filter((job) => {
//     const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesContract = contractFilter === 'all' || job.contractType === contractFilter;
//     return matchesSearch && matchesContract;
//   });

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher une offre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Contract Type Filter */}
          <Select value={contractFilter} onValueChange={setContractFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Type de contrat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les contrats</SelectItem>
              <SelectItem value="stage">Stage</SelectItem>
              <SelectItem value="alternance">Alternance</SelectItem>
              <SelectItem value="cdd">CDD</SelectItem>
              <SelectItem value="cdi">CDI</SelectItem>
            </SelectContent>
          </Select>

          {/* More Filters Button */}
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filtres
          </Button>
        </div>
      </div>
      {/* Loading */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">Chargement...</p>
        </div>
      )}
      {/* Error */}
      {isError && (
        <div className="text-center py-12">
          <p className="text-red-500">
            {(error as any)?.response?.data?.message ||
              "Erreur lors du chargement"}
          </p>
        </div>
      )}
      {/* Results Count */}
      {!isLoading && !isError && (
        <>
        <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
            {jobs.length} offre{jobs.length > 1 ? 's' : ''} trouvée{jobs.length > 1 ? 's' : ''}
            </p>
        </div>
        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
        </div>
        {/* Empty State */}
        {jobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucune offre trouvée</p>
          <p className="text-sm text-gray-400 mt-2">
            Essayez de modifier vos filtres
          </p>
        </div>
        )}
        </>
      )}
    </div>
  );
}