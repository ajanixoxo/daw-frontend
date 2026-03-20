"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "./StatusBadge";
import { UserActionsMenu } from "./UserActionsMenu";
import { formatDate } from "./formatters";
import { User } from "@/hooks/useAdminUsers";
import { useAuthStore } from "@/zustand/store";

interface UsersTableProps {
  users: User[];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getRandomColor(name: string) {
  const colors = ["#F9F5FF", "#EFF8FF", "#FEF3F2", "#FFFAEB", "#ECFDF3", "#FDF2FA"];
  const textColors = ["#6941C6", "#175CD3", "#B42318", "#B54708", "#027A48", "#C11574"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return { bg: colors[index], text: textColors[index] };
}

export function UsersTable({ users }: UsersTableProps) {
  const userRoles = useAuthStore((state) => state.user?.roles || []);
  const isAdmin = userRoles.includes("admin");

  return (
    <div className="bg-white rounded-[10px] overflow-hidden border border-user-mgmt-table-border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-user-mgmt-table-header-bg hover:bg-user-mgmt-table-header-bg border-b border-user-mgmt-table-border">
              <TableHead className="user-mgmt-table-header text-user-mgmt-table-header-text">Name</TableHead>
              <TableHead className="user-mgmt-table-header text-user-mgmt-table-header-text">Email</TableHead>
              <TableHead className="user-mgmt-table-header text-user-mgmt-table-header-text">Phone</TableHead>
              <TableHead className="user-mgmt-table-header text-user-mgmt-table-header-text">Role</TableHead>
              <TableHead className="user-mgmt-table-header text-user-mgmt-table-header-text">Shop</TableHead>
              <TableHead className="user-mgmt-table-header text-user-mgmt-table-header-text">Joined</TableHead>
              <TableHead className="user-mgmt-table-header text-user-mgmt-table-header-text">Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const fullName = `${user.firstName} ${user.lastName}`;
              const { bg, text } = getRandomColor(fullName);

              return (
                <TableRow
                  key={user._id}
                  className="border-b border-user-mgmt-table-border hover:bg-gray-50/50"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 flex-shrink-0" style={{ backgroundColor: bg }}>
                        <AvatarFallback
                          className="user-mgmt-avatar-text bg-transparent"
                          style={{ color: text }}
                        >
                          {getInitials(fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="user-mgmt-table-name text-user-mgmt-table-text-primary truncate">
                          {fullName}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="user-mgmt-table-cell text-user-mgmt-table-text-tertiary">
                    {user.email}
                  </TableCell>
                  <TableCell className="user-mgmt-table-cell text-user-mgmt-table-text-tertiary">
                    {user.phone || "N/A"}
                  </TableCell>
                  <TableCell className="user-mgmt-table-cell text-user-mgmt-table-text-tertiary capitalize">
                    {user.roles.join(", ")}
                  </TableCell>
                  <TableCell className="user-mgmt-table-cell text-user-mgmt-table-text-tertiary">
                    {user.shop ? user.shop.name : "-"}
                  </TableCell>
                  <TableCell className="user-mgmt-table-cell text-user-mgmt-table-date-text">
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell>
                    <UserActionsMenu userId={user._id} userName={`${user.firstName} ${user.lastName}`} isAdmin={isAdmin} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}