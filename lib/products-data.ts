export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  description: string
  image: string
  images?: string[]
  seller?: string
  sku?: string
  reviews?: number
  rating?: number
  inStock?: boolean
  weight?: string
  color?: string
  type?: string
  stockStatus?: string
  stockCount?: number
  tags?: string[]
  fullDescription?: string
  features?: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: "Adire Throw Pillow Set",
    price: 85.0,
    originalPrice: 48.0,
    discount: 64,
    category: "HOME DECOR",
    description: "Set of 4 handcrafted throw pillows with traditional Adire patterns",
    image: "/adire-throw-pillows.jpg",
    images: [
      "/adire-throw-pillows.jpg",
      "/adire-throw-pillows.jpg",
      "/adire-throw-pillows.jpg",
      "/adire-throw-pillows.jpg",
    ],
    seller: "farmary",
    sku: "2,51,594",
    reviews: 4,
    rating: 5,
    inStock: true,
    weight: "20",
    color: "White",
    type: "Handcrafted",
    stockStatus: "Available",
    stockCount: 5413,
    tags: ["Pillow", "Home", "Chinese", "Sitting Room", "White"],
    fullDescription:
      "Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at posuere ac, viverra at mauris. Maecenas tincidunt ligula a sem vestibulum pharetra. Maecenas auctor tortor lacus, nec laoreet nisi porttitor vel. Etiam tincidunt metus vel dui interdum sollicitudin. Mauris sem orci, vestibulum nec orci vitae, aliquam mollis lacus. Sed et condimentum arcu, id molestie tellus. Nulla facilisi. Nam scelerisque vitae justo a convallis. Morbi urna ipsum, placerat quis commodo quis, egestas elementum leo. Donec convallis mollis enim. Aliquam id mi quam. Phasellus nec fringilla elit.",
    features: [
      "100 g of fresh leaves provides.",
      "Aliquam ac est at augue volutpat elementum.",
      "Quisque nec enim eget sapien molestie.",
      "Proin convallis odio volutpat finibus posuere.",
    ],
  },
  {
    id: 2,
    name: "Whipped Shea Butter (8oz)",
    price: 18.5,
    originalPrice: 25.0,
    discount: 26,
    category: "BEAUTY",
    description: "Premium raw shea butter whipped with essential oils",
    image: "/whipped-shea-butter.jpg",
    images: [
      "/whipped-shea-butter.jpg",
      "/whipped-shea-butter.jpg",
      "/whipped-shea-butter.jpg",
      "/whipped-shea-butter.jpg",
    ],
    seller: "naturalbeauty",
    sku: "1,23,456",
    reviews: 12,
    rating: 4,
    inStock: true,
    weight: "8oz",
    color: "Natural",
    type: "Organic",
    stockStatus: "Available",
    stockCount: 892,
    tags: ["Beauty", "Skincare", "Natural", "Organic", "Shea"],
    fullDescription:
      "Our premium whipped shea butter is sourced directly from women cooperatives in Ghana. Each jar contains 100% pure, unrefined shea butter that has been carefully whipped with essential oils for a luxurious texture.",
    features: [
      "100% pure unrefined shea butter",
      "Whipped with essential oils",
      "Sourced from Ghana cooperatives",
      "No artificial preservatives",
    ],
  },
  {
    id: 3,
    name: "Modern Kitenge Blazer",
    price: 95.0,
    originalPrice: 120.0,
    discount: 21,
    category: "CLOTHING",
    description: "Tailored blazer in vibrant Kitenge fabric",
    image: "/kitenge-blazer.jpg",
    images: ["/kitenge-blazer.jpg", "/kitenge-blazer.jpg", "/kitenge-blazer.jpg", "/kitenge-blazer.jpg"],
    seller: "africanstyle",
    sku: "3,45,678",
    reviews: 8,
    rating: 5,
    inStock: true,
    weight: "0.8kg",
    color: "Multi-color",
    type: "Handmade",
    stockStatus: "Available",
    stockCount: 45,
    tags: ["Clothing", "Blazer", "Kitenge", "African", "Fashion"],
    fullDescription:
      "Make a bold statement with our Modern Kitenge Blazer. Each piece is carefully crafted by skilled tailors using authentic Kitenge fabric from East Africa. The contemporary cut meets traditional African prints for a unique fashion statement.",
    features: [
      "Authentic Kitenge fabric",
      "Contemporary tailored fit",
      "Fully lined interior",
      "Available in multiple sizes",
    ],
  },
  {
    id: 4,
    name: "Decorative Carved Calabash Bowl",
    price: 39.99,
    originalPrice: 55.0,
    discount: 27,
    category: "HOME DECOR",
    description: "Hand-carved calabash bowl with intricate designs",
    image: "/calabash-bowl.jpg",
    images: ["/calabash-bowl.jpg", "/calabash-bowl.jpg", "/calabash-bowl.jpg", "/calabash-bowl.jpg"],
    seller: "artisancraft",
    sku: "4,56,789",
    reviews: 6,
    rating: 5,
    inStock: true,
    weight: "0.5kg",
    color: "Natural Brown",
    type: "Handcrafted",
    stockStatus: "Available",
    stockCount: 120,
    tags: ["Home Decor", "Calabash", "Handcarved", "African Art"],
    fullDescription:
      "This beautiful calabash bowl is hand-carved by skilled artisans using traditional techniques passed down through generations. Each bowl features unique intricate patterns that tell stories of African heritage.",
    features: [
      "Hand-carved by skilled artisans",
      "Traditional African patterns",
      "Each piece is unique",
      "Perfect for decorative display",
    ],
  },
]

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id)
}

export const getRelatedProducts = (currentId: number, category: string): Product[] => {
  return products.filter((product) => product.id !== currentId).slice(0, 4)
}
