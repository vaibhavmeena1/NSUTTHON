import { Terminal, Waves ,ChevronDown } from "lucide-react";
import React, { useState } from "react";

import { Faq } from "@/components/Faq";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function HomePage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* showing stats of last year like 1800+ registreation , 40+ events , 400+ teams  */}
      <div className="flex justify-center gap-4">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
          </CardHeader>
          <CardContent>esrge</CardContent>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
      <div className="p-8 md:p-16 lg:px-48">
  <h1 className="font-extrabold font-raleway text-center pb-4 tracking-tight text-2xl md:text-4xl">
    FAQs
  </h1>
  <Faq showAll={showAllFaqs} />
  {/* <div className={`text-center ${showAllFaqs ? "-mt-7" : "-mt-7"} relative`}> */}
  <div className={`text-center -mt-7  relative`}>

    <button
      className="bg-[#f1f5f9] dark:bg-[#1E2B3E]  p-2 rounded-full transition-transform duration-300"
      onClick={() => setShowAllFaqs(!showAllFaqs)}
      style={{ transform: showAllFaqs ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <ChevronDown className="h-8 w-8  stroke-2" />
    </button>
  </div>
</div>

    </>
  );
}
