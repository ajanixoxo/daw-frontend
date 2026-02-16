import { Upload, Camera } from "lucide-react";
import Image from "next/image";
import { useState, useRef, ChangeEvent } from "react";

interface ProfilePhotoSectionProps {
  initialImage?: string;
}

export function ProfilePhotoSection({ initialImage }: ProfilePhotoSectionProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
      <h2 className="text-[18px] font-bold text-[#101828] mb-8">
        Profile Photo
      </h2>

      <div className="flex flex-col items-center space-y-6">
        {/* Avatar placeholder */}
        <div className="size-44 rounded-full bg-[#F9FAFB] border border-[#F2F4F7] flex items-center justify-center overflow-hidden relative">
            {preview ? (
            <div className="w-full h-full relative">
                 <Image 
                    src={preview} 
                    alt="Profile" 
                    fill 
                    className="object-cover" 
                    />
            </div>
            ) : (
                <Camera className="size-12 text-[#98A2B3]" />
            )}
        </div>

        {/* Upload buttons */}
        <div className="flex items-center gap-3 w-full">
          <input 
            type="file" 
            ref={fileInputRef}
            name="profilePicture"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button 
            type="button"
            onClick={triggerUpload}
            className="flex-1 flex items-center justify-center h-12 rounded-xl bg-[#F9FAFB] border border-[#F2F4F7] text-[#101828] hover:bg-white hover:border-[#E6007A]/20 hover:shadow-sm transition-all text-[15px] font-bold gap-2"
          >
            <Upload className="size-4" />
            Upload Photo
          </button>
        </div>
        <p className="text-xs text-[#667085] text-center">
            Supported formats: JPG, PNG, WEBP. Max 5MB.
        </p>
      </div>
    </div>
  );
}
