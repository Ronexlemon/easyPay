import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import React from "react"

interface Message {
    message: string
}

export function Toast({ message }: Message) {
  const { toast } = useToast()

  React.useEffect(() => {
    
    toast({
      variant:"default",
      description: message,
     
    })
  }, [message, toast])

  return null
}
