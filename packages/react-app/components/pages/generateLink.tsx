import * as React from "react";
import { useState, useEffect } from "react";
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
import { QRcode } from "../qrcode";
import useContract from "@/contracts/useContracts";
import { ethers } from "ethers";
import { useWaitForTransactionReceipt } from "wagmi";
import { EASYPAYCONTRACT } from "@/constants/constant";
import EASYABI from "./../../abi/EASYPAY.json";

export function GenerateCard() {
  const [copied, setCopied] = useState(false);
  const [opendrawer, setOpenDrawer] = useState<boolean>(false);
  const [amount, setAmount] = useState<bigint | undefined>();
  const [code, setCode] = useState<`0x${string}`>();
  const [codenew, setCodeNew] = useState<any>();
  const { approve, generateCode, claimCode } = useContract();

  const handleClaim =async()=>{
    try{
      //https://easypay/0x6c2870113da898f5eb511ffcd6e9dd6ddd9c698b981050fa435fe043bb21d5fa
      const tx = await claimCode("0x6c2870113da898f5eb511ffcd6e9dd6ddd9c698b981050fa435fe043bb21d5fa");

    }catch(err){
      console.log(err)
    }
  }

  const result = useWaitForTransactionReceipt({
    hash: code,
    
  });

  useEffect(() => {
    if (result.data) {
      console.log("Transaction receipt received:", result.data);

      const iface = new ethers.Interface(EASYABI.abi);

      const parsedLogs = result.data.logs.map(log => {
        return iface.parseLog({ data: log.data, topics: log.topics });
    })
    console.log("parsefaces",parsedLogs[2]?.args[1]);
    // console.log("all parse",parsedLogs);
    // console.log("parsefaces name",parsedLogs[2]?.name);
    // console.log("all parse topics",parsedLogs[2]?.topic);
    // console.log("all parse topics 1",parsedLogs[1]?.topic);
    alert(parsedLogs[2]?.args[1])
    setCodeNew(parsedLogs[2]?.args[1])
    } else if (result.error) {
      console.error("Error waiting for transaction receipt:", result.error);
    }
  }, [result.data, result.error]);

  // const handleApproveAndGenerate = async () => {
  //   try {

  //     const appr = await approve(amount);
  //     console.log("approve:", appr);

  //     if (appr) {
  //       const data = await generateCode(amount);
  //       setCode(data);
  //       console.log("The code is generated:", data);
  //     } else {
  //       console.log("Approval failed.");
  //     }
  //   } catch (err) {
  //     console.error("Error in handleApproveAndGenerate:", err);
  //   }
  // };
  const handleApproveAndGenerate = async () => {
    try {
      const appr = await approve(amount);
      console.log("approve:", appr);
  
      if (appr) {
        // Delay for 5 seconds before calling generateCode
        setTimeout(async () => {
          const data = await generateCode(amount);
          setCode(data);
          console.log("The code is generated:", data);
        }, 7000); // 7000 milliseconds = 7 seconds
      } else {
        console.log("Approval failed.");
      }
    } catch (err) {
      console.error("Error in handleApproveAndGenerate:", err);
    }
  };
  

  const copyToClipboard = () => {
    const textToCopy = `https://easypay/32673656476375373756357357357357`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div>
      <Card className="w-[420px] bg-gray-300 rounded-2xl">
        <CardHeader>
          <CardTitle>EASYPAY</CardTitle>
          <CardDescription>Get A link By Just a click</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                onChange={(e) => setAmount(ethers.parseEther(e.target.value))}
                placeholder="$1"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              {codenew && (
                <Button className="bg-blue-300 text-sm h-10" variant="link" onClick={() => setOpenDrawer(true)}>Get Code</Button>
                
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            onClick={handleApproveAndGenerate}
            variant="default"
            className="w-full bg-green-300 rounded-2xl"
          >
            Generate
          </Button>
          {/* <Button
            onClick={handleClaim}
            className="w-full bg-green-300 rounded-2xl"
          >
          Claim
          </Button> */}
        </CardFooter>
      </Card>
      <QRcode
        link={`https://easy-pay-react-app.vercel.app/claim/${codenew}`}
        state={opendrawer}
        setState={setOpenDrawer}
      />
    </div>
  );
}
