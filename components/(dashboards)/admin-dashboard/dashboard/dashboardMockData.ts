import { ApprovalType, ActivityStatus } from "./enums";

// Data passed as props to the root component
export const mockRootProps = {
  stats: {
    pendingApprovals: {
      value: 150,
      percentageChange: 10,
      isIncrease: true
    },
    activeUsers: {
      value: 25000,
      subtitle: "Cards Issued" as const
    },
    totalLoans: {
      value: 50000000,
      subtitle: "Requires Attention" as const
    },
    activeProducts: {
      value: 5000,
      subtitle: "With access to Cards" as const
    }
  },
  pendingApprovals: [
    {
      id: "1",
      type: ApprovalType.ACCOUNT,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "2",
      type: ApprovalType.CORPORATIVE,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "3",
      type: ApprovalType.LISTING,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "4",
      type: ApprovalType.ACCOUNT,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "5",
      type: ApprovalType.CORPORATIVE,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "6",
      type: ApprovalType.LISTING,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "7",
      type: ApprovalType.SHIPPED,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "8",
      type: ApprovalType.SHIPPED,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "9",
      type: ApprovalType.SHIPPED,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "10",
      type: ApprovalType.SHIPPED,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    }
  ],
  recentActivities: [
    {
      id: "1",
      description: "Account Suspended: Mutiple policy violations",
      status: ActivityStatus.PENDING,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: "2",
      description: "Account Suspended: Mutiple policy violations",
      status: ActivityStatus.PENDING,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: "3",
      type: ApprovalType.LISTING,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "4",
      type: ApprovalType.ACCOUNT,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "5",
      type: ApprovalType.CORPORATIVE,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "6",
      type: ApprovalType.LISTING,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "7",
      type: ApprovalType.SHIPPED,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "8",
      type: ApprovalType.SHIPPED,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "9",
      type: ApprovalType.SHIPPED,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    },
    {
      id: "10",
      type: ApprovalType.SHIPPED,
      name: "Amina Hssan",
      submittedBy: "Self Registration",
      orderDate: new Date(2025, 3, 7),
      description: "New seller acct application"
    }
  ],
  recentActivities: [
    {
      id: "1",
      description: "Account Suspended: Mutiple policy violations",
      status: ActivityStatus.PENDING,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: "2",
      description: "Account Suspended: Mutiple policy violations",
      status: ActivityStatus.PENDING,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: "3",
      description: "Account Suspended: Mutiple policy violations",
      status: ActivityStatus.PENDING,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: "4",
      description: "Account Suspended: Mutiple policy violations",
      status: ActivityStatus.PENDING,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: "5",
      description: "Account Suspended: Mutiple policy violations",
      status: ActivityStatus.PENDING,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ]
};