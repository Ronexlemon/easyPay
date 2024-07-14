import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Swap } from "./swapDrawer";
import { StreamSend } from "./streamSend";
import useContract from "@/contracts/useContracts";
import { useAccount, useReadContract } from "wagmi";
import CUSDABI from "../abi/IERC20.json";
import { CUSDCONTRACT } from "@/constants/constant";
import { ethers } from "ethers";
//import Framework from "@superfluid-finance/sdk-core/dist/module/Framework";

//import Framework from "@superfluid-finance/sdk-core/dist/module/Framework";

// Framework initialization code





export function StreamCard() {
  const { address, isConnected } = useAccount();
  
  
  
  const result = useReadContract({
    abi:CUSDABI.abi,
    address: CUSDCONTRACT,
    functionName: 'balanceOf',
    args: [address]
  })

  const [opendrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [opendrawersend, setOpenDrawersend] = React.useState<boolean>(false);
  const [cusdBalance, setCusdBalance] = React.useState<number>(0);
  const [cusdBalanceError, setCusdBalanceError] = React.useState<string | unknown>("");
  const [approveAmount, setApproveAmount] = React.useState("");
  const [upgradeAmount, setUpgradeAmount] = React.useState("");
  const [downgradeAmount, setDowngradeAmount] = React.useState("");
  const [usercusdxbalance,setcusdxBalance] = React.useState<string | undefined>("");
  const [approve, setIsApprove] = React.useState(false);
  const [upgrade, setIsUpgrade] = React.useState(false);
  const [downgrade, setdowngrade] = React.useState(
    false
  );
  const [isaddcusd,setIsAddCusd] = React.useState(false);


  // async function createNewFlow(recipient :string, flowRate:string) {
     
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     await provider.send("eth_requestAccounts", []);
    
  //     const signer = await provider.getSigner();
  //     console.log("usesrs address",await signer.getAddress())
    
  //     const chainId = await window.ethereum.request({ method: "eth_chainId" });
  //     const sf = await Framework.create({
  //       chainId: Number(chainId),
  //       provider: provider
  //     });
    
  //     const superSigner = sf.createSigner({ signer: signer });
    
  //     console.log(signer);
  //     console.log(await superSigner.getAddress());
  //     const daix = await sf.loadSuperToken("fDAIx");
    
  //     console.log(daix);
    
  //     try {
  //       const createFlowOperation = daix.createFlow({
  //         sender: await superSigner.getAddress(),
  //         receiver: recipient,
  //         flowRate: flowRate
  //         // userData?: string
  //       });
    
  //       console.log(createFlowOperation);
  //       console.log("Creating your stream...");
    
  //       const result = await createFlowOperation.exec(superSigner);
  //       console.log(result);
    
  //       console.log(
  //         `Congrats - you've just created a money stream!
  //       `
  //       );
  //     } catch (error) {
  //       console.log(
  //         "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
  //       );
  //       console.error(error);
  //     }
  //   }


  // async function getUserCusdxBalance() {
  //   const provider = new ethers.BrowserProvider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []);
  
  //   const signer = await provider.getSigner();
  //   console.log("usesrs address",await signer.getAddress())
  
  //   const chainId = await window.ethereum.request({ method: "eth_chainId" });
  //   const sf = await Framework.create({
  //     chainId: Number(chainId),
  //     provider: provider
  //   });
  
  //   const superSigner = sf.createSigner({ signer: signer });
  
  //   console.log(signer);
  //   console.log(await superSigner.getAddress());
  //   const celox = await sf.loadSuperToken("cUSDx");
  
  //   console.log(celox);
  
  //   try {
  //     // const downgradeOperation = celox.downgrade({
  //     //   amount: ethers.utils.parseEther(amount)
  //     // });
  //     const userbalancercusdx = celox.balanceOf({
  //       account: address as `0x${string}`,
  //       providerOrSigner:provider
  //     }
       
  //           )
  
      
  
  //    // const bal = await userbalancercusdx.exec(signer);
  //    const userbal = await userbalancercusdx;
  //   //  setcusdxBalance(userbal/10**18);
  //   console.log(
  //     "uer balance",  userbal
  //   );
     
  //     //setLoadingBalance(false);
  //     return (userbal);
           
  
     
  
      
  //   } catch (error) {
  //     console.log(
  //       "cusdx balance failed!"
  //     );
  //     console.error(error);
  //   }
  // }
  
  
  // React.useEffect(() => {
  //   const fetchBalances = async () => {
  //     try {
  //       // const userCusdBalance = await getUserBalance();
  //       const userCusdxBalance = await getUserCusdxBalance();
       
  //       setcusdxBalance(userCusdxBalance);
  //     } catch (error) {
  //       // Handle errors
  //     }
  //   };
  
  //   fetchBalances();
  // }, [usercusdxbalance]);
  
  return (
    <div>
      <Card className="w-[400px] bg-green-300 rounded-2xl">
        <CardHeader>
          <CardTitle>Lets Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex justify-around items-center">
                <Label htmlFor="name">cUSD BALANCE</Label>
                <Badge>{isConnected ? Number(result) : 0}</Badge>
              </div>
              <div className="flex justify-around items-center">
                <Label htmlFor="name">cUSDX BALANCE</Label>
                <Badge>{isConnected ? 24 :23}</Badge>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => setOpenDrawer(true)}
            className="rounded-2xl bg-black text-white"
          >
            Swap
          </Button>
          <Button
            onClick={() => setOpenDrawersend(true)}
            className="rounded-2xl bg-gray-500 text-white"
          >
            Stream
          </Button>
        </CardFooter>
      </Card>
      <Swap state={opendrawer} setState={setOpenDrawer} />
      <StreamSend state={opendrawersend} setState={setOpenDrawersend} />
    </div>
  );
}
