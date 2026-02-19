// components/jobs/JobCardSimple.tsx
import { Briefcase, MapPin, Calendar } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  city: string;
  contractType: string;
  deadline: string;
}

export function JobCardSimple({ job }: { job: Job }) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow">
      {/* Header */}
      <h3 className="font-semibold text-lg text-gray-900 mb-2">
        {job.title}
      </h3>
      <p className="text-gray-600 mb-4">{job.company}</p>

      {/* Details */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{job.city}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Briefcase className="w-4 h-4" />
          <span>{job.contractType}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Expire le {new Date(job.deadline).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Actions */}
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
        Voir l'offre
      </button>
    </div>
  );
}