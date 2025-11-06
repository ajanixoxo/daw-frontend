import { Upload, Copy } from "lucide-react"

export function ProfilePhotoSection() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Profile Photo</h2>

      <div className="flex flex-col items-center space-y-4">
        {/* Avatar placeholder */}
        <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">No photo</span>
        </div>

        {/* Upload buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
            <Upload className="w-4 h-4" />
            Upload
          </button>
          <button className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
