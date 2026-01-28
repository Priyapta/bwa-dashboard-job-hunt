import React, { useRef, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

type InputSkillsProps = {
  form: any;
  name: string;
  label: string;
};

function InputSkills({ form, name, label }: InputSkillsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const skills: string[] = field.value ?? [];

        const handleAddSkill = () => {
          const value = inputRef.current?.value?.trim();
          if (!value || skills.includes(value)) return;

          field.onChange([...skills, value]);
          inputRef.current!.value = "";
        };

        const handleRemoveSkill = (skill: string) => {
          field.onChange(skills.filter((s) => s !== skill));
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>

            <FormControl>
              {/* ⬇️ WAJIB DOM ELEMENT */}
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-35"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  {label}
                </Button>

                {isOpen && (
                  <div className="flex gap-3">
                    <Input
                      ref={inputRef}
                      placeholder="Add skill"
                      className="w-65"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddSkill}>
                      Save
                    </Button>
                  </div>
                )}

                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {skill}
                        <XIcon
                          className="w-3 h-3 cursor-pointer hover:text-red-500"
                          onClick={() => handleRemoveSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default InputSkills;
