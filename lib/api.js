const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Calls the Express server with the user's JWT attached.
export async function apiFetch(path, options = {}) {
  const tokenRes = await fetch("/api/token");
  if (!tokenRes.ok) throw new Error("Please sign in first");
  const { token } = await tokenRes.json();

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
  } catch (error) {
    // Happens when the server is down, blocked by CORS, or the request is too large
    throw new Error("Could not reach the server. Please try again.");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}
