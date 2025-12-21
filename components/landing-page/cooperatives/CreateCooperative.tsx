"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Building, Users, Phone, Mail, FileText, Image } from "lucide-react";
import { useCreateCooperative } from "@/hooks/useCreateCooperative";
import PromoSection from "@/components/landing-page/cooperatives/CreateCooperativePromo";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/landing-page/cooperatives/Footer";
import { useProfile } from "@/hooks/useProfile";
import { useCooperative } from "@/hooks/useJoinCooperative";

const cooperativeCategories = [
  "Agriculture & Farming",
  "Finance & Credit Union",
  "Housing Cooperative",
  "Consumer Cooperative",
  "Worker-owned Cooperative",
  "Producer/Marketing",
  "Utility Cooperative",
  "Insurance Cooperative",
  "Fishery Cooperative",
  "Healthcare Cooperative",
  "Transportation Cooperative",
  "Educational Cooperative",
  "Energy Cooperative",
  "Artisan Cooperative",
  "Retail Cooperative",
  "Other",
];

type FormValues = {
  name: string;
  description: string;
  category: string;
  phone: string;
  email: string;
  bylaws?: string;
  logo?: File;
  banner?: File;
};

export default function CreateCooperativeForm() {
  const { createCoop, loading, error, success } = useCreateCooperative();
  const [filePreview, setFilePreview] = useState({
    logo: null as string | null,
    banner: null as string | null,
  });
  const { data: user, isLoading } = useProfile();

  
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      phone: "",
      email: "",
      bylaws: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("formValue", data);
    const res = await createCoop({
      ...data,
      phone: data.phone,
      countryCode: "",
    });
    if (success) {
      alert("Cooperative created successfully");
      router.push("/cooperatives/create/create-tier");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files?.length) return;
    const file = files[0];
    setValue(name as "logo" | "banner", file);
    const previewUrl = URL.createObjectURL(file);
    setFilePreview((prev) => ({ ...prev, [name]: previewUrl }));
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="min-h-screen bg-gradient-to-br mt-24 from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Form */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create New Cooperative
              </h1>
              <p className="text-gray-600 mb-4">
                Start your cooperative journey and empower your community
              </p>

              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Cooperative Name */}
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Building className="h-4 w-4" /> Cooperative Name
                      </Label>
                      <Input
                        {...register("name", {
                          required: "Cooperative name is required",
                        })}
                        placeholder="Enter cooperative name"
                        className="h-12 rounded-lg border-gray-300 bg-gray-100"
                        disabled={loading}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Description & Purpose
                      </Label>
                      <Textarea
                        {...register("description", {
                          required: "Description is required",
                        })}
                        placeholder="Describe the mission, goals, and purpose of your cooperative..."
                        className="min-h-[60px] rounded-lg border-gray-300 bg-gray-100"
                        disabled={loading}
                      />
                      {errors.description && (
                        <p className="text-xs text-red-600">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Users className="h-4 w-4" /> Cooperative Category
                      </Label>
                      <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={loading}
                          >
                            <SelectTrigger className="h-12 rounded-lg border-gray-300 bg-gray-100">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {cooperativeCategories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.category && (
                        <p className="text-xs text-red-600">
                          {errors.category.message}
                        </p>
                      )}
                    </div>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <Controller
                          name="phone"
                          control={control}
                          rules={{ required: "Phone number is required" }}
                          render={({ field }) => (
                            <PhoneInput
                              {...field}
                              enableSearch
                              containerClass="w-full"
                              inputClass="w-full h-12 !pl-14 rounded-lg border border-gray-300 text-sm bg-gray-100"
                              buttonClass="!border-r !px-3"
                              onChange={field.onChange}
                              disabled={loading}
                            />
                          )}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-600">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Mail className="h-4 w-4" /> Email Address
                        </Label>
                        <Input
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email format",
                            },
                          })}
                          placeholder="cooperative@example.com"
                          className="h-12 rounded-lg border-gray-300 bg-gray-100"
                          disabled={loading}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-600">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Branding */}
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Image className="h-5 w-5" /> Cooperative Branding
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <Label className="text-sm font-medium text-gray-700">
                            Logo (optional)
                          </Label>
                          <Input
                            type="file"
                            accept="image/*"
                            {...register("logo")}
                            onChange={handleFileChange}
                            className="h-12 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700"
                            disabled={loading}
                          />
                          {filePreview.logo && (
                            <img
                              src={filePreview.logo}
                              alt="Logo preview"
                              className="w-20 h-20 object-cover rounded-lg border border-gray-300 mt-2"
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label className="text-sm font-medium text-gray-700">
                            Banner (optional)
                          </Label>
                          <Input
                            type="file"
                            accept="image/*"
                            {...register("banner")}
                            onChange={handleFileChange}
                            className="h-12 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700"
                            disabled={loading}
                          />
                          {filePreview.banner && (
                            <img
                              src={filePreview.banner}
                              alt="Banner preview"
                              className="w-full h-20 object-cover rounded-lg border border-gray-300 mt-2"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bylaws */}
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FileText className="h-4 w-4" /> Cooperative Bylaws
                      </Label>
                      <Textarea
                        {...register("bylaws")}
                        placeholder="Enter your cooperative's bylaws..."
                        className="min-h-[80px] rounded-lg border-gray-300 bg-gray-100"
                        disabled={loading}
                      />
                      <p className="text-xs text-gray-500">
                        Outline the rules, membership criteria, voting rights,
                        and operational guidelines.
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 h-12 rounded-lg bg-red-200 border-gray-300"
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-black border font-semibold"
                        disabled={loading}
                      >
                        {loading ? "Creating..." : "Create Cooperative"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <PromoSection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
