import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import type { Product, SkillLevel } from "@/lib/types";

const badgeColor: Record<SkillLevel, string> = {
  Beginner: "bg-green-500",
  Intermediate: "bg-yellow-500",
  Advanced: "bg-red-500",
  Classroom: "bg-purple-500",
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col card-hover">
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span
          className={`absolute top-4 left-4 ${badgeColor[product.skill_level]} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md`}
        >
          {product.skill_level}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-xl font-bold transition-colors duration-200 group-hover:text-indigo-600">
          {product.name}
        </h4>
        <p className="text-gray-600 text-sm mt-2 flex-1">{product.description}</p>
        <div className="flex items-center justify-between gap-3 mt-4">
          <span className="text-2xl font-bold text-gray-900">
            ${Number(product.price).toFixed(2)}
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
