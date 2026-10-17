"use server";

import { createClient } from "@/lib/supabase/server";

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: { name: string; email: string; subject: string; message: string };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const values = {
    name: get("name"),
    email: get("email"),
    subject: get("subject"),
    message: get("message"),
  };

  const fieldErrors: NonNullable<ContactState["fieldErrors"]> = {};
  if (!values.name || values.name.length > 200) fieldErrors.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email) || values.email.length > 320)
    fieldErrors.email = "Please enter a valid email address.";
  if (!values.message || values.message.length > 5000)
    fieldErrors.message = "Please enter a message (up to 5000 characters).";
  if (values.subject.length > 200) values.subject = values.subject.slice(0, 200);

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, values };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: values.name,
    email: values.email,
    subject: values.subject || null,
    message: values.message,
  });

  if (error) {
    return {
      status: "error",
      message: "Sorry, we couldn't send your message. Please try again.",
      values,
    };
  }
  return { status: "success", message: "Thanks! We'll get back to you soon." };
}
