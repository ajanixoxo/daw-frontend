"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, TrendingUp } from "lucide-react"
import { IProduct } from "@/types/product.types"
import Image from "next/image"

interface TopPerformingProductsProps {
  products: IProduct[]
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)

export function TopPerformingProducts({ products }: TopPerformingProductsProps) {
  // Sort products by price (highest first) as a proxy for top performers
  const topProducts = useMemo(
    () => [...products].sort((a, b) => b.price - a.price).slice(0, 5),
    [products],
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <TrendingUp className="h-5 w-5" />
          Top Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        {topProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="w-10 h-10 text-[#98A2B3] mb-3" />
            <p className="text-sm text-muted-foreground">No products yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product._id}
                className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  {/* Rank number */}
                  <span className="text-sm font-medium text-muted-foreground w-6">
                    {index + 1}
                  </span>

                  {/* Product image */}
                  <div className="h-10 w-10 rounded-lg bg-[#F2F4F7] overflow-hidden shrink-0 flex items-center justify-center">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="h-4 w-4 text-[#98A2B3]" />
                    )}
                  </div>

                  {/* Product info */}
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.category || "Uncategorized"}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <span className="text-sm font-semibold text-foreground min-w-[80px] text-right">
                  {formatCurrency(product.price)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
