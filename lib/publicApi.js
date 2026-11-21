const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Used by server components to load public data from the Express server.
// Returns null when the request fails, so pages can show a friendly message.
export async function getPublic(path) {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export function formatFee(fee) {
  return `৳${Number(fee).toLocaleString("en-US")}`;
}

// Payments are stored in US dollars
export function formatUSD(amount) {
  return `$${Number(amount).toLocaleString("en-US")}`;
}
