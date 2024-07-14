import React from "react";

import { useWriteContract,useReadContract,useWaitForTransactionReceipt } from "wagmi";
import { useAccount } from "wagmi";
import { EASYPAYCONTRACT } from "@/constants/constant";
import EASYABI from "../abi/EASYPAY.json";
import CUSDABI from "../abi/IERC20.json";
import { CUSDCONTRACT } from "@/constants/constant";
import { Send } from "lucide-react";


const useContract =()=>{

    const {writeContractAsync: easycontract} = useWriteContract();
    const {writeContractAsync: cusdcontract} = useWriteContract();
    const {data:readcusd} = useReadContract({});
    const {data} = useWaitForTransactionReceipt();

    const generateCode = async(amount:bigint |undefined)=>{
        const data = await easycontract({
            address: EASYPAYCONTRACT,
            functionName: "generateLink",
            args: [amount],
            abi: EASYABI.abi,
            });

            // const result = useWaitForTransactionReceipt({
            //     hash: data,
            //   })
            // return result.data?.logs[0].topics[2];
            return data

    }

    const claimCode = async(code:string | string[])=>{
        const data = await easycontract({
            address: EASYPAYCONTRACT,
            functionName: "claim",
            args: [code],
            abi: EASYABI.abi,
            });

            return data;

    }

const approve = async(amount:bigint | undefined)=>{
    const val = await cusdcontract({
        address: CUSDCONTRACT,
        functionName: "approve",
        args: [EASYPAYCONTRACT,amount],
        abi: CUSDABI.abi,
    })
    // const result = useWaitForTransactionReceipt({
    //     hash: val,
    //   })
    // return result.data?.logs[0].topics[2];
    return val
    
}

//get cusd balance
const sendCusd = async(address:string,amount:bigint)=>{
    const val = await cusdcontract({
        address: CUSDCONTRACT,
        functionName: "transfer",
        args: [address,amount],
        abi: CUSDABI.abi,
        })
        return val;
    }

return{
    approve,claimCode,generateCode,sendCusd
    }

}
export default useContract;