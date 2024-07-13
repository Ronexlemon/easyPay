import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/router";

export function Claim() {
  const router = useRouter();
  const [code, setCode] = useState<string>("");

  const handleClaim = () => {
    // Navigate to "/claim/code/[code]" where [code] is the value entered in the input field
    if (code.trim() !== "") {
      router.push(`/claim/${encodeURIComponent(code)}`);
    } else {
      console.log("Please enter a code to claim.");
    }
  };

  return (
    <Card className="w-[400px] bg-black text-gray-100">
      <CardHeader>
        <CardTitle>Claim Your Code</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="code">Claim Code</Label>
            <Input
              id="code"
              placeholder="Enter your claim code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between w-full">
        <Button
          className="bg-orange-300 w-full rounded-3xl"
          onClick={handleClaim}
        >
          REDEEM
        </Button>
      </CardFooter>
    </Card>
  );
}
