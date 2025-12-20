// Enum for approval types
export enum ApprovalType {
  ACCOUNT = "Account",
  CORPORATIVE = "Corporative",
  LISTING = "Listing",
  SHIPPED = "Shipped"
}

// Enum for activity status
export enum ActivityStatus {
  PENDING = "Pending"
}

// Color mappings for approval types
export const ApprovalTypeColors = {
  [ApprovalType.ACCOUNT]: "#c76034",
  [ApprovalType.CORPORATIVE]: "#3436c7",
  [ApprovalType.LISTING]: "#7634c7",
  [ApprovalType.SHIPPED]: "#34c759"
} as const;