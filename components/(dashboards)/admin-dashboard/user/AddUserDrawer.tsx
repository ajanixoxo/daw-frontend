"use client"

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PlusIcon from "@/components/icons/PlusIcon";

export function AddUserDrawer() {
  const [open, setOpen] = useState(false);

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
        className="w-full sm:max-w-md overflow-y-auto p-4"
        style={{
          backdropFilter: "blur(16px)",
        }}
      >
        <SheetHeader>
          <SheetTitle className="user-mgmt-title">Add New User</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="user-mgmt-table-cell">Organization Name</Label>
            <Input 
              id="name" 
              placeholder="Enter organization name" 
              className="user-mgmt-search-text"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="user-mgmt-table-cell">Description</Label>
            <Input 
              id="description" 
              placeholder="Enter description" 
              className="user-mgmt-search-text"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-name" className="user-mgmt-table-cell">Admin Name</Label>
            <Input 
              id="admin-name" 
              placeholder="Enter admin name" 
              className="user-mgmt-search-text"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-email" className="user-mgmt-table-cell">Admin Email</Label>
            <Input 
              id="admin-email" 
              type="email" 
              placeholder="Enter admin email" 
              className="user-mgmt-search-text"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="user-mgmt-table-cell">Location</Label>
            <Input 
              id="location" 
              placeholder="Enter location" 
              className="user-mgmt-search-text"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-user-mgmt-button-bg text-user-mgmt-button-text hover:bg-black/90"
              onClick={() => {
                // Handle form submission
                console.log("Add user");
                setOpen(false);
              }}
            >
              Add User
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}