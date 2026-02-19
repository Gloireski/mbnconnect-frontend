import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get("search") || ""
  const contractType = searchParams.get("contractType")

  // Simule DB
  const jobs = [
    {
        id: '1',
        title: 'Développeur Full-Stack - Alternance',
        company: { name: 'TechCorp', logo: null },
        city: 'Paris',
        contractType: 'alternance' as const,
        salary: { min: 1200, max: 1500 },
        deadline: '2025-03-15',
        description: 'Nous recherchons un développeur full-stack passionné pour rejoindre notre équipe. Vous travaillerez sur des projets innovants avec React, Node.js et PostgreSQL.',
        author: { name: 'Marie Dubois', role: 'Alumni' },
    },
    {
        id: '2',
        title: 'Stage Data Science',
        company: { name: 'AI Solutions', logo: null },
        city: 'Lyon',
        contractType: 'stage' as const,
        salary: { min: 800, max: 1000 },
        deadline: '2025-02-28',
        description: 'Stage de 6 mois en Data Science. Vous participerez à l\'analyse de données massives et à la création de modèles ML.',
        author: { name: 'Jean Martin', role: 'Équipe Pédagogique' },
    },
  ]

  const filtered = jobs.filter((job) => {
    const matchSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchContract =
      !contractType || job.contractType === contractType

    return matchSearch && matchContract
  })

  return NextResponse.json(filtered)
}
