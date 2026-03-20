"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminProduct } from "@/hooks/useAdminDashboard";
import { cn } from "@/lib/utils";

interface ListingsTableProps {
  products: AdminProduct[];
}

export function ListingsTable({ products }: ListingsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-[#ECFDF3] text-[#027A48]";
      case "unavailable":
        return "bg-[#FFFAEB] text-[#B54708]";
      case "out_of_stock":
        return "bg-[#FEF3F2] text-[#B42318]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatStatus = (status: string) => {
    if (status === "available") return "Active";
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-[#f9fafb]">
          <TableRow>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase">Product</TableHead>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase">Seller & Cooperatives</TableHead>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase">Category</TableHead>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase">Price</TableHead>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase text-center">Stock</TableHead>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase text-center">Performance</TableHead>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase">Date</TableHead>
            <TableHead className="text-xs font-semibold text-[#667185] uppercase">Status</TableHead>
            {/* <TableHead className="w-[50px]"></TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-[10px]">No img</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-[#1a1a1a] text-sm">{product.name}</div>
                    <div className="text-xs text-gray-400">ID: {product._id.slice(-5).toUpperCase()}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#f10e7c]/10 flex items-center justify-center text-[#f10e7c] font-bold text-[10px]">
                    {product.seller_name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#1a1a1a]">{product.seller_name}</div>
                    <div className="text-xs text-gray-400">{product.shop_name}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full bg-gray-100 text-[#475367] text-[10px] font-medium">
                  {product.category}
                </span>
              </TableCell>
              <TableCell className="text-sm font-medium text-[#1a1a1a]">
                {product.displayCurrency} {product.displayPrice}
              </TableCell>
              <TableCell className="text-center text-sm text-[#1a1a1a]">
                {product.quantity}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-4 text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    </div>
                    <span className="text-xs font-medium">234</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">18</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {new Date(product.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <span className={cn(
                  "px-2 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1.5",
                  getStatusColor(product.status)
                )}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {formatStatus(product.status)}
                </span>
              </TableCell>
              {/* <TableCell>
                <button className="h-8 w-8 p-0 flex items-center justify-center hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-4 w-4 text-[#667185]" />
                </button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
