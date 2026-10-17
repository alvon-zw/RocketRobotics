import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata = { title: "Contact Support - RocketsRobotics" };

const faqs = [
  {
    q: "What age groups do your kits serve?",
    a: "Our kits are designed for ages 8-18, with beginner to advanced levels available.",
  },
  {
    q: "Do you offer bulk discounts for schools?",
    a: "Yes! Contact us for special pricing on classroom bundles and district-wide purchases.",
  },
  {
    q: "What's your return policy?",
    a: "30-day money-back guarantee and 1-year warranty on all electronic components.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-4 bg-linear-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-white">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <Link href="/" className="hover:text-indigo-200 transition">Home</Link>
            <span>/</span>
            <span className="text-indigo-200">Contact Support</span>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
            <p className="text-xl text-indigo-100 mt-4">
              We&apos;re here to help and answer any questions
            </p>
          </div>
        </div>
      </section>

      <section id="contactForm" className="py-20 px-4 bg-indigo-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="border border-gray-300 bg-gray-100 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
            <ContactForm />
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold mb-2">📍 Visit Us</h3>
              <p className="text-gray-600">123 Harare Drive, Harare, Zimbabwe</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold mb-2">✉️ Email Us</h3>
              <p className="text-gray-600">hello@rocketsrobotics.com</p>
              <p className="text-gray-600">support@rocketsrobotics.com</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold mb-2">📞 Call Us</h3>
              <p className="text-gray-600">+263 773 245 372</p>
              <p className="text-gray-600">Mon-Fri, 8am-4pm CAT</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 mt-12">
            {faqs.map((f) => (
              <div key={f.q} className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">{f.q}</h3>
                <p className="text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
