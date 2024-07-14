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

import { Toast } from "./toast";
import useContract from "@/contracts/useContracts";
import { ethers } from "ethers";
import { AlertMessage } from "./alert";





interface prop{
   
    state:boolean;
    setState: (state:boolean) => void;
}

export function StreamSend(props:prop) {
  const {sendCusd} = useContract();
  const [toast, setToast] = React.useState<boolean>(false)
  const [opendrawer,setOpenDrawer]=  React.useState<boolean>(true);
  const [address, setAddress] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("0");
  const [alert,setAlert] = React.useState<boolean>(false);
  const shareToGoogleMail = () => {
    const subject = encodeURIComponent("CLAIM YOUR EASYPAY GIFTLINK");
    const body = encodeURIComponent(`ACCESS VIA THE LINK: }`);
    const mailToLink = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailToLink, '_blank');
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`Check out this QR Code: }`);
    const whatsappLink = `https://api.whatsapp.com/send?text=${text}`;
    window.open(whatsappLink, '_blank');
  };
  const copyToClipboard = () => {
    setToast(true)
    const textToCopy = "d";
    navigator.clipboard.writeText(textToCopy);
    setToast(false)
     // Reset copied state after 2 seconds
  };
  const handleSend = async () => {
    if (amount.trim() === "" || address.trim() === "") {
      // Display toast or alert indicating that both amount and address must be set
      console.log("Please enter both amount and address.");
      return;
    }
    
    const data = await sendCusd(address, ethers.parseEther(amount));
    if(data){
      setAlert(true);
      setAddress("");
      setAmount("");
      setTimeout(() => {
        setAlert(false);
      }, 4000);


    }
   
    // Handle response from sendCusd if needed
  };
  

  

  return (
    <Drawer   open={props.state} onOpenChange={props.setState}>
       
        

       
      
      <DrawerContent>
        <div className="mx-auto w-full text-gray-100 h-screen bg-black">
            <Button onClick={()=>props.setState(false)}>X</Button>
            <div className="flex flex-col justify-center gap-8 items-center mt-8">
            
                
                
            <Card className="w-[400px] bg-gray-500 rounded-2xl">
      <CardHeader>
        <CardTitle>Start Stream</CardTitle>
        
      </CardHeader>
      <CardContent>
        
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Address</Label>
              <Input onChange={(e)=>setAddress(e.target.value)} id="name" type="text" placeholder="0x6365636563...7857" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Amount</Label>
              <Input onChange={(e)=>setAmount(e.target.value)} id="name" type="number" placeholder="$2" />
            </div>
            
          </div>
        
      </CardContent>
      <CardFooter className="flex justify-between">
       
        <Button onClick={handleSend} className="bg-black text-white rounded-full w-full">SEND</Button>
      </CardFooter>
    </Card>
    <div className="flex justify-center items-center w-1/4 ">
    {alert && <AlertMessage message="Successful Stream Start"  />}


    </div>

            </div>
         
         
          
          {/* <DrawerFooter >
            <div className="flex justify-around items-center w-full mt-5">
            <Copy onClick={copyToClipboard}/>
            <Share2Icon onClick={shareToGoogleMail} />
            </div>
            
            
          </DrawerFooter> */}
        </div>
        
      </DrawerContent>
    </Drawer>
  )
}
