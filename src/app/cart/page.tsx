"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, setQuantity, remove } = useCart();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = items.length === 0 || subtotal > 50 ? 0 : 5;
  const total = subtotal + shipping;

  return (
    <>
      <section className="pt-32 pb-20 px-4 bg-linear-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm mb-4 text-white">
            <Link href="/" className="hover:text-indigo-200 transition">Home</Link>
            <span>/</span>
            <span className="text-indigo-200">Cart</span>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Your Shopping Cart</h1>
            <p className="text-xl text-indigo-100 mt-4">Review and manage your items</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {items.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="text-7xl mb-6">🛒</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Your Cart Is Empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven&apos;t added any robotics kits to your cart yet.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition"
              >
                Browse Our Kits
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3 bg-white rounded-2xl shadow-lg overflow-hidden self-start w-full">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-600">Product</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-600">Price</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-600">Quantity</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-600">Total</th>
                        <th className="py-4 px-6">
                          <span className="sr-only">Remove</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-xs text-indigo-600">Level: {item.skill_level}</p>
                          </td>
                          <td className="py-4 px-6">${item.price.toFixed(2)}</td>
                          <td className="py-4 px-6">
                            <input
                              type="number"
                              min={1}
                              value={item.quantity}
                              aria-label={`Quantity for ${item.name}`}
                              onChange={(e) => {
                                const n = parseInt(e.target.value, 10);
                                setQuantity(item.id, Number.isNaN(n) ? 1 : n);
                              }}
                              className="w-20 border rounded-lg px-2 py-1 text-center"
                            />
                          </td>
                          <td className="py-4 px-6 font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="py-4 px-6">
                            <button
                              type="button"
                              onClick={() => remove(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="text-red-500 hover:text-red-700"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-6 border-t">
                  <Link href="/shop" className="text-indigo-600 hover:text-indigo-700">
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              <div className="lg:w-1/3 w-full">
                <div className="bg-white rounded-2xl shadow-lg p-6 lg:sticky lg:top-24">
                  <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                  <div className="space-y-3 pb-4 border-b">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 text-xl font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <button
                    type="button"
                    disabled
                    className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold mt-6 opacity-60 cursor-not-allowed"
                  >
                    Checkout coming soon
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
