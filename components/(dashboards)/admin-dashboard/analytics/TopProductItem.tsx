"use client"

import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import type { ProductData } from "./schema";
import { formatCurrency, formatPercentage } from "./formatters";

interface TopProductItemProps {
  product: ProductData;
}

export function TopProductItem({ product }: TopProductItemProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <span className="analytics-rank-text text-analytics-rank-text flex-shrink-0">
          {product.rank}
        </span>
        <div className="relative w-10 h-10 rounded-lg border-[1.5px] border-white overflow-hidden flex-shrink-0">
          {/* <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          /> */}
        </div>
        <div className="min-w-0 flex-1">
          <div className="analytics-item-name text-analytics-list-title truncate">
            {product.name}
          </div>
          <div className="analytics-item-subtitle text-analytics-list-subtitle truncate">
            {product.organization}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <div className="flex items-center gap-1">
          <ArrowUpIcon width={12} height={12} color="#676767" />
          <span className="analytics-stat-change text-analytics-growth-text">
            {formatPercentage(product.growthPercentage)}
          </span>
        </div>
        <div className="analytics-revenue-text text-analytics-revenue-text">
          {formatCurrency(product.revenue)}
        </div>
      </div>
    </div>
  );
}