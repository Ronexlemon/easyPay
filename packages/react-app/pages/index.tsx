import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { GenerateCard } from '@/components/pages/generateLink';
import { TabsDemo } from '@/components/pages/tabs';
import { TableDemo } from '@/components/transactionLinks';
export default function Home() {
  const [userAddress, setUserAddress] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h1">
        {/* There you go... a canvas for your next Celo project! */}
      </div>
      <TabsDemo />
      {isConnected ? (
        <TableDemo/>
        
      ) : (
        <div>No Wallet Connected</div>
      )}
    </div>
  );
}