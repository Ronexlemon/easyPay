

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface alertProps{
    message: string
}

export function AlertMessage({message}:alertProps) {
  return (
    <Alert className= "bg-white text-green-400 rounded-full">
      
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}
