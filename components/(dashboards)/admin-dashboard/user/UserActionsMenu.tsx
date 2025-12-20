"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ThreeDotsMenuIcon from "@/components/icons/ThreeDotsMenuIcon";

interface UserActionsMenuProps {
  userId: string;
}

export function UserActionsMenu({ userId }: UserActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 border border-user-mgmt-table-border rounded-lg hover:bg-gray-50"
        >
          <ThreeDotsMenuIcon width={16} height={16} color="#344054" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => console.log("View", userId)}>
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Edit", userId)}>
          Edit User
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Delete", userId)} className="text-red-600">
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}