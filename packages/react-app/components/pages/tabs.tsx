import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { GenerateCard } from "./generateLink"
import { Claim } from "./claim"
import { useRouter } from "next/router"
import { StreamCard } from "../stream"

//6.13.1
export function TabsDemo() {
  const router = useRouter();
  return (
    <Tabs defaultValue="generate" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="generate">Generate</TabsTrigger>
        <TabsTrigger value="claim">Claim</TabsTrigger>
        <TabsTrigger value="stream">Stream</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full" value="generate">
       <GenerateCard/>
      </TabsContent>
      <TabsContent className="w-full" value="claim">
       <Claim/>
      </TabsContent>
      <TabsContent value="stream">
        <StreamCard/>
      </TabsContent>
    </Tabs>
  )
}
