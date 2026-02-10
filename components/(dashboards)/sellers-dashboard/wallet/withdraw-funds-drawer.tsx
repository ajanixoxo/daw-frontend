"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function WithdrawFundsDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 gap-0 border-l border-[#e7e8e9]"
      >
        <SheetHeader className="p-6 border-b border-[#e7e8e9] flex flex-row items-center gap-4 space-y-0 text-left">
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="-ml-2 h-8 w-8 text-[#1d1d2a] hover:bg-transparent hover:text-black"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
          <SheetTitle className="text-xl font-medium text-[#1d1d2a]">
            Withdraw Funds
          </SheetTitle>
        </SheetHeader>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="amount"
                className="text-sm font-medium text-[#1d1d2a]"
              >
                Withdrawal Amount ($)
              </Label>
              <Input
                id="amount"
                placeholder="Enter amount"
                className="h-11 border-[#e7e8e9] placeholder:text-[#98a2b3] focus-visible:ring-[#DB005F] focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="account"
                className="text-sm font-medium text-[#1d1d2a]"
              >
                Bank Account Number
              </Label>
              <Input
                id="account"
                placeholder="Enter account number"
                className="h-11 border-[#e7e8e9] placeholder:text-[#98a2b3] focus-visible:ring-[#DB005F] focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="bank"
                className="text-sm font-medium text-[#1d1d2a]"
              >
                Bank
              </Label>
              <Select>
                <SelectTrigger
                  id="bank"
                  className="h-11 border-[#e7e8e9] text-[#1d1d2a] focus:ring-[#DB005F] focus:ring-offset-0"
                >
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chase">Chase Bank</SelectItem>
                  <SelectItem value="boa">Bank of America</SelectItem>
                  <SelectItem value="wells">Wells Fargo</SelectItem>
                  <SelectItem value="citi">Citi Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full h-12 text-base font-medium text-white bg-[#E6007A] hover:bg-[#c40068] rounded-full shadow-none">
            Withdraw Funds
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
