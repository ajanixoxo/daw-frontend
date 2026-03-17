"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Cooperative } from "@/hooks/useAdminDashboard";
import { cn } from "@/lib/utils";

interface CooperativesTableProps {
  cooperatives: Cooperative[];
}

export function CooperativesTable({ cooperatives }: CooperativesTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-[#ECFDF3] text-[#027A48]";
      case "pending":
        return "bg-[#FFFAEB] text-[#B54708]";
      case "rejected":
        return "bg-[#FEF3F2] text-[#B42318]";
      case "suspended":
        return "bg-[#FEF3F2] text-[#B42318]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatStatus = (status: string) => {
    if (status === "approved") return "Active";
    return status.charAt(0)                                                                                                                   .toUpperCase() + status.slice(1);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-[#f9fafb]">
          <TableRow>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase">Name</TableHead>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase">Admin</TableHead>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase">Location</TableHead>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase text-center">Members</TableHead>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase text-center">Products</TableHead>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase text-center">Total Sales</TableHead>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase">Reg. Date</TableHead>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase">Status</TableHead>
            {/* <TableHead className="w-[50px]"></TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cooperatives.map((coop) => (
            <TableRow key={coop._id} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f10e7c]/10 flex items-center justify-center text-[#f10e7c] font-bold text-xs">
                    {coop.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-[#1a1a1a] text-sm">{coop.name}</div>
                    <div className="text-xs text-gray-400 max-w-[150px] truncate">{coop.description}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-[#1a1a1a] font-medium">
                  {coop.adminId ? `${coop.adminId.firstName} ${coop.adminId.lastName}` : "N/A"}
                </div>
                <div className="text-xs text-gray-400">{coop.adminId?.email || "N/A"}</div>
              </TableCell>
              <TableCell className="text-sm text-gray-500 italic">Lagos, NG</TableCell>
              <TableCell className="text-center text-sm font-medium text-[#1a1a1a]">
                {coop.members?.length || 0}
              </TableCell>
              <TableCell className="text-center text-sm text-gray-500">127</TableCell>
              <TableCell className="text-center text-sm text-gray-500">Shirt</TableCell>
              <TableCell className="text-sm text-gray-500">
                {new Date(coop.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <span className={cn(
                  "px-2 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1.5",
                  getStatusColor(coop.status)
                )}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {formatStatus(coop.status)}
                </span>
              </TableCell>
              {/* <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4 text-[#667185]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Cooperative</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Suspend Cooperative</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
