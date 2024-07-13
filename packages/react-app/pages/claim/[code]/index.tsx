"use client"
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import useContract from '@/contracts/useContracts';
import ErrorCard from '@/components/errorClaimCode';
import SuccesCard from '@/components/successCard';
import { Button } from '@/components/ui/button';
import WelcomeCard from '@/components/welcomeCard';

const CodePage: NextPage = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [welcome, setIsWelcome] = useState<boolean>(true);
  const { claimCode } = useContract();
  const router = useRouter();
  const { code } = router.query;

  const hasExecuted = useRef<boolean>(false);
  const handleClaim = async () => {
    if(!code){
        console.log("no code")
        return;
    }
    try {
        setIsLoading(true);

      const tx = await claimCode(code as string);
      if(tx.length !=0){
        setIsWelcome(false)
        setIsLoading(false);
        setIsSuccess(true)
        
      }
    } catch (err) {
        setIsWelcome(false)
        console.log(err);
        setIsLoading(false)
        setIsError(true)
      
    }
  };


  return (
    <div className='flex flex-col justify-center items-center gap-8'>
      {isError && <ErrorCard />}
      {isSuccess && <SuccesCard />}
      {loading && <h1>Loading ...</h1>}
      {welcome && <WelcomeCard/>}
      <Button className='w-1/4 bg-green-500 rounded-full'  onClick={handleClaim}>Claim</Button>
    </div>
  );
};

export default CodePage;
