import Link from "next/link";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";

async function FeaturedKits() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .order("created_at")
    .returns<Product[]>();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(data ?? []).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="pt-36 pb-24 px-4 hero-bg text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Build. Code. Launch.</h1>
          <p className="text-xl text-indigo-100 mt-6 max-w-2xl mx-auto">
            Robotics kits that inspire the next generation of engineers, for every skill level.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="btn-lift bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 shadow-lg"
            >
              Shop Kits
            </Link>
            <Link
              href="/contact"
              className="btn-lift border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Featured Kits</h2>
          <Suspense
            fallback={<p className="text-center text-gray-500">Loading kits…</p>}
          >
            <FeaturedKits />
          </Suspense>
          <div className="text-center mt-10">
            <Link href="/shop" className="inline-block text-indigo-600 font-semibold hover:text-indigo-700 hover:translate-x-1 transition duration-200">
              View all kits →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
