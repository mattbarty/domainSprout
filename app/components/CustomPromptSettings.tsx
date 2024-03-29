"use client";

import { useEffect, useState } from "react";

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";

import {
  Textarea
} from "@/app/components/ui/textarea";

import { Label } from "@/app/components/ui/label";

import { Switch } from "@/app/components/ui/switch";

import { useToast } from "@/app/components/ui/use-toast";

import { Input } from "@/app/components/ui/input";

import { Button } from "@/app/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface DomainStyleDescription {
  readonly [key: string]: string;
}

const domainStyleDescriptionDict: DomainStyleDescription = {
  'compound': 'Compound: Combines two relevant words to create a unique domain name.',
  'pun': 'Pun: Domains that play on words, offering a fun and catchy twist.',
  'descriptive': 'Descriptive: Clearly describes the business, providing immediate insight.',
  'abstract': 'Abstract: Memorable and brandable names that don’t necessarily relate directly to the business.'
};




interface CustomPromptSettingsProps {
  customInstructions: string;
  setCustomInstructions: (customInstructions: string) => void;
  domainStyle: string;
  setDomainStyle: (domainStyle: string) => void;
}

const CustomPromptSettings = ({ customInstructions, setCustomInstructions, domainStyle, setDomainStyle }: CustomPromptSettingsProps) => {
  const [tempCustomInstructions, setTempCustomInstructions] = useState(customInstructions);

  const { toast } = useToast();

  const handleSaveInstruction = () => {
    setCustomInstructions(tempCustomInstructions);

    toast({
      title: "Custom Instructions Updated",
      description: "Custom prompt instructions updated.",
      duration: 2000,
    });
  };

  const handleResetInstruction = () => {
    setTempCustomInstructions("");

    toast({
      title: "Custom Instructions Reset",
      description: "Custom prompt instructions reset.",
      duration: 2000,
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className=" text-start">Prompt Settings</DialogTitle>
        <DialogDescription className="text-start">
          Have something specific in mind? Tweak the settings to get the perfect domain name.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-2 mt-4">
        <Label>Domain Style</Label>
        <Select defaultValue="pun" onValueChange={(value) => {
          setDomainStyle(value);
          toast({
            title: "Style Updated",
            description: `Domain style updated to ${value}.`,
            duration: 2000,
          });
        }} value={domainStyle}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a style" />
          </SelectTrigger>
          <SelectContent >
            <SelectGroup>
              <SelectLabel>Domain Style</SelectLabel>
              <SelectItem value="compound" onSelect={() => setDomainStyle('compound')}>Compound</SelectItem>
              <SelectItem value="pun" onSelect={() => setDomainStyle('pun')}>Pun</SelectItem>
              <SelectItem value="descriptive" onSelect={() => setDomainStyle('descriptive')}>Descriptive</SelectItem>
              <SelectItem value="abstract" onSelect={() => setDomainStyle('abstract')}>Abstract</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select >

        <p className="text-xs text-slate-500">
          {domainStyleDescriptionDict[domainStyle]}
        </p>
      </div>

      <Label>Custom Prompt Instructions</Label>
      <div className="border pb-2 rounded-md flex flex-col gap-2">
        <Textarea
          value={tempCustomInstructions}
          onChange={(e) => setTempCustomInstructions(e.target.value)}
          placeholder="e.g. domain must contain the word 'apple'"
          className="resize-none text-[16px] mx-0 rounded-md"
          maxLength={280}
        />
        <p className="text-xs text-slate-500 px-4">
          Specific instructions for the AI to follow when generating domain names.
        </p>
        <div className="flex gap-4 justify-end w-full px-4 mt-2">
          <button
            className="text-slate-500 disabled:text-slate-300"
            disabled={tempCustomInstructions.length === 0}
            onClick={handleResetInstruction}
          >
            reset
          </button>
          <Button
            onClick={handleSaveInstruction}
            disabled={tempCustomInstructions === customInstructions}>
            Save instructions
          </Button>
        </div>
      </div>
    </>
  );
};
export default CustomPromptSettings;