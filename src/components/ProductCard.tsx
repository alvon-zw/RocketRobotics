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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
      <div className="relative h-48 bg-gray-100">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        )}
        <span
          className={`absolute top-4 left-4 ${badgeColor[product.skill_level]} text-white px-3 py-1 rounded-full text-sm font-semibold`}
        >
          {product.skill_level}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-xl font-bold">{product.name}</h4>
        <p className="text-gray-600 text-sm mt-2 flex-1">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-gray-900">
            ${Number(product.price).toFixed(2)}
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
