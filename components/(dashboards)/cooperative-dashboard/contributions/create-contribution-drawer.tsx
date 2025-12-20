"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ArrowLeft } from "lucide-react"

interface CreateContributionDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateContributionDrawer({ open, onOpenChange }: CreateContributionDrawerProps) {
  const [contributionName, setContributionName] = useState("")
  const [type, setType] = useState("")
  const [frequency, setFrequency] = useState("")
  const [amount, setAmount] = useState("")
  const [loanEligibility, setLoanEligibility] = useState("")

  const handleCancel = () => {
    // Reset form
    setContributionName("")
    setType("")
    setFrequency("")
    setAmount("")
    setLoanEligibility("")
    onOpenChange(false)
  }

  const handleCreateContribution = () => {
    console.log("[v0] Creating contribution...")
    // Handle create contribution logic
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full p-8 overflow-y-auto sm:max-w-[540px]">
        <SheetHeader className="text-left">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-[#f5f5f5]"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <SheetTitle className="text-xl font-bold text-[#1d1d2a]">Create Contribution Type</SheetTitle>
              <SheetDescription className="text-sm text-[#838794]">
                Set up a new contribution type for members
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {/* Contribution Name */}
          <div className="space-y-2">
            <Label htmlFor="contribution-name" className="text-sm font-medium text-[#1d1d2a]">
              Contribution Name
            </Label>
            <Input
              id="contribution-name"
              type="text"
              placeholder="e.g Monthly Savings"
              value={contributionName}
              onChange={(e) => setContributionName(e.target.value)}
              className="h-12 border-[#e4e7ec] bg-white text-[#1d1d2a] placeholder:text-[#9c9faa] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium text-[#1d1d2a]">
              Type
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger
                id="type"
                className="h-12 border-[#e4e7ec] bg-white text-[#1d1d2a] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
              >
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly-savings">Monthly Savings</SelectItem>
                <SelectItem value="target-savings">Target Savings</SelectItem>
                <SelectItem value="investment-pool">Investment Pool</SelectItem>
                <SelectItem value="emergency-fund">Emergency Fund</SelectItem>
                <SelectItem value="loan-repayment">Loan Repayment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Frequency */}
          <div className="space-y-2">
            <Label htmlFor="frequency" className="text-sm font-medium text-[#1d1d2a]">
              Frequency (for recurring)
            </Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger
                id="frequency"
                className="h-12 border-[#e4e7ec] bg-white text-[#1d1d2a] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
              >
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount / Target */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-[#1d1d2a]">
              Amount / Target
            </Label>
            <Input
              id="amount"
              type="text"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 border-[#e4e7ec] bg-white text-[#1d1d2a] placeholder:text-[#9c9faa] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
            />
          </div>

          {/* Loan Eligibility Requirements */}
          <div className="space-y-2">
            <Label htmlFor="loan-eligibility" className="text-sm font-medium text-[#1d1d2a]">
              Loan Eligibility Requirements
            </Label>
            <Input
              id="loan-eligibility"
              type="text"
              placeholder="e.g 3 months of contributions"
              value={loanEligibility}
              onChange={(e) => setLoanEligibility(e.target.value)}
              className="h-12 border-[#e4e7ec] bg-white text-[#1d1d2a] placeholder:text-[#9c9faa] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="h-12 flex-1 border-[#e4e7ec] bg-[#e8e8e8] text-[#1d1d2a] hover:bg-[#d8d8d8]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateContribution}
              className="h-12 flex-1 bg-[#f10e7c] text-white hover:bg-[#d90d6a]"
            >
              Create Contribution
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
