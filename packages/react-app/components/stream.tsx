import * as React from "react"

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
import { Badge } from "@/components/ui/badge"
import { Swap } from "./swapDrawer"
import { StreamSend } from "./streamSend"


export function StreamCard(){
    const [opendrawer, setOpenDrawer] = React.useState<boolean>(false);
    const [opendrawersend, setOpenDrawersend] = React.useState<boolean>(false);
  return (
    <div>
        <Card className="w-[400px] bg-green-300 rounded-2xl">
      <CardHeader>
        <CardTitle>Lets Flow</CardTitle>
        
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex  justify-around items-center ">
              <Label htmlFor="name">cUSD BALANCE</Label>
              <Badge>{100}</Badge>
            </div>
            <div className="flex  justify-around items-center ">
              <Label htmlFor="name">cUSDX BALANCE</Label>
              <Badge>{200}</Badge>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={()=>setOpenDrawer(true)} className="rounded-2xl bg-black text-white">Swap</Button>
        <Button onClick={()=>setOpenDrawersend(true)} className="rounded-2xl bg-gray-500 text-white">Stream</Button>
      </CardFooter>
    </Card>
    <Swap state={opendrawer}
        setState={setOpenDrawer}/>
        <StreamSend state={opendrawersend}
        setState={setOpenDrawersend}/>
        

    </div>
    
  )
}
