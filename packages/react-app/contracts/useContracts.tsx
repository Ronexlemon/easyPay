import React from "react";

import { useWriteContract,useReadContract,useWaitForTransactionReceipt } from "wagmi";
import { useAccount } from "wagmi";
import { EASYPAYCONTRACT } from "@/constants/constant";
import EASYABI from "../abi/EASYPAY.json";
import CUSDABI from "../abi/IERC20.json";
import { CUSDCONTRACT } from "@/constants/constant";


const useContract =()=>{

    const {writeContractAsync: easycontract} = useWriteContract();
    const {writeContractAsync: cusdcontract} = useWriteContract();
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

return{
    approve,claimCode,generateCode
    }

}
export default useContract