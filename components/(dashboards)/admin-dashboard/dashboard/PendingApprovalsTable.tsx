"use client"

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import type { ApprovalItem } from "./schema";
import { TypeBadge } from "./TypeBadge";
import { formatDate } from "./formatters";
import ExportIcon from "@/components/icons/ExportIcon";

interface PendingApprovalsTableProps {
  approvals: ApprovalItem[];
}

export function PendingApprovalsTable({ approvals }: PendingApprovalsTableProps) {
  return (
    <Card className="border border-table-border rounded-[10px] shadow-none p-0 gap-0">
      <div className="flex items-center justify-between px-4 py-4 border-b border-table-border rounded-t-[16px] bg-white">
        <h2 className="text-lg font-semibold text-table-header-text">Pending Approvals</h2>
        {/* <Button variant="outline" size="sm" className="gap-1 border-input-border">
          <ExportIcon width={17} height={18} color="#344054" />
          <span className="text-sm font-medium text-export-button-text">Export</span>
        </Button> */}
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-table-header-bg border-b border-table-border hover:bg-table-header-bg">
              <TableHead className="table-header text-table-header-text px-6 py-3">Type</TableHead>
              <TableHead className="table-header text-table-header-text px-4 py-3">Name</TableHead>
              <TableHead className="table-header text-table-header-text px-4 py-3">Submitted By</TableHead>
              <TableHead className="table-header text-table-header-text px-4 py-3">Order Date</TableHead>
              <TableHead className="table-header text-table-header-text px-4 py-3">Description</TableHead>
              <TableHead className="w-12 px-4 py-3"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {approvals.map((approval) => (
              <TableRow key={approval.id} className="border-b border-table-border">
                <TableCell className="px-6 py-4">
                  <TypeBadge type={approval.type} />
                </TableCell>
                <TableCell className="table-cell text-table-row-text px-4 py-4">{approval.name}</TableCell>
                <TableCell className="table-cell text-table-row-text px-4 py-4">{approval.submittedBy}</TableCell>
                <TableCell className="table-cell text-table-row-date px-4 py-4">{formatDate(approval.orderDate)}</TableCell>
                <TableCell className="table-cell text-table-row-text px-4 py-4">{approval.description}</TableCell>
                <TableCell className="px-4 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4 text-table-row-text" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Approve</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">Reject</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}