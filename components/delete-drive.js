import api from "@/lib/api"
import { toast } from "sonner"
export async function deleteDrive(drive, onSuccess) {
  try {
      const response = await api.delete(`/admin/drive/delete/${drive.id}`)
      toast("Response: " + response.data?.message)
    } catch (error) {
      toast("Error deleting Job")
    } finally {
      onSuccess()
    }
}