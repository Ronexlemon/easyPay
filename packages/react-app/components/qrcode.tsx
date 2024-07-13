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
import { Copy,Share,Share2Icon } from "lucide-react";

import { Toast } from "./toast";





interface prop{
    link: string;
    state:boolean;
    setState: (state:boolean) => void;
}

export function QRcode(props:prop) {
  const [toast, setToast] = React.useState<boolean>(false)
  const [opendrawer,setOpenDrawer]=  React.useState<boolean>(true);
  const shareToGoogleMail = () => {
    const subject = encodeURIComponent("CLAIM YOUR EASYPAY GIFTLINK");
    const body = encodeURIComponent(`ACCESS VIA THE LINK: ${props.link}`);
    const mailToLink = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailToLink, '_blank');
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`Check out this QR Code: ${props.link}`);
    const whatsappLink = `https://api.whatsapp.com/send?text=${text}`;
    window.open(whatsappLink, '_blank');
  };
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
         
         
          
          <DrawerFooter >
            <div className="flex justify-around items-center w-full mt-5">
            <Copy onClick={copyToClipboard}/>
            <Share2Icon onClick={shareToGoogleMail} />
            </div>
            
            
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
