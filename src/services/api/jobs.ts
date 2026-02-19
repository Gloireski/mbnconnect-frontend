import { axiosInstance as api } from "@/lib/axios"
import { Job } from "@/types/job"

export async function fetchJobs({
  search,
  contract,
}: {
  search: string
  contract: string
}) {
  const response = await api.get("/api/jobs", {
    params: {
      search,
      contractType: contract !== "all" ? contract : undefined,
    },
  })

  return response.data as Job[]
}
