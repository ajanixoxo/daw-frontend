"use client"

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ThreeDotsMenuIcon from "@/components/icons/ThreeDotsMenuIcon";
import { AddUserDrawer } from "./AddUserDrawer";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { UserDetailsDrawer } from "./UserDetailsDrawer";

interface UserActionsMenuProps {
  userId: string;
  userName: string;
  isAdmin?: boolean;
}

export function UserActionsMenu({ userId, userName, isAdmin = false }: UserActionsMenuProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
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
          <DropdownMenuItem onClick={() => setDetailsOpen(true)}>
            View Details
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Edit User
          </DropdownMenuItem> */}
          {isAdmin && (
            <DropdownMenuItem onClick={() => setDeleteOpen(true)} className="text-red-600">
              Delete User
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit User Drawer */}
      <AddUserDrawer
        userId={userId}
        mode="edit"
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteUserDialog
        userId={userId}
        userName={userName}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />

      {/* User Details Drawer */}
      <UserDetailsDrawer
        userId={userId}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
}