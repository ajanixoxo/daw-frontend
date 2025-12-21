import { UserStatus } from "./enums";

// Data passed as props to the root component
export const mockRootProps = {
  stats: {
    totalUser: {
      value: 100,
      percentageChange: 10
    },
    numberOfSellers: {
      value: 12,
      subtitle: "Cards Issued" as const
    },
    numberOfCategories: {
      value: 65,
      subtitle: "Requires Attention" as const
    }
  },
  users: [
    {
      id: "1" as const,
      name: "Lagos Artisan Network" as const,
      description: "Supporting local artisans..." as const,
      avatar: "M" as const,
      avatarColor: "#973bfe" as const,
      admin: {
        name: "Favour Princewill" as const,
        email: "princewllfavour17@gmail.com" as const
      },
      location: "Lagos, NG" as const,
      members: 20,
      products: 127,
      totalSales: 127,
      regDate: new Date("2025-04-07"),
      status: UserStatus.SHIPPED
    },

    {
      id: "2" as const,
      name: "Lagos Artisan Network" as const,
      description: "Supporting local artisans..." as const,
      avatar: "M" as const,
      avatarColor: "#973bfe" as const,
      admin: {
        name: "Favour Princewill" as const,
        email: "princewllfavour17@gmail.com" as const
      },
      location: "Lagos, NG" as const,
      members: 20,
      products: 127,
      totalSales: "Shirt" as const,
      regDate: new Date("2025-04-07"),
      status: UserStatus.CANCELLED
    },
    {
      id: "3" as const,
      name: "Lagos Artisan Network" as const,
      description: "Supporting local artisans..." as const,
      avatar: "M" as const,
      avatarColor: "#973bfe" as const,
      admin: {
        name: "Favour Princewill" as const,
        email: "princewllfavour17@gmail.com" as const
      },
      location: "Lagos, NG" as const,
      members: 20,
      products: 127,
      totalSales: "Shirt" as const,
      regDate: new Date("2025-04-07"),
      status: UserStatus.PENDING
    },
    {
      id: "4" as const,
      name: "Lagos Artisan Network" as const,
      description: "Supporting local artisans..." as const,
      avatar: "M" as const,
      avatarColor: "#973bfe" as const,
      admin: {
        name: "Favour Princewill" as const,
        email: "princewllfavour17@gmail.com" as const
      },
      location: "Lagos, NG" as const,
      members: 20,
      products: 127,
      totalSales: "Shirt" as const,
      regDate: new Date("2025-04-07"),
      status: UserStatus.SHIPPED
    },
    {
      id: "5" as const,
      name: "Lagos Artisan Network" as const,
      description: "Supporting local artisans..." as const,
      avatar: "M" as const,
      avatarColor: "#973bfe" as const,
      admin: {
        name: "Favour Princewill" as const,
        email: "princewllfavour17@gmail.com" as const
      },
      location: "Lagos, NG" as const,
      members: 20,
      products: 127,
      totalSales: "Shirt" as const,
      regDate: new Date("2025-04-07"),
      status: UserStatus.PENDING,
      totalSalesAmount: 120000.00
    },
    {
      id: "6" as const,
      name: "Lagos Artisan Network" as const,
      description: "Supporting local artisans..." as const,
      avatar: "M" as const,
      avatarColor: "#973bfe" as const,
      admin: {
        name: "Favour Princewill" as const,
        email: "princewllfavour17@gmail.com" as const
      },
      location: "Lagos, NG" as const,
      members: 20,
      products: 127,
      totalSales: "Shirt" as const,
      regDate: new Date("2025-04-07"),
      status: UserStatus.SHIPPED,
      totalSalesAmount: 120000.00
    },
    {
      id: "7" as const,
      name: "Lagos Artisan Network" as const,
      description: "Supporting local artisans..." as const,
      avatar: "M" as const,
      avatarColor: "#973bfe" as const,
      admin: {
        name: "Favour Princewill" as const,
        email: "princewllfavour17@gmail.com" as const
      },
      location: "Lagos, NG" as const,
      members: 20,
      products: 127,
      totalSales: "Shirt" as const,
      regDate: new Date("2025-04-07"),
      status: UserStatus.PENDING,
      totalSalesAmount: 120000.00
    },
    {
      id: "8" as const,
      name: "Lagos Artisan Network" as const,
      description: "Supporting local artisans..." as const,
      avatar: "M" as const,
      avatarColor: "#973bfe" as const,
      admin: {
        name: "Favour Princewill" as const,
        email: "princewllfavour17@gmail.com" as const
      },
      location: "Lagos, NG" as const,
      members: 20,
      products: 127,
      totalSales: "Shirt" as const,
      regDate: new Date("2025-04-07"),
      status: UserStatus.CANCELLED,
      totalSalesAmount: 120000.00
    },
    {
      id: "9" as const,
      name: "Lagos Artisan Network" as const,
      description: "Supporting local artisans..." as const,
      avatar: "M" as const,
      avatarColor: "#973bfe" as const,
      admin: {
        name: "Favour Princewill" as const,
        email: "princewllfavour17@gmail.com" as const
      },
      location: "Lagos, NG" as const,
      members: 20,
      products: 127,
      totalSales: "Shirt" as const,
      regDate: new Date("2025-04-07"),
      status: UserStatus.SHIPPED,
      totalSalesAmount: 120000.00
    },
    {
      id: "10" as const,
      name: "Lagos Artisan Network" as const,
      description: "Supporting local artisans..." as const,
      avatar: "M" as const,
      avatarColor: "#973bfe" as const,
      admin: {
        name: "Favour Princewill" as const,
        email: "princewllfavour17@gmail.com" as const
      },
      location: "Lagos, NG" as const,
      members: 20,
      products: 127,
      totalSales: "Shirt" as const,
      regDate: new Date("2025-04-07"),
      status: UserStatus.PENDING,
      totalSalesAmount: 120000.00
    }
  ]
};