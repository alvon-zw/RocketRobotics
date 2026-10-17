import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Testimonials - RocketsRobotics" };

interface Testimonial {
  id: string;
  author: string;
  role: string | null;
  quote: string;
  rating: number | null;
  image: string | null;
}

async function TestimonialList() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at")
    .returns<Testimonial[]>();

  if (error) {
    return <p className="text-center text-red-600">Couldn&apos;t load testimonials right now.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {(data ?? []).map((t) => (
        <figure key={t.id} className="bg-white rounded-2xl shadow-xl p-8 card-hover">
          <div className="text-yellow-400 mb-4" aria-label={`${t.rating ?? 5} out of 5 stars`}>
            {"★".repeat(t.rating ?? 5)}
          </div>
          <blockquote className="text-gray-600 mb-6">&ldquo;{t.quote}&rdquo;</blockquote>
          <figcaption className="flex items-center">
            {t.image && (
              <Image
                src={t.image}
                alt=""
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
            )}
            <div>
              <p className="font-bold">{t.author}</p>
              {t.role && <p className="text-sm text-gray-500">{t.role}</p>}
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-4 hero-bg">
        <div className="max-w-7xl mx-auto text-white">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <Link href="/" className="hover:text-indigo-200 transition">Home</Link>
            <span>/</span>
            <span className="text-indigo-200">Testimonials</span>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold">What Our Community Says</h1>
            <p className="text-xl text-indigo-100 mt-4">
              Real stories from educators, parents, and young innovators
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<p className="text-center text-gray-500">Loading…</p>}>
            <TestimonialList />
          </Suspense>
        </div>
      </section>
    </>
  );
}
