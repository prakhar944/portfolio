export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
export const contactEndpoint =
  import.meta.env.VITE_CONTACT_ENDPOINT?.trim() ?? "";

// Integration boundary: configure VITE_CONTACT_ENDPOINT for a Formspree/custom
// endpoint that accepts this JSON. For EmailJS, replace this function with its SDK.
// Only a successful HTTP response is considered submitted; never simulate delivery.
export async function sendContactMessage(
  message: ContactMessage,
): Promise<void> {
  if (!contactEndpoint)
    throw new Error("Contact delivery has not been configured.");
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(contactEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(message),
      signal: controller.signal,
    });
    if (!response.ok)
      throw new Error(
        "Your message could not be submitted. Please try again or email me directly.",
      );
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError")
      throw new Error(
        "The request timed out. Please try again or email me directly.",
      );
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
