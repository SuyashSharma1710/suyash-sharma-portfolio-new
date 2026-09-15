"use server";

export interface ContactFormState {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    scope?: string[];
    message?: string[];
  };
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const honeypot = formData.get("_hp") as string;
  // If honeypot is filled, silent reject (bot detected)
  if (honeypot) {
    return { success: true, message: "Message received." };
  }

  const name = (formData.get("name") as string || "").trim();
  const email = (formData.get("email") as string || "").trim();
  const scope = (formData.get("scope") as string || "").trim();
  const message = (formData.get("message") as string || "").trim();

  const errors: ContactFormState["errors"] = {};

  if (!name || name.length < 2) {
    errors.name = ["Please provide your name (at least 2 characters)."];
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = ["Please provide a valid email address."];
  }

  if (!message || message.length < 10) {
    errors.message = ["Message must be at least 10 characters long."];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please correct the highlighted errors.",
      errors,
    };
  }

  // Real-world server processing simulation / log
  // Can be hooked up to Resend, SendGrid, or Nodemailer via environment variables
  console.log("[CONTACT_FORM_SUBMISSION]", {
    name,
    email,
    scope,
    messageLength: message.length,
    timestamp: new Date().toISOString(),
  });

  return {
    success: true,
    message: "Thank you for reaching out. Your message has been dispatched successfully.",
  };
}
