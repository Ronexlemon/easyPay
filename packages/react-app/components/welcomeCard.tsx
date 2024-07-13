import React from "react";


import { Card,CardContent,CardHeader,CardFooter,CardDescription} from "./ui/card";


const WelcomeCard =()=>{
    return(<>
<div className="flex justify-start items-start w-full ">
<Card className="w-[400px] h-72 bg-gray-300 rounded-2xl shadow-lg flex justify-center mx-4 items-center">
        <CardContent className="flex flex-col justify-center items-center w-full h-full">
          <h1 className=" text-3xl font-bold text-orange-800">WELCOME</h1>
          <h1 className=" text-3xl font-bold text-orange-800">EASYPAY</h1>
         
        </CardContent>
      </Card>

</div>

    </>)
}

export default WelcomeCard;