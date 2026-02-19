export type Job = {
  id: string
  title: string
  contractType: string
  company?: {
    name: string
    logo: string | null
  }
}
