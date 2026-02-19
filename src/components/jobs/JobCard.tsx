// components/jobs/JobCard.tsx
'use client';

import { useState } from 'react';
import { Briefcase, MapPin, Calendar, Heart, Share2, Bookmark } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
// import { useToast } from '@/components/ui/use-toast';
// import { toast } from '@/components/ui/use-toast';
import { toast } from "sonner"

interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logo?: string;
  };
  city: string;
  contractType: 'stage' | 'alternance' | 'cdd' | 'cdi';
  salary?: {
    min: number;
    max: number;
  };
  deadline: string;
  description: string;
  author: {
    name: string;
    role: string;
  };
}

const CONTRACT_LABELS = {
  stage: 'Stage',
  alternance: 'Alternance',
  cdd: 'CDD',
  cdi: 'CDI',
};

const CONTRACT_COLORS = {
  stage: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  alternance: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
  cdd: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
  cdi: 'bg-green-100 text-green-700 hover:bg-green-200',
};

export function JobCard({ job }: { job: Job }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? 'Offre retirée' : 'Offre sauvegardée',
      description: isSaved 
        ? 'L\'offre a été retirée de vos favoris' 
        : 'Vous pouvez la retrouver dans vos offres sauvegardées',
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/jobs/${job.id}`);
    toast({
      title: 'Lien copié !',
      description: 'Le lien de l\'offre a été copié dans le presse-papier',
    });
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 group">
      <CardHeader className="pb-3">
        {/* Company Logo + Title */}
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 border-2 border-gray-100">
            <AvatarImage src={job.company.logo} alt={job.company.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
              {job.company.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-gray-600">{job.company.name}</p>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleSave}
            >
              <Bookmark 
                className={`h-4 w-4 transition-colors ${
                  isSaved ? 'fill-blue-600 text-blue-600' : 'text-gray-400'
                }`} 
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant="secondary" 
            className={CONTRACT_COLORS[job.contractType]}
          >
            {CONTRACT_LABELS[job.contractType]}
          </Badge>
          
          {job.salary && (
            <Badge variant="outline" className="border-green-200 text-green-700">
              {job.salary.min} - {job.salary.max}€
            </Badge>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{job.city}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>
              Expire le {new Date(job.deadline).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>

        {/* Description Preview */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {job.description}
        </p>
      </CardContent>

      <CardFooter className="flex gap-2 pt-0">
        {/* View Details Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              Voir détails
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{job.title}</DialogTitle>
              <DialogDescription>
                {job.company.name} • {job.city}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="flex gap-2">
                <Badge className={CONTRACT_COLORS[job.contractType]}>
                  {CONTRACT_LABELS[job.contractType]}
                </Badge>
                {job.salary && (
                  <Badge variant="outline">
                    {job.salary.min} - {job.salary.max}€/mois
                  </Badge>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-700 whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Posté par {job.author.name} ({job.author.role})
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button className="flex-1">
                Postuler
              </Button>
              <Button variant="outline" onClick={handleSave}>
                {isSaved ? 'Retiré' : 'Sauvegarder'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Quick Apply */}
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          Postuler
        </Button>
      </CardFooter>
    </Card>
  );
}