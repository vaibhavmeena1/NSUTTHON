import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { NsutthonGrid } from "../components/Homepage/Grid";
import { Faq } from "@/components/Homepage/Faq";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/Homepage/HeroScrollingText";
import { Label } from "@/components/ui/label";
export function HomePage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      <section className="pt-1 h-[95hv]    overflow-hidden">
        <HeroSection />
      </section>

      <div className="md:pt-0 md:p-16 md:pb-0 lg:px-[10vw] xl:px-[12vw] px-[6vw]">
        <section className="h-screen w-full flex  justify-center items-center flex-col ">
          <h1 className="font-extrabold mb-14 font-raleway text-center tracking-tight text-2xl md:text-4xl">
          NSUTTHON: Last Year's Highlights
          </h1>
          <div className=" w-full">
            {" "}
            <NsutthonGrid />
          </div>
        </section>

        <section className="md:h-screen">
          <h1 className="font-extrabold font-raleway text-center pt-16 p-4 tracking-tight text-2xl md:text-4xl">
            FAQs
          </h1>
          <Faq showAll={showAllFaqs} />
          <div className="text-center -mt-7 relative">
            <button
              className={`transform transition-transform duration-300 p-2 rounded-full ${
                showAllFaqs ? "rotate-180" : ""
              } dark:bg-[hsl(0,0%,14.9%)] bg-[hsl(0,0%,89.9%)]`}
              onClick={() => setShowAllFaqs(!showAllFaqs)}
            >
              <ChevronDown className="h-8 w-8 stroke-2" />
            </button>
          </div>
        </section>
        <footer className="flex justify-center flex-col sm:justify-end text-xs text-gray-500  py-2 opacity-80 font-georgia">
          <span className=" text-right hidden sm:block">
            © 2023 NSUTTHON. Developed by{" "}
            <a
              href="https://www.linkedin.com/in/vaibhavmeena1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vaibhav Meena
            </a>
            .
          </span>
          <div className="  sm:hidden text-center">© 2023 NSUTTHON</div>
          <div className=" sm:hidden text-center">
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/vaibhavmeena1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vaibhav Meena
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
