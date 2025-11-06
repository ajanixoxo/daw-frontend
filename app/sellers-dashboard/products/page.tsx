"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Search, SlidersHorizontal, Pencil, Trash2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Product data
const products = [
  {
    id: 1,
    name: "Turtleneck",
    category: "Shirt",
    store: "Faye's Complex",
    price: "$17.84",
    stock: 20,
    status: "Shipped",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-6v6SDxnVhv0SFOOWUOJfwR0Wgne5Aj.png",
  },
  {
    id: 2,
    name: "Turtleneck",
    category: "Shirt",
    store: "Faye's Complex",
    price: "$17.84",
    stock: 20,
    status: "Cancelled",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-6v6SDxnVhv0SFOOWUOJfwR0Wgne5Aj.png",
  },
  {
    id: 3,
    name: "Turtleneck",
    category: "Shirt",
    store: "Faye's Complex",
    price: "$17.84",
    stock: 20,
    status: "Pending",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-6v6SDxnVhv0SFOOWUOJfwR0Wgne5Aj.png",
  },
  {
    id: 4,
    name: "Turtleneck",
    category: "Shirt",
    store: "Faye's Complex",
    price: "$17.84",
    stock: 20,
    status: "Shipped",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-6v6SDxnVhv0SFOOWUOJfwR0Wgne5Aj.png",
  },
  {
    id: 5,
    name: "Turtleneck",
    category: "Shirt",
    store: "Faye's Complex",
    price: "$17.84",
    stock: 20,
    status: "Pending",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-6v6SDxnVhv0SFOOWUOJfwR0Wgne5Aj.png",
  },
  {
    id: 6,
    name: "Turtleneck",
    category: "Shirt",
    store: "Faye's Complex",
    price: "$17.84",
    stock: 20,
    status: "Shipped",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-6v6SDxnVhv0SFOOWUOJfwR0Wgne5Aj.png",
  },
  {
    id: 7,
    name: "Turtleneck",
    category: "Shirt",
    store: "Faye's Complex",
    price: "$17.84",
    stock: 20,
    status: "Pending",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-6v6SDxnVhv0SFOOWUOJfwR0Wgne5Aj.png",
  },
  {
    id: 8,
    name: "Turtleneck",
    category: "Shirt",
    store: "Faye's Complex",
    price: "$17.84",
    stock: 20,
    status: "Cancelled",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-6v6SDxnVhv0SFOOWUOJfwR0Wgne5Aj.png",
  },
  {
    id: 9,
    name: "Turtleneck",
    category: "Shirt",
    store: "Faye's Complex",
    price: "$17.84",
    stock: 20,
    status: "Shipped",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-6v6SDxnVhv0SFOOWUOJfwR0Wgne5Aj.png",
  },
  {
    id: 10,
    name: "Turtleneck",
    category: "Shirt",
    store: "Faye's Complex",
    price: "$17.84",
    stock: 20,
    status: "Pending",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-6v6SDxnVhv0SFOOWUOJfwR0Wgne5Aj.png",
  },
]

// Color options for category
const categoryColors = [
  { name: "Pink", value: "#f10e7c" },
  { name: "Black", value: "#000000" },
  { name: "Dark Green", value: "#035638" },
  { name: "Yellow", value: "#fccd35" },
  { name: "Blue", value: "#375dfb" },
  { name: "Teal", value: "#2ba570" },
  { name: "Light Pink", value: "#fccfe5" },
  { name: "Orange", value: "#f1a20e" },
  { name: "Cyan", value: "#0ea5f1" },
  { name: "Gray", value: "#e9e9e9" },
  { name: "Light Green", value: "#0ef187" },
  { name: "Red", value: "#f10e12" },
]

function AddCategoryModal() {
  const [selectedColor, setSelectedColor] = useState("#f10e7c")
  const [categoryName, setCategoryName] = useState("")
  const [description, setDescription] = useState("")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-[#e7e8e9] text-[#292d32] hover:bg-[#f9f9f9] bg-transparent">
          <Plus className="size-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#292d32]">Add New Category</DialogTitle>
          <p className="text-sm text-[#667185] mt-1">
            Create a new product category to organize your inventory better.
          </p>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="category-name" className="text-sm font-medium text-[#292d32]">
              Category Name
            </Label>
            <Input
              id="category-name"
              placeholder="e.g., Electronics, Clothing, Books"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="border-[#e7e8e9]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-[#292d32]">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Brief description of this category..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-[#e7e8e9] min-h-[120px] resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#292d32]">Category Color</Label>
            <div className="grid grid-cols-6 gap-3">
              {categoryColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`size-10 rounded-full transition-all ${
                    selectedColor === color.value ? "ring-2 ring-offset-2 ring-[#f10e7c]" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>
          <Button className="w-full bg-[#f10e7c] hover:bg-[#d00c6a] text-white h-12 text-base font-medium">
            Create Category
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AddProductDrawer() {
  const [productStatus, setProductStatus] = useState("Active")
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [store, setStore] = useState("")
  const [productFeatures, setProductFeatures] = useState("")
  const [careInstruction, setCareInstruction] = useState("")
  const [returnPolicy, setReturnPolicy] = useState("")

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2 bg-[#292d32] hover:bg-[#1d2739] text-white">
          <Plus className="size-4" />
          Add Product
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-[580px] overflow-y-auto p-0">
        {/* Header with back arrow and status */}
        <div className="sticky top-0 bg-white border-b border-[#e7e8e9] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 -ml-2"
              onClick={(e) => {
                const closeButton = document.querySelector("[data-sheet-close]") as HTMLButtonElement
                closeButton?.click()
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#292d32]"
              >
                <path
                  d="M12.5 5L7.5 10L12.5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <div>
              <h2 className="text-xl font-bold text-[#292d32]">Add Products</h2>
              <p className="text-sm text-[#667185] mt-0.5">Follow the steps to create a new Product</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs text-[#667185]">Status</span>
            <Select value={productStatus} onValueChange={setProductStatus}>
              <SelectTrigger className="w-[120px] h-9 border-[#e7e8e9]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Image Upload Area */}
          <div className="border-2 border-dashed border-[#e7e8e9] rounded-lg bg-[#f9f9f9] p-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="size-12 rounded-full bg-white flex items-center justify-center border border-[#e7e8e9]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#667185]"
                >
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-[#667185]">
                  Drag & drop your image or{" "}
                  <button type="button" className="text-[#292d32] font-medium underline">
                    Browse
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Title and Category Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-[#292d32]">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-[#e7e8e9] h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-search" className="text-sm font-medium text-[#292d32]">
                Category
              </Label>
              <Input
                id="category-search"
                placeholder="Search"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border-[#e7e8e9] h-11"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-[#292d32]">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Write here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-[#e7e8e9] min-h-[120px] resize-none"
            />
          </div>

          {/* Price and Store Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium text-[#292d32]">
                Price
              </Label>
              <Input
                id="price"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border-[#e7e8e9] h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store" className="text-sm font-medium text-[#292d32]">
                Store
              </Label>
              <Select value={store} onValueChange={setStore}>
                <SelectTrigger className="border-[#e7e8e9] h-11">
                  <SelectValue placeholder="Select Store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fayes-complex">Faye's Complex</SelectItem>
                  <SelectItem value="store-2">Store 2</SelectItem>
                  <SelectItem value="store-3">Store 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Variants Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#292d32]">Variants</Label>
            <div className="flex items-center justify-between p-4 border border-[#e7e8e9] rounded-lg bg-white">
              <div className="flex items-center gap-2">
                <Plus className="size-5 text-[#292d32]" />
                <span className="text-sm text-[#292d32]">Add variants like color or size</span>
              </div>
              <span className="px-3 py-1 bg-[#f9f9f9] text-[#292d32] text-sm rounded-md border border-[#e7e8e9]">
                Small
              </span>
            </div>
          </div>

          {/* Product Features */}
          <div className="space-y-2">
            <Label htmlFor="product-features" className="text-sm font-medium text-[#292d32]">
              Product Features
            </Label>
            <Textarea
              id="product-features"
              placeholder="Write here..."
              value={productFeatures}
              onChange={(e) => setProductFeatures(e.target.value)}
              className="border-[#e7e8e9] min-h-[100px] resize-none"
            />
          </div>

          {/* Care Instruction */}
          <div className="space-y-2">
            <Label htmlFor="care-instruction" className="text-sm font-medium text-[#292d32]">
              Care Instruction
            </Label>
            <Textarea
              id="care-instruction"
              placeholder="Write here..."
              value={careInstruction}
              onChange={(e) => setCareInstruction(e.target.value)}
              className="border-[#e7e8e9] min-h-[100px] resize-none"
            />
          </div>

          {/* Return Policy */}
          <div className="space-y-2">
            <Label htmlFor="return-policy" className="text-sm font-medium text-[#292d32]">
              Return Policy
            </Label>
            <Textarea
              id="return-policy"
              placeholder="Write here..."
              value={returnPolicy}
              onChange={(e) => setReturnPolicy(e.target.value)}
              className="border-[#e7e8e9] min-h-[100px] resize-none"
            />
          </div>

          {/* Save Button */}
          <Button className="w-full bg-[#f10e7c] hover:bg-[#d00c6a] text-white h-12 text-base font-medium">Save</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function StatCard({
  icon,
  label,
  value,
  change,
  changeLabel,
}: { icon: React.ReactNode; label: string; value: string; change?: string; changeLabel?: string }) {
  return (
    <div className="bg-white rounded-lg border border-[#e7e8e9] p-4 lg:p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="size-8 rounded-lg bg-[#ffe7cc] flex items-center justify-center">{icon}</div>
        <span className="text-sm text-[#667185]">{label}</span>
      </div>
      <div className="text-2xl lg:text-3xl font-bold text-[#292d32] mb-2">{value}</div>
      {change && changeLabel && (
        <div className="flex items-center gap-1 text-sm">
          <span className={change.startsWith("+") ? "text-[#009a49]" : "text-[#667185]"}>
            {change.startsWith("+") && "↑"} {change} {changeLabel}
          </span>
        </div>
      )}
      {changeLabel && !change && <div className="text-sm text-[#667185]">{changeLabel}</div>}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <main className="p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
            <div>
              <h1 className="text-2xl lg:text-[32px] font-bold text-[#1d1d2a] leading-tight">Product Management</h1>
              <p className="text-sm text-[#667185] mt-1">Get an Overview of your store activity here</p>
            </div>
            <div className="flex items-center gap-3">
              <AddCategoryModal />
              <AddProductDrawer />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <StatCard
              icon={<div className="size-4 bg-[#f10e7c] rounded" />}
              label="Total Products"
              value="₦100"
              change="+10%"
              changeLabel="More than Previous"
            />
            <StatCard
              icon={<div className="size-4 bg-[#f10e7c] rounded" />}
              label="Active Products"
              value="12"
              change="+10%"
              changeLabel="Cards Issued"
            />
            <StatCard
              icon={<div className="size-4 bg-[#f10e7c] rounded" />}
              label="Low Stock"
              value="65"
              changeLabel="Requires Attention"
            />
            <StatCard
              icon={<div className="size-4 bg-[#f10e7c] rounded" />}
              label="Out of Stock"
              value="65"
              changeLabel="Requires Attention"
            />
          </div>

          {/* Product Inventory */}
          <div className="bg-white rounded-lg border border-[#e7e8e9]">
            <div className="p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-lg font-semibold text-[#292d32]">Product Inventory</h2>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 sm:flex-initial sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#667185]" />
                    <Input placeholder="Search here..." className="pl-9 border-[#e7e8e9]" />
                  </div>
                  <Button variant="outline" size="icon" className="border-[#e7e8e9] flex-shrink-0 bg-transparent">
                    <SlidersHorizontal className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Table - Desktop */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e7e8e9]">
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#667185]">Item Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#667185]">Category</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#667185]">Store</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#667185]">Price</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#667185]">Stock</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#667185]">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-[#667185]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-[#e7e8e9] hover:bg-[#f9f9f9]">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="size-10 rounded-lg object-cover"
                            />
                            <span className="text-sm font-medium text-[#292d32]">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-[#667185]">{product.category}</td>
                        <td className="py-3 px-4 text-sm text-[#667185]">{product.store}</td>
                        <td className="py-3 px-4 text-sm text-[#292d32]">{product.price}</td>
                        <td className="py-3 px-4 text-sm text-[#667185]">{product.stock}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              product.status === "Shipped"
                                ? "bg-[#e5f8ed] text-[#009a49]"
                                : product.status === "Cancelled"
                                  ? "bg-[#ffe7cc] text-[#ad3307]"
                                  : "bg-[#fff8e5] text-[#f1a20e]"
                            }`}
                          >
                            <span
                              className={`size-1.5 rounded-full ${
                                product.status === "Shipped"
                                  ? "bg-[#009a49]"
                                  : product.status === "Cancelled"
                                    ? "bg-[#ad3307]"
                                    : "bg-[#f1a20e]"
                              }`}
                            />
                            {product.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="size-8 text-[#667185] hover:text-[#292d32]">
                              <Pencil className="size-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="size-8 text-[#667185] hover:text-[#ad3307]">
                              <Trash2 className="size-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="size-8 text-[#667185] hover:text-[#f10e7c]">
                              <Heart className="size-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="size-8 text-[#667185] hover:text-[#f10e7c]">
                              <Heart className="size-4 fill-current" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cards - Mobile/Tablet */}
              <div className="lg:hidden space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="border border-[#e7e8e9] rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="size-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[#292d32] mb-1">{product.name}</h3>
                        <p className="text-sm text-[#667185]">{product.category}</p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          product.status === "Shipped"
                            ? "bg-[#e5f8ed] text-[#009a49]"
                            : product.status === "Cancelled"
                              ? "bg-[#ffe7cc] text-[#ad3307]"
                              : "bg-[#fff8e5] text-[#f1a20e]"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            product.status === "Shipped"
                              ? "bg-[#009a49]"
                              : product.status === "Cancelled"
                                ? "bg-[#ad3307]"
                                : "bg-[#f1a20e]"
                          }`}
                        />
                        {product.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                      <div>
                        <span className="text-[#667185]">Store:</span>
                        <span className="ml-1 text-[#292d32]">{product.store}</span>
                      </div>
                      <div>
                        <span className="text-[#667185]">Price:</span>
                        <span className="ml-1 text-[#292d32] font-medium">{product.price}</span>
                      </div>
                      <div>
                        <span className="text-[#667185]">Stock:</span>
                        <span className="ml-1 text-[#292d32]">{product.stock}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t border-[#e7e8e9]">
                      <Button variant="ghost" size="sm" className="flex-1 text-[#667185] hover:text-[#292d32]">
                        <Pencil className="size-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 text-[#667185] hover:text-[#ad3307]">
                        <Trash2 className="size-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
  )
}
