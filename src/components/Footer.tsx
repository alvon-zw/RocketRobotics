import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 mt-auto">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h5 className="text-2xl font-bold text-indigo-400">
            Rockets<span className="text-white">Robotics</span>
          </h5>
          <p className="text-gray-400 mt-4">
            Inspiring the next generation of engineers, one kit at a time.
          </p>
        </div>
        <div>
          <h6 className="font-semibold text-lg">Shop</h6>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li><Link href="/shop" className="inline-block hover:text-white hover:translate-x-1 transition duration-200">All Kits</Link></li>
            <li><Link href="/shop?skill=Beginner" className="inline-block hover:text-white hover:translate-x-1 transition duration-200">Beginner</Link></li>
            <li><Link href="/shop?skill=Intermediate" className="inline-block hover:text-white hover:translate-x-1 transition duration-200">Intermediate</Link></li>
            <li><Link href="/shop?skill=Advanced" className="inline-block hover:text-white hover:translate-x-1 transition duration-200">Advanced</Link></li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold text-lg">Company</h6>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li><Link href="/about" className="inline-block hover:text-white hover:translate-x-1 transition duration-200">About Us</Link></li>
            <li><Link href="/testimonials" className="inline-block hover:text-white hover:translate-x-1 transition duration-200">Testimonials</Link></li>
            <li><Link href="/contact" className="inline-block hover:text-white hover:translate-x-1 transition duration-200">Support</Link></li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold text-lg">Contact</h6>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li>hello@rocketsrobotics.com</li>
            <li>+263 773 245 372 Mr Chomusina</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
        <p>&copy; 2026 RocketsRobotics. All rights reserved.</p>
      </div>
    </footer>
  );
}
