import Link from "next/link";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { createClient } from "@/lib/supabase/server";
import {
  KIT_TYPES,
  SKILL_LEVELS,
  type KitType,
  type Product,
  type SkillLevel,
} from "@/lib/types";

export const metadata = { title: "Shop Robotics Kits - RocketsRobotics" };

const PRICE_RANGES = [
  { value: "under50", label: "Under $50" },
  { value: "50-100", label: "$50 - $100" },
  { value: "100-200", label: "$100 - $200" },
  { value: "200plus", label: "$200+" },
] as const;

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

const SKILL_LABELS: Record<SkillLevel, string> = {
  Beginner: "Beginner (8-12 years)",
  Intermediate: "Intermediate (12-15 years)",
  Advanced: "Advanced (15+ years)",
  Classroom: "Classroom",
};

type Params = Record<string, string | string[] | undefined>;

const toArray = (v: string | string[] | undefined): string[] =>
  v === undefined ? [] : Array.isArray(v) ? v : [v];

function pick<T extends string>(v: string | string[] | undefined, allowed: readonly T[]): T[] {
  return toArray(v).filter((x): x is T => (allowed as readonly string[]).includes(x));
}

export default function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  return (
    <>
      <section className="pt-32 pb-20 px-4 bg-linear-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm mb-4 text-white">
            <Link href="/" className="hover:text-indigo-200 transition">Home</Link>
            <span>/</span>
            <span className="text-indigo-200">Shop</span>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Robotics Kits &amp; Components
            </h1>
            <p className="text-xl text-indigo-100 mt-4">
              Discover our curated collection of STEM robotics kits for all skill levels
            </p>
          </div>
        </div>
      </section>
      <Suspense
        fallback={<p className="py-12 px-4 text-center text-gray-500">Loading kits…</p>}
      >
        <ShopResults searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function ShopResults({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;
  const skills = pick<SkillLevel>(params.skill, SKILL_LEVELS);
  const kits = pick<KitType>(params.kit, KIT_TYPES);
  const price = PRICE_RANGES.find((p) => p.value === toArray(params.price)[0])?.value;
  const sort = SORTS.find((s) => s.value === toArray(params.sort)[0])?.value ?? "featured";

  const supabase = await createClient();
  let query = supabase.from("products").select("*");

  if (skills.length) query = query.in("skill_level", skills);
  if (kits.length) query = query.in("kit_type", kits);
  if (price === "under50") query = query.lt("price", 50);
  if (price === "50-100") query = query.gte("price", 50).lte("price", 100);
  if (price === "100-200") query = query.gt("price", 100).lte("price", 200);
  if (price === "200plus") query = query.gt("price", 200);

  query =
    sort === "price-asc"
      ? query.order("price", { ascending: true })
      : sort === "price-desc"
        ? query.order("price", { ascending: false })
        : query.order("is_featured", { ascending: false }).order("created_at");

  const [{ data, error }, { count: total }] = await Promise.all([
    query.returns<Product[]>(),
    supabase.from("products").select("id", { count: "exact", head: true }),
  ]);
  const products = data ?? [];
  const hasFilters = skills.length > 0 || kits.length > 0 || !!price;

  return (
    <>
      <section className="py-12 px-4">
        <form method="get" className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:sticky lg:top-24">
              <h3 className="text-xl font-bold mb-4">Filters</h3>

              <fieldset className="mb-6">
                <legend className="font-semibold text-gray-900 mb-3">Skill Level</legend>
                <div className="space-y-2">
                  {SKILL_LEVELS.map((s) => (
                    <label key={s} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="skill"
                        value={s}
                        defaultChecked={skills.includes(s)}
                        className="rounded accent-indigo-600"
                      />
                      <span className="text-gray-700">{SKILL_LABELS[s]}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mb-6">
                <legend className="font-semibold text-gray-900 mb-3">Price Range</legend>
                <div className="space-y-2">
                  {PRICE_RANGES.map((p) => (
                    <label key={p.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="price"
                        value={p.value}
                        defaultChecked={price === p.value}
                        className="accent-indigo-600"
                      />
                      <span className="text-gray-700">{p.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mb-6">
                <legend className="font-semibold text-gray-900 mb-3">Kit Type</legend>
                <div className="space-y-2">
                  {KIT_TYPES.map((k) => (
                    <label key={k} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="kit"
                        value={k}
                        defaultChecked={kits.includes(k)}
                        className="rounded accent-indigo-600"
                      />
                      <span className="text-gray-700">{k}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Apply Filters
              </button>
              <Link
                href="/shop"
                className="block text-center w-full text-gray-500 py-2 mt-2 hover:text-indigo-600 transition text-sm"
              >
                Clear All
              </Link>
            </div>
          </aside>

          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{products.length}</span> of{" "}
                <span className="font-semibold">{total ?? products.length}</span> products
              </p>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                Sort by
                <select
                  name="sort"
                  defaultValue={sort}
                  className="border border-gray-200 rounded-lg px-3 py-2"
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {error ? (
              <p className="text-red-600">
                Sorry, we couldn&apos;t load products right now. Please try again shortly.
              </p>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <p className="text-gray-600">
                  No kits match those filters.{" "}
                  {hasFilters && (
                    <Link href="/shop" className="text-indigo-600 font-semibold hover:underline">
                      Clear filters
                    </Link>
                  )}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            <div className="mt-10 text-center">
              <Link
                href="/contact"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition hover:underline"
              >
                Looking for something else?
              </Link>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
