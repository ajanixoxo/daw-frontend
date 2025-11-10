export function StoreStatus() {
  const stats = [
    { label: "Status", value: "Active", valueClass: "text-[#1c1c1c]" },
    { label: "Products", value: "12", valueClass: "text-[#1c1c1c]" },
    { label: "Total Orders", value: "45", valueClass: "text-[#1c1c1c]" },
    { label: "Store Views", value: "1,234", valueClass: "text-[#1c1c1c]" },
  ]

  return (
    <div className="rounded-xl border border-[#e4e7ec] bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold text-[#1c1c1c]">Store Status</h2>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-[#f0f0f0] pb-4 last:border-0 last:pb-0"
          >
            <span className="text-sm text-[#667185]">{stat.label}</span>
            <span className={`font-medium ${stat.valueClass}`}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
