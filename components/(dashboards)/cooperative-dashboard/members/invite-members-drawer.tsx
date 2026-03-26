"use client";

import type React from "react";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/custom-drawer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, Download, Upload, UserPlus } from "lucide-react";

interface InviteMembersDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CSVRow {
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
}

const CSV_TEMPLATE = `email,firstName,lastName,phone
adenugaib24+987@gmail.com,John,Doe,08012345678
adenugaib24+0987@gmail.com,Jane,Smith,
adenugaib24+01987@gmail.com,,09087654321`;

export function InviteMembersDrawer({
  open,
  onOpenChange,
}: InviteMembersDrawerProps) {
  const [activeTab, setActiveTab] = useState("single");
  const [defaultRole, setDefaultRole] = useState("seller");
  const [emailAddress, setEmailAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<CSVRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      parseCSV(selectedFile).then((rows) => {
        setParsedRows(rows);
        if (rows.length === 0) {
          toast.error("No valid rows found in CSV. Check the format.");
        } else {
          toast.success(`Found ${rows.length} valid member(s) in CSV`);
        }
      });
    }
  };

  const parseCSV = async (file: File): Promise<CSVRow[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (!text) return resolve([]);

        const lines = text.split(/\r?\n/).filter((line) => line.trim());
        if (lines.length < 2) return resolve([]);

        // Parse header to find column indices
        const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
        const emailIdx = header.indexOf("email");
        const firstNameIdx = header.indexOf("firstname");
        const lastNameIdx = header.indexOf("lastname");
        const phoneIdx = header.indexOf("phone");

        if (emailIdx === -1 || firstNameIdx === -1) {
          toast.error("CSV must have 'email' and 'firstName' columns");
          return resolve([]);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const rows: CSVRow[] = [];

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(",").map((c) => c.trim());
          const email = cols[emailIdx]?.toLowerCase();
          const fName = cols[firstNameIdx];

          if (!email || !emailRegex.test(email) || !fName) continue;

          rows.push({
            email,
            firstName: fName,
            lastName: lastNameIdx !== -1 ? cols[lastNameIdx] || undefined : undefined,
            phone: phoneIdx !== -1 ? cols[phoneIdx] || undefined : undefined,
          });
        }

        resolve(rows);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleDownloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invite-members-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setEmailAddress("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setFile(null);
    setParsedRows([]);
  };

  const handleSendInvitation = async () => {
    try {
      setIsLoading(true);

      const { inviteMember } = await import("@/app/actions/invitations");
      let successCount = 0;
      let failCount = 0;
      const errors: string[] = [];

      if (activeTab === "single") {
        // Single invite
        if (!emailAddress) {
          toast.error("Please enter an email address");
          setIsLoading(false);
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
          toast.error("Please enter a valid email address");
          setIsLoading(false);
          return;
        }
        if (!firstName.trim()) {
          toast.error("Please enter a first name");
          setIsLoading(false);
          return;
        }

        const result = await inviteMember({
          email: emailAddress,
          role: defaultRole as "seller" | "admin",
          firstName: firstName.trim(),
          lastName: lastName.trim() || undefined,
          phone: phone.trim() || undefined,
        });

        if (result.success) {
          toast.success(`Invitation sent to ${emailAddress}`);
          resetForm();
          onOpenChange(false);
        } else {
          toast.error(result.error || "Failed to send invitation");
        }
      } else {
        // Bulk CSV invite
        if (parsedRows.length === 0) {
          toast.error("Please upload a valid CSV file");
          setIsLoading(false);
          return;
        }

        for (const row of parsedRows) {
          const result = await inviteMember({
            email: row.email,
            role: defaultRole as "seller" | "admin",
            firstName: row.firstName,
            lastName: row.lastName,
            phone: row.phone,
          });

          if (result.success) {
            successCount++;
          } else {
            errors.push(`${row.email}: ${result.error}`);
            failCount++;
          }
        }

        if (successCount > 0) {
          toast.success(`Successfully sent ${successCount} invitation(s)`);
          if (failCount > 0) {
            toast.warning(
              `Failed to send ${failCount} invitation(s). First error: ${errors[0]}`
            );
          }
          resetForm();
          onOpenChange(false);
        } else {
          toast.error(
            `Failed to send invitations. First error: ${errors[0]}`
          );
        }
      }
    } catch (error) {
      console.error("Invitation error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent side="right" className="w-full sm:max-w-[540px]">
        {/* Header - Fixed at top */}
        <DrawerHeader className="px-8 pt-8 pb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#f5f5f5] transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-[#1d1d2a]" />
            </button>
            <div>
              <DrawerTitle className="text-xl font-bold text-[#1d1d2a]">
                Invite Members
              </DrawerTitle>
              <DrawerDescription className="text-sm text-[#838794]">
                Send invitations to join your cooperative
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-6">
            {/* Default Role */}
            <div className="space-y-2">
              <Label
                htmlFor="default-role"
                className="text-sm font-medium text-[#1d1d2a]"
              >
                Default Role
              </Label>
              <Select value={defaultRole} onValueChange={setDefaultRole}>
                <SelectTrigger
                  id="default-role"
                  className="h-12 w-full border-[#e4e7ec] bg-white text-[#1d1d2a] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
                >
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seller">Seller</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tabs: Single Invite / Bulk Upload */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full bg-[#f5f5f5] p-1">
                <TabsTrigger
                  value="single"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:text-[#1d1d2a] data-[state=active]:shadow-sm"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Single Invite
                </TabsTrigger>
                <TabsTrigger
                  value="bulk"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:text-[#1d1d2a] data-[state=active]:shadow-sm"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Bulk Upload
                </TabsTrigger>
              </TabsList>

              {/* Single Invite Tab */}
              <TabsContent value="single" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email-address"
                    className="text-sm font-medium text-[#1d1d2a]"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email-address"
                    type="email"
                    placeholder="member@example.com"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="h-12 border-[#e4e7ec] bg-white text-[#1d1d2a] placeholder:text-[#9c9faa] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label
                      htmlFor="first-name"
                      className="text-sm font-medium text-[#1d1d2a]"
                    >
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="first-name"
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-12 border-[#e4e7ec] bg-white text-[#1d1d2a] placeholder:text-[#9c9faa] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="last-name"
                      className="text-sm font-medium text-[#1d1d2a]"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="last-name"
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-12 border-[#e4e7ec] bg-white text-[#1d1d2a] placeholder:text-[#9c9faa] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-[#1d1d2a]"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08012345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12 border-[#e4e7ec] bg-white text-[#1d1d2a] placeholder:text-[#9c9faa] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
                  />
                </div>
              </TabsContent>

              {/* Bulk Upload Tab */}
              <TabsContent value="bulk" className="mt-4 space-y-4">
                {/* Download Template */}
                <div className="rounded-lg border border-[#e4e7ec] bg-[#f9fafb] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-[#1d1d2a]">
                        CSV Template
                      </p>
                      <p className="mt-1 text-xs text-[#838794]">
                        Download the template, fill in member details, then upload it below.
                        Required columns: <span className="font-medium text-[#1d1d2a]">email</span>,{" "}
                        <span className="font-medium text-[#1d1d2a]">firstName</span>.
                        Optional: <span className="text-[#667185]">lastName</span>,{" "}
                        <span className="text-[#667185]">phone</span>.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadTemplate}
                      className="shrink-0 border-[#e4e7ec] bg-white text-[#1d1d2a] hover:bg-[#f5f5f5]"
                    >
                      <Download className="mr-1.5 h-3.5 w-3.5" />
                      Template
                    </Button>
                  </div>

                  {/* Preview of template format */}
                  <div className="mt-3 overflow-x-auto rounded border border-[#e4e7ec] bg-white">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-[#e4e7ec] bg-[#f9f9f9]">
                          <th className="px-3 py-1.5 text-left font-medium text-[#1d1d2a]">email</th>
                          <th className="px-3 py-1.5 text-left font-medium text-[#1d1d2a]">firstName</th>
                          <th className="px-3 py-1.5 text-left font-medium text-[#667185]">lastName</th>
                          <th className="px-3 py-1.5 text-left font-medium text-[#667185]">phone</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#838794]">
                        <tr className="border-b border-[#f0f2f5]">
                          <td className="px-3 py-1.5">john.doe@example.com</td>
                          <td className="px-3 py-1.5">John</td>
                          <td className="px-3 py-1.5">Doe</td>
                          <td className="px-3 py-1.5">08012345678</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-1.5">jane.smith@example.com</td>
                          <td className="px-3 py-1.5">Jane</td>
                          <td className="px-3 py-1.5">Smith</td>
                          <td className="px-3 py-1.5"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* File Upload Area */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#1d1d2a]">
                    Upload CSV
                  </Label>
                  <div
                    className={`relative flex min-h-[120px] flex-col items-center justify-center rounded-lg border-2 border-dashed ${
                      file
                        ? "border-[#f10e7c] bg-[#fdf2f8]"
                        : "border-[#e4e7ec] bg-[#f9f9f9]"
                    } px-6 py-6 text-center transition-colors hover:border-[#f10e7c]`}
                  >
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="absolute inset-0 cursor-pointer opacity-0"
                      id="csv-upload"
                    />
                    <Upload
                      className={`mb-2 h-6 w-6 ${
                        file ? "text-[#f10e7c]" : "text-[#838794]"
                      }`}
                    />
                    <p className="text-sm text-[#838794]">
                      Drag & drop your CSV file or{" "}
                      <label
                        htmlFor="csv-upload"
                        className="cursor-pointer font-medium text-[#1d1d2a] hover:underline"
                      >
                        Browse
                      </label>
                    </p>
                    {file && (
                      <div className="mt-2 flex items-center gap-2">
                        <p className="text-xs font-medium text-[#f10e7c]">
                          {file.name} — {parsedRows.length} member(s) found
                        </p>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setFile(null);
                            setParsedRows([]);
                          }}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Parsed rows preview */}
                {parsedRows.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-[#1d1d2a]">
                      Preview ({parsedRows.length} member{parsedRows.length !== 1 ? "s" : ""})
                    </Label>
                    <div className="max-h-[200px] overflow-y-auto rounded-lg border border-[#e4e7ec]">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="sticky top-0 border-b border-[#e4e7ec] bg-[#f9f9f9]">
                            <th className="px-3 py-2 text-left font-medium text-[#1d1d2a]">Email</th>
                            <th className="px-3 py-2 text-left font-medium text-[#1d1d2a]">Name</th>
                            <th className="px-3 py-2 text-left font-medium text-[#1d1d2a]">Phone</th>
                          </tr>
                        </thead>
                        <tbody>
                          {parsedRows.map((row, i) => (
                            <tr
                              key={i}
                              className="border-b border-[#f0f2f5] last:border-0"
                            >
                              <td className="px-3 py-2 text-[#1d1d2a]">{row.email}</td>
                              <td className="px-3 py-2 text-[#667185]">
                                {row.firstName}{row.lastName ? ` ${row.lastName}` : ""}
                              </td>
                              <td className="px-3 py-2 text-[#667185]">{row.phone || "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <DrawerFooter className="px-8 py-6 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
              className="h-12 flex-1 border-[#e4e7ec] bg-white text-[#1d1d2a] hover:bg-[#f5f5f5]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendInvitation}
              disabled={isLoading}
              className="h-12 flex-1 bg-[#f10e7c] text-white hover:bg-[#d90d6a]"
            >
              {isLoading
                ? "Sending..."
                : activeTab === "single"
                ? "Send Invitation"
                : `Send ${parsedRows.length || ""} Invitation${parsedRows.length !== 1 ? "s" : ""}`}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
