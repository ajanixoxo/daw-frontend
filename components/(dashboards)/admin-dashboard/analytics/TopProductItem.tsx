"use client"

import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import { formatCurrency, formatPercentage } from "./formatters";
import { TopProduct } from "@/components/(dashboards)/admin-dashboard/analytics/types";

interface TopProductItemProps {
  product: TopProduct;
  rank: number;
}

export function TopProductItem({ product, rank }: TopProductItemProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <span className="analytics-rank-text text-analytics-rank-text flex-shrink-0">
          {rank}
        </span>
        <div className="relative w-10 h-10 rounded-lg border-[1.5px] border-white overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-xs text-gray-400">N/A</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="analytics-item-name text-analytics-list-title truncate">
            {product.name}
          </div>
          <div className="analytics-item-subtitle text-analytics-list-subtitle truncate">
            {product.category}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        {/* <div className="flex items-center gap-1">
          <ArrowUpIcon width={12} height={12} color="#676767" />
          <span className="analytics-stat-change text-analytics-growth-text">
             Growth %
          </span>
        </div> */}
        <div className="analytics-revenue-text text-analytics-revenue-text">
          {formatCurrency(product.totalRevenue)}
        </div>
        <div className="text-xs text-gray-500">
          {product.totalSold} sold
        </div>
      </div>
    </div>
  );
}