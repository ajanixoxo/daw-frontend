"use client"

import { Search, SlidersHorizontal, Package, Clock, Truck, CheckCircle2, MoreVertical, Loader2 } from "lucide-react"
import { StatCard } from "@/components/(dashboards)/sellers-dashboard/stat-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSellerOrders } from "@/hooks/useSellerOrders"
import { IOrder } from "@/types/product.types"

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

// Helper function to get status display
function getStatusDisplay(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': 'Pending',
    'processing': 'Processing',
    'shipped': 'Shipped',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled',
  };
  return statusMap[status] || status;
}

// Helper function to get status color
function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'shipped':
    case 'delivered':
      return {
        bg: 'bg-[#e7f6ec]',
        text: 'text-[#009a49]',
        dot: 'bg-[#009a49]',
      };
    case 'cancelled':
      return {
        bg: 'bg-[#ffece5]',
        text: 'text-[#ad3307]',
        dot: 'bg-[#ad3307]',
      };
    case 'pending':
    case 'processing':
      return {
        bg: 'bg-[#ffe7cc]',
        text: 'text-[#f56630]',
        dot: 'bg-[#f56630]',
      };
    default:
      return {
        bg: 'bg-[#f5f5f5]',
        text: 'text-[#667185]',
        dot: 'bg-[#667185]',
      };
  }
}

// Helper function to get shop name from order
function getShopName(order: IOrder): string {
  if (typeof order.shop_id === 'string') {
    return 'Shop';
  }
  return order.shop_id.name || 'Shop';
}

// Helper function to get buyer ID from order
function getBuyerId(order: IOrder): string {
  if (typeof order.buyer_id === 'string') {
    return order.buyer_id;
  }
  // If buyer_id is an object, try to get _id or id property
  if (order.buyer_id && typeof order.buyer_id === 'object') {
    return (order.buyer_id as any)._id || (order.buyer_id as any).id || '';
  }
  return '';
}

const mockOrders = [
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
  const { data: ordersData, isLoading: ordersLoading } = useSellerOrders();
  const orders = ordersData?.orders || [];

  // Calculate stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const shippedOrders = orders.filter(o => o.status === 'shipped').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#000000] mb-1">Orders</h1>
          <p className="text-[#454953] text-sm">Track and manage customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Package}
            title="Total Orders"
            value={String(totalOrders)}
            subtitle="Orders Placed"
            trend="up"
            iconColor="#E6007A"
          />
          <StatCard
            icon={Clock}
            title="Pending Orders"
            value={String(pendingOrders)}
            subtitle="Needs Processing"
            iconColor="#E6007A"
          />
          <StatCard
            icon={Truck}
            title="Shipped"
            value={String(shippedOrders)}
            subtitle="On The Way"
            iconColor="#E6007A"
          />
          <StatCard
            icon={CheckCircle2}
            title="Delivered"
            value={String(deliveredOrders)}
            subtitle="Completed Orders"
            iconColor="#E6007A"
          />
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
                {ordersLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-[#f10e7c]" />
                        <span className="text-[#667185]">Loading orders...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-[#667185]">
                      <p className="text-lg font-medium mb-2">No orders found</p>
                      <p className="text-sm">Orders will appear here when customers place them</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => {
                    const statusColors = getStatusColor(order.status);
                    const shopName = getShopName(order);
                    const buyerId = getBuyerId(order);
                    return (
                      <TableRow key={order._id} className="border-b border-[#e4e7ec]">
                        <TableCell className="text-[#1d2739] text-sm font-medium">
                          {order._id.slice(-8).toUpperCase()}
                        </TableCell>
                        <TableCell className="text-[#1d2739] text-sm">
                          {buyerId ? buyerId.slice(-8).toUpperCase() : '-'}
                        </TableCell>
                        <TableCell className="text-[#1d2739] text-sm">-</TableCell>
                        <TableCell className="text-[#1d2739] text-sm">{shopName}</TableCell>
                        <TableCell className="text-[#1d2739] text-sm">{formatDate(order.createdAt)}</TableCell>
                        <TableCell className="text-[#1d2739] text-sm font-medium">
                          ₦{order.total_amount.toLocaleString()}
                        </TableCell>
                    <TableCell>
                      <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text}`}
                      >
                            <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`} />
                            {getStatusDisplay(order.status)}
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
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
