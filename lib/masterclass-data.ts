export interface ModuleItem {
  title: string;
  duration: string;
}

export interface CourseModule {
  title: string;
  items: ModuleItem[];
}

export interface Course {
  id: number;
  image: string;
  category: string;
  level: string;
  duration: string;
  title: string;
  description: string;
  price: number;
  overview: string;
  outline: CourseModule[];
}

export const courses: Course[] = [
  {
    id: 1,
    image: "/cargo.png",
    category: "Marketing",
    level: "Beginner",
    duration: "45 minutes",
    title: "Digital Marketing Essentials",
    description:
      "Learn how to leverage social media and digital platforms to reach global customers and grow your online presence.",
    price: 328000,
    overview: "Learn how to leverage social media and digital platforms to reach global customers and grow your online presence. Learn how to leverage social media and digital platforms to reach global customers and grow your online presence. Learn how to leverage social media and digital platforms to reach global customers and grow your online presence. Learn how to leverage social media and digital platforms to reach global customers and grow your online presence. Learn how to leverage social media and digital platforms to reach global customers and grow your online presence.",
    outline: [
      {
        title: "Module 1: Digital",
        items: [
          { title: "Introduction", duration: "45 min" },
          { title: "Sources", duration: "60 min" },
          { title: "All", duration: "75 min" },
          { title: "Digital", duration: "90 min" },
        ],
      },
      {
        title: "Module 2: Money",
        items: [
          { title: "Budgeting", duration: "45 min" },
          { title: "Investing", duration: "60 min" },
        ],
      },
      {
        title: "Module 3: Fame",
        items: [
          { title: "Branding", duration: "45 min" },
          { title: "Social Media", duration: "60 min" },
        ],
      },
      {
        title: "Module 4: Marketing",
        items: [
          { title: "Strategy", duration: "45 min" },
          { title: "Execution", duration: "60 min" },
        ],
      },
    ],
  },
  {
    id: 2,
    image: "/laptop.png",
    category: "Finance",
    level: "Beginner",
    duration: "80 minutes",
    title: "Financial Management for Small Business",
    description:
      "Master the basics of business finance, from record-keeping to profit margins and sustainable growth planning.",
    price: 450000,
    overview: "Master the basics of business finance, from record-keeping to profit margins and sustainable growth planning. Master the basics of business finance, from record-keeping to profit margins and sustainable growth planning.",
    outline: [
      {
        title: "Module 1: Finance Basics",
        items: [
          { title: "Introduction to Finance", duration: "30 min" },
          { title: "Profit & Loss", duration: "50 min" },
        ],
      },
    ],
  },
  {
    id: 3,
    image: "/plan.png",
    category: "Logistics",
    level: "Intermediate",
    duration: "50 minutes",
    title: "International Shipping Made Simple",
    description:
      "Navigate international shipping regulations, customs procedures, and cost-effective global delivery strategies.",
    price: 275000,
    overview: "Navigate international shipping regulations, customs procedures, and cost-effective global delivery strategies.",
    outline: [
      {
        title: "Module 1: Logistics",
        items: [
          { title: "Shipping Methods", duration: "40 min" },
          { title: "Customs", duration: "60 min" },
        ],
      },
    ],
  },
];
