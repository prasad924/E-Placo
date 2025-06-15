import { StudentCompanyProfile } from "./student-company-profile"

export default async function StudentCompanyPage({ params }) {
  const { id } = await params
  return (
      <StudentCompanyProfile companyId={id} />
  )
}
