import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "About Us - RocketsRobotics" };

const stats = [
  { value: "500+", label: "Schools" },
  { value: "10,000+", label: "Students" },
  { value: "50+", label: "Kits" },
  { value: "4.9", label: "Rating" },
];

const team = [
  {
    name: "Mr Edwin Chomusina",
    role: "Founder & CEO",
    bio: "Physics and robotics teacher with 15+ years experience",
    image: "/images/team-chomusina.png",
  },
  {
    name: "Mrs Sarah Hove",
    role: "Head of Education",
    bio: "Curriculum developer and STEM advocate",
    image: "/images/team-hove.png",
  },
  {
    name: "Dr T.Moyo",
    role: "Product Designer",
    bio: "Award-winning robotics engineer",
    image: "/images/team-moyo.jpg",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-4 hero-bg">
        <div className="max-w-7xl mx-auto text-white">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <Link href="/" className="hover:text-indigo-200 transition">Home</Link>
            <span>/</span>
            <span className="text-indigo-200">About Us</span>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold">About RocketsRobotics</h1>
            <p className="text-xl text-indigo-100 mt-4">To Infinity and Beyond</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              To make robotics education accessible, engaging, and fun for students of all ages.
              We believe every child deserves the opportunity to explore STEM and develop critical
              thinking skills through hands-on learning.
            </p>
            <ul className="space-y-4">
              {[
                "Quality educational robotics kits",
                "Comprehensive curriculum support to suit ZIMSEC and Cambridge assessments",
                "Dedicated teacher and parent resources",
              ].map((t) => (
                <li key={t} className="flex items-center space-x-3">
                  <span className="text-indigo-600 text-xl">✔</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 rounded-2xl shadow-2xl overflow-hidden">
            <Image
              src="/images/robotic.jpg"
              alt="Students building a robot"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-indigo-600">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold">{s.value}</div>
              <div>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Meet Our Team</h2>
          <p className="text-center text-gray-600 mb-12">Passionate administrators and educators.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((m) => (
              <div key={m.name} className="bg-white rounded-2xl shadow-xl overflow-hidden text-center card-hover">
                <Image
                  src={m.image}
                  alt={m.name}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover mx-auto mt-8"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{m.name}</h3>
                  <p className="text-indigo-600">{m.role}</p>
                  <p className="text-gray-600 mt-2">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
