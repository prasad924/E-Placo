"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
export default function UnauthorizedPage () {
    const router = useRouter()
    return(
        <>
        <div>unauthorized</div>
        <Button onClick={()=>router.push('/')}> Back to Home </Button>
        </>
    )
}