"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ArrowLeft, Upload, UserPlus } from "lucide-react"

interface InviteMembersDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InviteMembersDrawer({ open, onOpenChange }: InviteMembersDrawerProps) {
  const [defaultRole, setDefaultRole] = useState("seller")
  const [customMessage, setCustomMessage] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSaveDraft = () => {
    console.log("[v0] Saving draft...")
    // Handle save draft logic
  }

  const handleSendInvitation = () => {
    console.log("[v0] Sending invitation...")
    // Handle send invitation logic
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
              <SheetTitle className="text-xl font-bold text-[#1d1d2a]">Invite Members</SheetTitle>
              <SheetDescription className="text-sm text-[#838794]">
                Send invitations to join your cooperative
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {/* Default Role */}
          <div className="space-y-2">
            <Label htmlFor="default-role" className="text-sm font-medium text-[#1d1d2a]">
              Default Role
            </Label>
            <Select value={defaultRole} onValueChange={setDefaultRole}>
              <SelectTrigger
                id="default-role"
                className="h-12 border-[#e4e7ec] bg-white text-[#1d1d2a] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
              >
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seller">Seller</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Custom Message */}
          <div className="space-y-2">
            <Label htmlFor="custom-message" className="text-sm font-medium text-[#1d1d2a]">
              Custom Message (Optional)
            </Label>
            <Textarea
              id="custom-message"
              placeholder="Add a personal message to your invitation..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="min-h-[140px] resize-none border-[#e4e7ec] bg-white text-[#1d1d2a] placeholder:text-[#9c9faa] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
            />
          </div>

          {/* Add Recipients */}
          <div className="space-y-2">
            <Label htmlFor="email-address" className="text-sm font-medium text-[#1d1d2a]">
              Add Recipients
            </Label>
            <div className="flex gap-2">
              <Input
                id="email-address"
                type="email"
                placeholder="Email Address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="h-12 flex-1 border-[#e4e7ec] bg-white text-[#1d1d2a] placeholder:text-[#9c9faa] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
              />
              <Button
                size="icon"
                variant="outline"
                className="h-12 w-12 shrink-0 border-[#e4e7ec] bg-white hover:bg-[#f5f5f5]"
              >
                <UserPlus className="h-5 w-5 text-[#1d1d2a]" />
              </Button>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <div className="relative flex min-h-[140px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#e4e7ec] bg-[#f9f9f9] px-6 py-8 text-center transition-colors hover:border-[#f10e7c]">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="absolute inset-0 cursor-pointer opacity-0"
                id="csv-upload"
              />
              <Upload className="mb-3 h-6 w-6 text-[#838794]" />
              <p className="text-sm text-[#838794]">
                Upload a CSV file with email addresses or{" "}
                <label htmlFor="csv-upload" className="cursor-pointer font-medium text-[#1d1d2a] hover:underline">
                  Browse
                </label>
              </p>
              {file && <p className="mt-2 text-xs text-[#f10e7c]">Selected: {file.name}</p>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              className="h-12 flex-1 border-[#e4e7ec] bg-white text-[#1d1d2a] hover:bg-[#f5f5f5]"
            >
              Save as Draft
            </Button>
            <Button onClick={handleSendInvitation} className="h-12 flex-1 bg-[#f10e7c] text-white hover:bg-[#d90d6a]">
              Send Invitation
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
