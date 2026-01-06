import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useRef } from "react";
import { PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  updateBenefits: (item: any) => void;
}

export default function DialogAddBenefit({ updateBenefits }: Props) {
  const benefitRef = useRef<HTMLInputElement>(null);
  const inputDescription = useRef<HTMLTextAreaElement>(null);

  const handleAddBenefit = () => {
    const benefit = benefitRef.current?.value;
    const description = inputDescription.current?.value;

    if (benefit === "" || description === "") {
      return;
    }

    updateBenefits({
      benefit,
      description,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Benefits
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]:">
        <DialogHeader>
          <DialogTitle>Add Benefits</DialogTitle>
          <DialogDescription>
            Make a New benefit, click save when your done
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8 mb-5">
          <div>
            <Label htmlFor="benefit">Benefit</Label>
            <Input
              id="benefit"
              placeholder="fill your benefits..."
              ref={benefitRef}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="fill your description..."
              ref={inputDescription}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleAddBenefit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
