import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import useContract from '@/contracts/useContracts';
import ErrorCard from '@/components/errorClaimCode';

const CodePage: NextPage = () => {
    const [iserror,setIsError] = useState<boolean>(false)
  const { claimCode } = useContract();
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    const executeClaim = async () => {
      if (!code) {
        // Uncomment the following line if you want to redirect to the homepage when there's no code
        // router.push('/');
        console.log("No code provided");
      } else {
        try {
          await claimCode(code as string);
        } catch (error) {
            setIsError(true)
          console.error('Error claiming code:', error);
        }
      }
    };

    if (code) {
      executeClaim();
    }
  }, [code, claimCode]);

  if (!code) {
    return null; // or a loading spinner if desired
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1>Dynamic Route Page</h1>
      <p>The code is: {code}</p>
      {iserror && <ErrorCard/>}
    </div>
  );
};

export default CodePage;
