import { ChevronDown} from "lucide-react";
import React, { useState, useEffect } from "react";
import { NsutthonGrid } from "../components/Homepage/Grid";
import { Faq } from "@/components/Homepage/Faq";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/Homepage/HeroScrollingText";
import { Label } from "@/components/ui/label";
export function HomePage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const navbarHeight = 56; // Height of your navbar in pixels
  const [vh, setVh] = useState(window.innerHeight - navbarHeight);

  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight - navbarHeight);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const snapContainer = document.querySelector(".snap-container");

    if (!snapContainer) {
      console.error("snapContainer is null");
      return;
    }

    let timeoutId = null;
    const onScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const currentScroll = snapContainer.scrollTop;
        const snapHeight = window.innerHeight;
        const snapIndex = Math.round(currentScroll / snapHeight);
        const targetScroll = snapIndex * snapHeight;

        const animateScroll = (
          startTime,
          currentTime,
          startScroll,
          endScroll
        ) => {
          const runtime = currentTime - startTime;
          const progress = Math.min(runtime / 1000, 1);
          const ease =
            progress < 0.5
              ? 2 * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 2) / 2;

          snapContainer.scrollTop =
            startScroll + (endScroll - startScroll) * ease;

          if (runtime < 1000) {
            requestAnimationFrame((timestamp) =>
              animateScroll(startTime, timestamp, startScroll, endScroll)
            );
          }
        };

        requestAnimationFrame((timestamp) =>
          animateScroll(timestamp, timestamp, currentScroll, targetScroll)
        );
      }, 500);
    };

    snapContainer.addEventListener("scroll", onScroll);

    return () => {
      snapContainer.removeEventListener("scroll", onScroll);
    };
  }, []);

  const styles = {
    snapContainer: {
      height: `${vh}px`,
      overflowY: "scroll",
      scrollSnapType: "y mandatory",
    },
    section: {
      scrollSnapAlign: "start",
    },
  };

  return (
    <div style={styles.snapContainer}>
      <section
        style={{ ...styles.section, height: `${vh}px` }}
        className="pt-1     overflow-hidden"
      >
        <HeroSection />
      </section>

      <section
        style={{ ...styles.section, height: `${vh}px` }}
        className="md:px-16  lg:px-[10vw] xl:px-[12vw] px-[6vw]   |      w-full  flex  gap-14 justify-center items-center flex-col "
      >
        <h1 className="font-extrabold  font-raleway text-center tracking-tight text-2xl md:text-4xl">
          NSUTTHON: Last Year's Highlights
        </h1>
        <div className=" w-full">
          <NsutthonGrid />
        </div>
      </section>

      <section
        style={{ ...styles.section, height: `${vh}px` }}
        className="md:px-16  lg:px-[10vw] xl:px-[12vw] px-[6vw]   |  w-full flex flex-col justify-center items-center "
      >
        <div className=" flex-grow w-full flex flex-col justify-center items-center">
        <h1 className="font-extrabold font-raleway text-center pt-16 p-4 tracking-tight text-2xl md:text-4xl">
          FAQs
        </h1>
        <div className="w-full">
          <Faq showAll={showAllFaqs} />
        </div>
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
          </div>
          <footer className=" flex flex-col w-full  sm:justify-end  mb-4 text-right  text-xs text-gray-500 py-2 opacity-80 font-georgia">
          <span className="text-right justify-end items-end hidden sm:flex">
  © 2023 NSUTTHON. Developed by&nbsp;
  <a
    href="https://www.linkedin.com/in/vaibhavmeena1/"
    target="_blank"
    rel="noopener noreferrer"
  > 
    Vaibhav Meena
  </a> 
  .
</span>

          <div className="sm:hidden text-center">© 2023 NSUTTHON</div>
          <div className="sm:hidden text-center">
            Developed by&nbsp;
            <a
              href="https://www.linkedin.com/in/vaibhavmeena1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vaibhav Meena
            </a>
          </div>
        </footer>
      </section>
      
        {/* <footer style={{ ...styles.section }}
 className="flex justify-center flex-col sm:justify-end text-xs text-gray-500  py-2 opacity-80 font-georgia">
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
        </footer> */}
    </div>
  );
}
