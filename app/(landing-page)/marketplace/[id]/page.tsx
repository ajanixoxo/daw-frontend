import { ProductDetails } from "@/components/landing-page/marketplace/product-details"
import { getProductById, products } from "@/lib/products-data"
import { notFound } from "next/navigation"
import Header from "@/components/Header";
import Footer from "@/components/landing-page/cooperatives/Footer";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProductById(Number(id))

  if (!product) {
    notFound()
  }

  return <div>
  <Header />
    <ProductDetails product={product} />
          <Footer />

  </div> 
}
