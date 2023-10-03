import React from "react";
import { Swords, Users2, User2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function NsutthonGrid({}) {
  return (
    <div className="   grid grid-cols-2 gap-4 sm:grid-cols-4 ">
    {/* showing stats of last year like 1800+ registreation , 40+ events , 400+ teams  */}
      <Card>
        <CardContent className="flex justify-between items-baseline">
          <div className="text-2xl  pt-6 font-bold">450+</div>
          <Users2 className="h-4  w-4 opacity-75" />
        </CardContent>
        <CardFooter className="flex flex-row items-center -mt-4  justify-between space-y-0 ">
          Teams Registered
        </CardFooter>
      </Card>
      <Card>
        <CardContent className="flex justify-between items-baseline">
          <div className="text-2xl pt-6 font-bold">1500+</div>
          <User2 className="h-4 w-4 opacity-75" />
        </CardContent>
        <CardFooter className="flex flex-row items-center -mt-4  justify-between space-y-0 ">
          Users Registered
        </CardFooter>
      </Card>
      <Card>
        <CardContent className="flex justify-between items-baseline">
          <div className="text-2xl pt-6 font-bold">30+</div>
          <Swords className="h-4 w-4 opacity-75" />
        </CardContent>
        <CardFooter className="flex flex-row items-center -mt-4  justify-between space-y-0 ">
          Events
        </CardFooter>
      </Card>
      <Card>
        <CardContent className="flex justify-between items-baseline">
          <div className="text-2xl pt-6 font-bold">30+</div>
          <Swords className="h-4 w-4 opacity-75" />
        </CardContent>
        <CardFooter className="flex flex-row items-center -mt-4  justify-between space-y-0 ">
          Events
        </CardFooter>
      </Card>
    </div>
  );
}
