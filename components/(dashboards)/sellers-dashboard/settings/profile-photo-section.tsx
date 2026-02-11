import { Upload, Copy } from "lucide-react";

export function ProfilePhotoSection() {
  return (
    <div className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
      <h2 className="text-[18px] font-bold text-[#101828] mb-8">
        Profile Photo
      </h2>

      <div className="flex flex-col items-center space-y-8">
        {/* Avatar placeholder */}
        <div className="size-44 rounded-full bg-[#D9D9D9] flex items-center justify-center overflow-hidden">
          {/* If there's no photo, it's just the bg color as per design */}
        </div>

        {/* Upload buttons */}
        <div className="flex items-center gap-3 w-full">
          <button className="flex-1 flex items-center justify-center h-12 rounded-xl bg-[#F9FAFB] border border-[#F2F4F7] text-[#101828] hover:bg-white hover:border-[#E6007A]/20 hover:shadow-sm transition-all text-[15px] font-bold">
            Upload
          </button>
          <button className="flex items-center justify-center size-12 rounded-xl bg-[#F9FAFB] border border-[#F2F4F7] text-[#101828] hover:bg-white hover:border-[#E6007A]/20 hover:shadow-sm transition-all shrink-0">
            <Copy className="size-5 text-[#667185]" />
          </button>
        </div>
      </div>
    </div>
  );
}
