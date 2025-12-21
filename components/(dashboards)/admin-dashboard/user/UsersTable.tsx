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
import type { UserData } from "./schema";
import { StatusBadge } from "./StatusBadge";
import { UserActionsMenu } from "./UserActionsMenu";
import { formatDate, formatCurrency } from "./formatters";

interface UsersTableProps {
  users: UserData[];
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="bg-white rounded-[10px] overflow-hidden border border-user-mgmt-table-border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-user-mgmt-table-header-bg hover:bg-user-mgmt-table-header-bg border-b border-user-mgmt-table-border">
              <TableHead className="user-mgmt-table-header text-user-mgmt-table-header-text">Name</TableHead>
              <TableHead className="user-mgmt-table-header text-user-mgmt-table-header-text">Admin</TableHead>
              <TableHead className="user-mgmt-table-header text-user-mgmt-table-header-text">Location</TableHead>
              <TableHead className="user-mgmt-table-header text-user-mgmt-table-header-text">Members</TableHead>
              <TableHead className="user-mgmt-table-header text-user-mgmt-table-header-text">Products</TableHead>
              <TableHead className="user-mgmt-table-header text-user-mgmt-table-header-text">Total Sales</TableHead>
              <TableHead className="user-mgmt-table-header text-user-mgmt-table-header-text">Reg. Date</TableHead>
              <TableHead className="user-mgmt-table-header text-user-mgmt-table-header-text">Stauts</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow 
                key={user.id} 
                className="border-b border-user-mgmt-table-border hover:bg-gray-50/50"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 flex-shrink-0" style={{ backgroundColor: user.avatarColor }}>
                      <AvatarFallback 
                        className="user-mgmt-avatar-text bg-transparent"
                        style={{ color: user.avatarColor }}
                      >
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="user-mgmt-table-name text-user-mgmt-table-text-primary truncate">
                        {user.name}
                      </div>
                      <div className="user-mgmt-table-desc text-user-mgmt-table-text-secondary truncate">
                        {user.description}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="min-w-0">
                    <div className="user-mgmt-table-name text-user-mgmt-table-text-primary truncate">
                      {user.admin.name}
                    </div>
                    <div className="user-mgmt-table-cell text-user-mgmt-table-text-tertiary truncate">
                      {user.admin.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="user-mgmt-table-cell text-user-mgmt-table-text-tertiary">
                  {user.location}
                </TableCell>
                <TableCell className="user-mgmt-table-cell text-user-mgmt-table-text-tertiary">
                  {user.members}
                </TableCell>
                <TableCell className="user-mgmt-table-cell text-user-mgmt-table-text-tertiary">
                  {user.products}
                </TableCell>
                <TableCell className="user-mgmt-table-cell text-user-mgmt-table-text-tertiary">
                  {typeof user.totalSales === 'number' 
                    ? user.totalSales 
                    : user.totalSales}
                </TableCell>
                <TableCell className="user-mgmt-table-cell text-user-mgmt-table-date-text">
                  {user.totalSalesAmount 
                    ? formatCurrency(user.totalSalesAmount)
                    : formatDate(user.regDate)}
                </TableCell>
                <TableCell>
                  <StatusBadge status={user.status} />
                </TableCell>
                <TableCell>
                  <UserActionsMenu userId={user.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}