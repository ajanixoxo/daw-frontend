import Image from "next/image"
import { ShoppingCart } from "lucide-react"

const products = [
  {
    id: 1,
    category: "HOME DECOR",
    name: "Adire Throw Pillow Set",
    price: 85.0,
    description: "Set of 4 handcrafted throw pillows with traditional Adire patterns",
    image: "/pillow.png",
  },
  {
    id: 2,
    category: "BEAUTY",
    name: "Whipped Shea Butter (8oz)",
    price: 18.5,
    description: "Premium raw shea butter whipped with essential oils",
    image: "/shea.png",
  },
  {
    id: 3,
    category: "CLOTHING",
    name: "Modern Kitenge Blazer",
    price: 95.0,
    description: "Tailored blazer in vibrant Kitenge fabric",
    image: "/suit.png",
  },
  {
    id: 4,
    category: "HOME DECOR",
    name: "Decorative Carved Calabash Bowl",
    price: 39.99,
    description: "Hand-carved calabash bowl with intricate designs",
    image: "/bash.png",
  },
]

export function MarketplaceProducts() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#222222] mb-4">
            Discover African Craftsmanship
          </h2>
          <p className="text-[#6b6b6b] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Browse our curated selection of authentic products made by talented
            <br className="hidden md:block" /> African women entrepreneurs.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col">
              {/* Product Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-1">
                {/* Category */}
                <span className="text-xs text-[#6b6b6b] tracking-wide mb-2">{product.category}</span>

                {/* Name and Price Row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-[#222222] text-base leading-tight">{product.name}</h3>
                  <span className="text-[#f10e7c] font-semibold text-base whitespace-nowrap">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4 flex-1">{product.description}</p>

                {/* Add to Cart Button */}
                <button className="w-full bg-[#222222] hover:bg-[#333333] text-white py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-medium">Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Marketplace Link */}
        <div className="text-center">
          <a href="#" className="text-[#f10e7c] font-semibold text-base hover:underline inline-flex items-center gap-1">
            Explore Marketplace
          </a>
        </div>
      </div>
    </section>
  )
}
