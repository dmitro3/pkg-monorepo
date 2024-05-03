"use client";

import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  Label,
  Switch,
} from "@winrlabs/ui";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

interface Props {
  children?: React.ReactNode;
}

export const Advanced: React.FC<Props> = ({ children }) => {
  const [accordionValue, setAccordionValue] = React.useState<string>("");

  return (
    (<Accordion
      type="single"
      collapsible
      value={accordionValue}
      onValueChange={(val) => {
        setAccordionValue(val);
      }}
    >
      <AccordionItem value="advanced" className="wr-border-b-0">
        <AccordionPrimitive.Header className="wr-flex">
          <AccordionPrimitive.Trigger
            className={
              "wr-group wr-flex wr-flex-1 wr-items-center wr-justify-between wr-pb-4 wr-font-medium wr-transition-all"
            }
          >
            <Label className="wr-text-white">Advanced</Label>
            <Switch
              className="wr-h-5 wr-w-10 wr-rounded-md wr-bg-zinc-800 wr-data-[state=checked]:bg-lime-600"
              thumbClassName="rounded-sm bg-zinc-500 h-5 w-5 border-zinc-500 data-[state=checked]:border-white data-[state=checked]:bg-white"
              id="advanced-switch"
              checked={accordionValue === "advanced"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setAccordionValue("advanced");
                } else {
                  setAccordionValue("");
                }
              }}
            />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>)
  );
};
