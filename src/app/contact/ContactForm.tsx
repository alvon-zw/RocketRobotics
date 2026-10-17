"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "./actions";

const initial: ContactState = { status: "idle" };

const inputClass =
  "w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="text-center py-10">
        <div className="text-5xl mb-4">✅</div>
        <p className="text-xl font-semibold">{state.message}</p>
      </div>
    );
  }

  const v = state.values;
  const e = state.fieldErrors;

  return (
    <form action={action} noValidate>
      {state.message && (
        <p role="alert" className="mb-4 text-red-600">{state.message}</p>
      )}
      <div className="mb-4">
        <input type="text" name="name" placeholder="Your Name" defaultValue={v?.name} maxLength={200} className={inputClass} />
        {e?.name && <p className="text-sm text-red-600 mt-1">{e.name}</p>}
      </div>
      <div className="mb-4">
        <input type="email" name="email" placeholder="Your Email" defaultValue={v?.email} maxLength={320} className={inputClass} />
        {e?.email && <p className="text-sm text-red-600 mt-1">{e.email}</p>}
      </div>
      <div className="mb-4">
        <input type="text" name="subject" placeholder="Subject" defaultValue={v?.subject} maxLength={200} className={inputClass} />
      </div>
      <div className="mb-6">
        <textarea name="message" rows={5} placeholder="Your Message" defaultValue={v?.message} maxLength={5000} className={inputClass} />
        {e?.message && <p className="text-sm text-red-600 mt-1">{e.message}</p>}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="btn-lift w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
