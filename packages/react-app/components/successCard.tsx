import React from "react";


import { Card,CardContent,CardHeader,CardFooter,CardDescription} from "./ui/card";


const SuccesCard =()=>{
    return(<>
<div className="flex justify-start items-start w-full ">
<Card className="w-[400px] h-72 bg-green-400 rounded-2xl shadow-lg flex justify-center mx-4 items-center">
    
        <CardContent className="flex flex-col justify-center items-center w-full h-full">
        <CardHeader>
        <h1 className="text-2xl font-bold text-orange-400  animate-ping">Congratulations!</h1>
    </CardHeader>
          <h1 className=" text-2xl font-bold text-red-800">Gift card claimed. Enjoy your reward!</h1>
         
        </CardContent>
      </Card>

</div>

    </>)
}

export default SuccesCard;