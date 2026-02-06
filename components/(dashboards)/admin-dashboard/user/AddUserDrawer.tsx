"use client"

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PlusIcon from "@/components/icons/PlusIcon";

export function AddUserDrawer() {
  const [open, setOpen] = useState(false);` `

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-user-mgmt-button-bg text-user-mgmt-button-text hover:bg-black/90 rounded-xl px-6 py-3 h-12 gap-1">
          <PlusIcon width={14} height={14} color="#ffffff" />
          <span className="user-mgmt-button-text">Add User</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        // Removed overflow-y-auto from here to handle it internally
        className="w-full sm:max-w-[500px] p-0 border-l-0 sm:border-l flex flex-col h-full"
        style={{
          backdropFilter: "blur(16px)", 
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header - Fixed at top */}
          <div className="px-6 pt-6 pb-2">
            <div className="flex items-center gap-4 mb-4">
              {/* Back arrow visual only since sheet closes on overlay click usually, 
                   but we can add a close trigger if needed. 
                   For now, just the title as per design. */}
              {/* <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent -ml-2" onClick={() => setOpen(false)}>
                 <ArrowLeftIcon width={24} height={24} color="#000" />
               </Button> */}
            </div>
            <SheetHeader className="space-y-4 text-left p-0">
              <div className="flex items-center gap-3">
                {/* Using a simple SVG for back arrow if icon doesn't exist, strictly visual matching */}
                <button onClick={() => setOpen(false)} className="hover:opacity-70 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <SheetTitle className="text-2xl font-medium">Add New User</SheetTitle>
              </div>
              <SheetDescription className="text-gray-500 text-sm">
                Create a new user account. An invitation email will be sent to the provided email address.
              </SheetDescription>
            </SheetHeader>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-6">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-base font-medium text-gray-700">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter First Nmae"
                    className="h-12 border-gray-200 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-base font-medium text-gray-700">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter Last Name"
                    className="h-12 border-gray-200 bg-white"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className="h-12 border-gray-200 bg-white"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium text-gray-700">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone NUMBER"
                  className="h-12 border-gray-200 bg-white"
                />
              </div>

              {/* User Role */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">User Role</Label>
                <Select>
                  <SelectTrigger className="h-12 border-gray-200 bg-white text-gray-500">
                    <SelectValue placeholder="Select user role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base font-medium text-gray-700">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Write here..."
                  className="min-h-[120px] resize-none border-gray-200 bg-white p-3"
                />
              </div>
            </div>
          </div>

          {/* Footer - Fixed at bottom */}
          <div className="p-6 border-t border-gray-100 bg-white/50 backdrop-blur-sm mt-auto">
            <Button
              className="w-full bg-[#f10e7c] hover:bg-[#d60c6e] text-white h-12 rounded-full text-base font-medium"
              onClick={() => {
                // Handle form submission
                console.log("Create user");
                setOpen(false);
              }}
            >
              Create User
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}