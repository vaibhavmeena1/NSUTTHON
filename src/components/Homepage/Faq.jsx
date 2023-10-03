import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { memo, useCallback } from "react";
import { Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export function Faq({ showAll }) {
  const allFaqs = useCallback(
    [
      {
        id: "item-1",
        question: "What is NSUTTHON?",
        answer:
          "It is a four-day long event where all societies of the college organize events for the incoming batch.",
      },
      {
        id: "item-2",
        question: "What are the types of events?",
        answer:
          "All the societies will be organizing games and competitions for you to enjoy. The winning teams will be awarded points based on the judging system.",
      },
      {
        id: "item-3",
        question: "Where will the events be held?",
        answer:
          "The events will be held in the NSUT Main Campus. The exact venue will differ from event to event, and will be mentioned in the schedule.",
      },
      {
        id: "item-4",
        question: "Are there any prizes?",
        answer:
          "Prizes for individual events will be decided by the societies organizing the events. However, certificates will be provided to the winners of NSUTTHON. The top 3 teams will also be featured on our social media handles.",
      },
      {
        id: "item-5",
        question: "What to do if two events I like clash?",
        answer:
          "Choose the event you want to attend the most and let your team members attend the other. This way, you get the experience of both the events.<br/><strong>Pro tip:</strong> Make a team of five, so that different members of the same team can participate in different events.",
      },
      {
        id: "item-6",
        question: "What is the Distribution of scores?",
        answer:
          "The points will be distributed as follows: <br/><strong>Winning team:</strong> 40 points<br/><strong>Runner Up team:</strong> 25 points<br/><strong>Second Runner Up team:</strong> 15 points<br/>The team with the maximum number of cumulative points at the end of the fourth day will be declared as the winner of NSUTTHON.",
      },
      {
        id: "item-7",
        question: "What is the Distribution of scores?",
        answer:
          "The points will be distributed as follows: <br/><strong>Winning team:</strong> 40 points<br/><strong>Runner Up team:</strong> 25 points<br/><strong>Second Runner Up team:</strong> 15 points<br/>The team with the maximum number of cumulative points at the end of the fourth day will be declared as the winner of NSUTTHON.",
      },
      {
        id: "item-8",
        question: "What is the Distribution of scores?",
        answer:
          "The points will be distributed as follows: <br/><strong>Winning team:</strong> 40 points<br/><strong>Runner Up team:</strong> 25 points<br/><strong>Second Runner Up team:</strong> 15 points<br/>The team with the maximum number of cumulative points at the end of the fourth day will be declared as the winner of NSUTTHON.",
      },
    ],
    []
  );

  // // Define the classes
  // const hiddenClass = "max-h-10 overflow-hidden transition-max-height duration-500 ease-in-out";
  // const shownClass = "max-h-full transition-max-height duration-500 ease-in-out";
  const containerClass = clsx("faq-container relative overflow-hidden", {
    "with-gradient": !showAll,
  });
  const hiddenClass =
    "opacity-0 max-h-0 overflow-hidden transition-all duration-500 ease-in-out";
  const shownClass =
    "opacity-100 max-h-full transition-all duration-500 ease-in-out";

  return (
    <div
      className={`${containerClass} relative pb-3 border-b-4 overflow-hidden`}
    >
      <Accordion type="single" collapsible className="w-full">
        {allFaqs.map((faq, index) => (
          <AccordionItem
            value={faq.id}
            className={showAll || index < 5 ? shownClass : hiddenClass}
            key={faq.id}
          >
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
