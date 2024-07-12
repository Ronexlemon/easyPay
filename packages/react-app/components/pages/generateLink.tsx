import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode } from "lucide-react";
import { QRcode } from "../qrcode";

export function GenerateCard() {
  const [copied, setCopied] = useState(false);
  const [opendrawer,setOpenDrawer] = useState<boolean>(false)

  const copyToClipboard = () => {
    const textToCopy = `https://easypay/32673656476375373756357357357357`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div>
     
<Card className="w-[400px] bg-gray-300">
      <CardHeader>
        <CardTitle>EASYPAY</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Amount</Label>
            <Input id="name" placeholder="$1" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-sm"> 
                
            <Label className="text-sm" >{`https://easypay/32673656476375373756357357357357`}</Label>

            </div>
            <Button onClick={()=>setOpenDrawer(true)}>Open</Button>
           
            <Button onClick={copyToClipboard} className="bg-blue-500 text-white px-3 py-1 rounded-md">
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex">
        <Button className="w-full bg-green-300 rounded-2xl">Generate</Button>
      </CardFooter>
    </Card>
    <QRcode link="https://easypay/32673656476375373756357357357357"  state={opendrawer} setState={setOpenDrawer}/>
    </div>
    
  );
}
