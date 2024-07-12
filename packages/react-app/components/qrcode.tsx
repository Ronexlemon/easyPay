import * as React from "react"

import { Button } from "@/components/ui/button"
//import { QrCode } from "lucide-react"
import QRCode from "react-qr-code";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Copy } from "lucide-react";
import { Toast } from "./toast";





interface prop{
    link: string;
    state:boolean;
    setState: (state:boolean) => void;
}

export function QRcode(props:prop) {
  const [toast, setToast] = React.useState<boolean>(false)
  const [opendrawer,setOpenDrawer]=  React.useState<boolean>(true);
  const copyToClipboard = () => {
    setToast(true)
    const textToCopy = props.link;
    navigator.clipboard.writeText(textToCopy);
    setToast(false)
     // Reset copied state after 2 seconds
  };
  

  

  return (
    <Drawer   open={props.state} onOpenChange={props.setState}>
       
        {toast && <Toast message="Copy successful"  />}

       
      
      <DrawerContent>
        <div className="mx-auto w-full text-gray-100 h-screen bg-black">
            <Button onClick={()=>props.setState(false)}>X</Button>
            <div className="flex justify-center items-center">
                
                <QRCode  value={props.link} className="w-3/4 h-1/4  " color="white" 
                size={256}
                viewBox={`0 0 256 256`}/>


            </div>
         
         
          
          <DrawerFooter>
            <Copy onClick={copyToClipboard}/>
            
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
