"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export default function MembersSettings() {
  const [autoApprove, setAutoApprove] = useState(true)
  const [memberDirectory, setMemberDirectory] = useState(false)
  const [inviteRestrictions, setInviteRestrictions] = useState(true)
  const [maxMembers, setMaxMembers] = useState("100")
  const [productsPerMember, setProductsPerMember] = useState("50")

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Member Management</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Auto-approve Members</h3>
              <p className="text-sm text-gray-600">Automatically approve new member applications</p>
            </div>
            <Switch checked={autoApprove} onCheckedChange={setAutoApprove} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Member Directory</h3>
              <p className="text-sm text-gray-600">Allow members to see other member profiles</p>
            </div>
            <Switch checked={memberDirectory} onCheckedChange={setMemberDirectory} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Invite Restrictions</h3>
              <p className="text-sm text-gray-600">Only admins can invite new members</p>
            </div>
            <Switch checked={inviteRestrictions} onCheckedChange={setInviteRestrictions} />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Member Management</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">Maximum Members</label>
            <Input
              type="number"
              value={maxMembers}
              onChange={(e) => setMaxMembers(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">Products per Member</label>
            <Input
              type="number"
              value={productsPerMember}
              onChange={(e) => setProductsPerMember(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#f10e7c] px-6 hover:bg-[#d00c6a]">Save Settings</Button>
      </div>
    </div>
  )
}
