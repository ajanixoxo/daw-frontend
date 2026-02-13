import { type LucideIcon, TrendingUp } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle: string;
  subtitleHighlight?: string;
  trend?: "up" | "down" | "none";
  iconColor?: string;
  highlighted?: boolean;
}

export function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  subtitleHighlight,
  trend = "none",
  iconColor = "#E6007A",
  highlighted = false,
}: StatCardProps) {
  if (highlighted) {
    return (
      <div className="bg-gradient-to-r from-[#DB005F] to-[#791F56] text-white flex flex-col justify-between h-[120px] w-full p-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2 relative z-10">
          <div className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0 bg-white/20">
            <Icon className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-[13px] font-medium text-white/90 tracking-tight">
            {title}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 relative z-10">
          <h3 className="text-[26px] font-bold text-white leading-none tracking-tight">
            {value}
          </h3>
          <p className="text-[10px] font-medium text-white/70">{subtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#F0F2F5] flex flex-col justify-between h-[120px] w-full p-4 transition-colors hover:border-[#E6007A]/20">
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${iconColor}12` }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color: iconColor }} />
        </div>
        <span className="text-[13px] font-medium text-[#667185] tracking-tight">
          {title}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="text-[26px] font-bold text-[#101828] leading-none tracking-tight">
          {value}
        </h3>

        <div className="flex items-center gap-1">
          {trend === "up" && (
            <TrendingUp
              className="h-[12px] w-[12px] text-[#12B76A] shrink-0"
              strokeWidth={2.5}
            />
          )}
          <p className="text-[10px] font-medium">
            {subtitleHighlight && (
              <span className="text-[#12B76A] mr-1">{subtitleHighlight}</span>
            )}
            <span
              className={
                trend === "up" && !subtitleHighlight
                  ? "text-[#12B76A]"
                  : "text-[#98A2B3]"
              }
            >
              {subtitle}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
