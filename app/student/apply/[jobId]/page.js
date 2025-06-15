import { StudentApplicationForm } from "./student-application-form"

export default function StudentApplyPage({ params }) {
  return (
      <StudentApplicationForm jobId={params.jobId} />
  )
}
