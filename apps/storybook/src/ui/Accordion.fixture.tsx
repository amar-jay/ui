// This is the fixture file for Accordion
import "~/index.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default (
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>Yesp.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>How is the weather today?</AccordionTrigger>
      <AccordionContent>
        Why don' t you stick your head out of the window
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Can you say something nasty to me?</AccordionTrigger>
      <AccordionContent>You better not pee on me</AccordionContent>
    </AccordionItem>
  </Accordion>
);
