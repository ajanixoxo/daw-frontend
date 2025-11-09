import { Search, SlidersHorizontal, Package, Clock, Truck, CheckCircle2, ArrowUp, MoreVertical } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const orders = [
  {
    id: "96003321",
    customer: "Marvin McKinney",
    product: "Turtleneck",
    store: "Faye's Complex",
    date: "Apr 12, 2025",
    amount: "$17.84",
    status: "Shipped",
  },
  {
    id: "96003321",
    customer: "Marvin McKinney",
    product: "Turtleneck",
    store: "Faye's Complex",
    date: "Apr 12, 2025",
    amount: "$17.84",
    status: "Cancelled",
  },
  {
    id: "96003321",
    customer: "Marvin McKinney",
    product: "Turtleneck",
    store: "Faye's Complex",
    date: "Apr 12, 2025",
    amount: "$17.84",
    status: "Pending",
  },
  {
    id: "96003321",
    customer: "Marvin McKinney",
    product: "Turtleneck",
    store: "Faye's Complex",
    date: "Apr 12, 2025",
    amount: "$17.84",
    status: "Shipped",
  },
  {
    id: "96003321",
    customer: "Marvin McKinney",
    product: "Turtleneck",
    store: "Faye's Complex",
    date: "Apr 12, 2025",
    amount: "$17.84",
    status: "Pending",
  },
  {
    id: "96003321",
    customer: "Marvin McKinney",
    product: "Turtleneck",
    store: "Faye's Complex",
    date: "Apr 12, 2025",
    amount: "$17.84",
    status: "Shipped",
  },
  {
    id: "96003321",
    customer: "Marvin McKinney",
    product: "Turtleneck",
    store: "Faye's Complex",
    date: "Apr 12, 2025",
    amount: "$17.84",
    status: "Cancelled",
  },
  {
    id: "96003321",
    customer: "Marvin McKinney",
    product: "Turtleneck",
    store: "Faye's Complex",
    date: "Apr 12, 2025",
    amount: "$17.84",
    status: "Pending",
  },
  {
    id: "96003321",
    customer: "Marvin McKinney",
    product: "Turtleneck",
    store: "Faye's Complex",
    date: "Apr 12, 2025",
    amount: "$17.84",
    status: "Shipped",
  },
  {
    id: "96003321",
    customer: "Marvin McKinney",
    product: "Turtleneck",
    store: "Faye's Complex",
    date: "Apr 12, 2025",
    amount: "$17.84",
    status: "Cancelled",
  },
]

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#000000] mb-1">Orders</h1>
          <p className="text-[#454953] text-sm">Track and manage customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Track Orders Card */}
          <Card className="bg-white border-0 shadow-sm p-5">
            <div className="flex items-start gap-3">
              <div className="bg-[#ffedf6] p-2.5 rounded-lg">
                <Package className="w-5 h-5 text-[#f10e7c]" />
              </div>
              <div className="flex-1">
                <p className="text-[#667185] text-sm mb-1">Track Orders</p>
                <p className="text-3xl font-bold text-[#000000] mb-2">45</p>
                <div className="flex items-center gap-1 text-xs">
                  <ArrowUp className="w-3 h-3 text-[#009a49]" />
                  <span className="text-[#009a49] font-medium">10%</span>
                  <span className="text-[#667185]">from last week</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Pending Orders Card */}
          <Card className="bg-white border-0 shadow-sm p-5">
            <div className="flex items-start gap-3">
              <div className="bg-[#ffedf6] p-2.5 rounded-lg">
                <Clock className="w-5 h-5 text-[#f10e7c]" />
              </div>
              <div className="flex-1">
                <p className="text-[#667185] text-sm mb-1">Pending Orders</p>
                <p className="text-3xl font-bold text-[#000000] mb-2">3</p>
                <p className="text-[#667185] text-xs">Needs processing</p>
              </div>
            </div>
          </Card>

          {/* Shipped Card */}
          <Card className="bg-white border-0 shadow-sm p-5">
            <div className="flex items-start gap-3">
              <div className="bg-[#ffedf6] p-2.5 rounded-lg">
                <Truck className="w-5 h-5 text-[#f10e7c]" />
              </div>
              <div className="flex-1">
                <p className="text-[#667185] text-sm mb-1">Shipped</p>
                <p className="text-3xl font-bold text-[#000000] mb-2">7</p>
                <p className="text-[#667185] text-xs">On the way</p>
              </div>
            </div>
          </Card>

          {/* Delivered Card */}
          <Card className="bg-white border-0 shadow-sm p-5">
            <div className="flex items-start gap-3">
              <div className="bg-[#ffedf6] p-2.5 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-[#f10e7c]" />
              </div>
              <div className="flex-1">
                <p className="text-[#667185] text-sm mb-1">Delivered</p>
                <p className="text-3xl font-bold text-[#000000] mb-2">35</p>
                <p className="text-[#667185] text-xs">Completed orders</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Section Header */}
          <div className="p-5 border-b border-[#e4e7ec] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-[#000000]">Recent Orders</h2>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667185]" />
                <Input
                  placeholder="Search here..."
                  className="pl-9 pr-4 py-2 w-full sm:w-[280px] border-[#e4e7ec] text-sm"
                />
              </div>
              <Button variant="outline" size="sm" className="border-[#e4e7ec] text-[#344054] gap-2 bg-transparent">
                <SlidersHorizontal className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#f0f2f5] hover:bg-[#f0f2f5] border-b border-[#e4e7ec]">
                  <TableHead className="text-[#475367] font-medium text-xs">Order Item ID</TableHead>
                  <TableHead className="text-[#475367] font-medium text-xs">Customer</TableHead>
                  <TableHead className="text-[#475367] font-medium text-xs">Products</TableHead>
                  <TableHead className="text-[#475367] font-medium text-xs">Store</TableHead>
                  <TableHead className="text-[#475367] font-medium text-xs">Order Date</TableHead>
                  <TableHead className="text-[#475367] font-medium text-xs">Amount</TableHead>
                  <TableHead className="text-[#475367] font-medium text-xs">Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={index} className="border-b border-[#e4e7ec]">
                    <TableCell className="text-[#1d2739] text-sm font-medium">{order.id}</TableCell>
                    <TableCell className="text-[#1d2739] text-sm">{order.customer}</TableCell>
                    <TableCell className="text-[#1d2739] text-sm">{order.product}</TableCell>
                    <TableCell className="text-[#1d2739] text-sm">{order.store}</TableCell>
                    <TableCell className="text-[#1d2739] text-sm">{order.date}</TableCell>
                    <TableCell className="text-[#1d2739] text-sm font-medium">{order.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.status === "Shipped"
                            ? "bg-[#e7f6ec] text-[#009a49]"
                            : order.status === "Cancelled"
                              ? "bg-[#ffece5] text-[#ad3307]"
                              : "bg-[#ffe7cc] text-[#f56630]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            order.status === "Shipped"
                              ? "bg-[#009a49]"
                              : order.status === "Cancelled"
                                ? "bg-[#ad3307]"
                                : "bg-[#f56630]"
                          }`}
                        />
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4 text-[#667185]" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Order</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
