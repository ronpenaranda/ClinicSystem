"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type optionType = {
  value: string;
  label: string;
};

type MultiSelectComboboxProps = {
  label: string;
  options: optionType[];
  onChange?: (e: string[]) => void;
};

export function MultiSelectCombobox({
  label,
  options,
  onChange,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const toggleValue = (value: string) => {
    setSelectedValues((prev) => {
      const newValues = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];

      if (onChange) {
        onChange(newValues);
      }

      return newValues;
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          <div>
            {selectedValues.length > 0 ? (
              <div className="flex gap-1">
                {selectedValues.map((value) => (
                  <div key={value} className="rounded-xl bg-slate-200 p-1">
                    {options.find((fw) => fw.value === value)?.label}
                  </div>
                ))}
              </div>
            ) : (
              <div>{`Select ${label}...`}</div>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${label}`}/>
          <CommandList>
            <CommandEmpty>{`No ${label} found`}</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => toggleValue(item.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(item.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
