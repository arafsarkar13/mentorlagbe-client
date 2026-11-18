const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Calls the Express server with the user's JWT attached.
export async function apiFetch(path, options = {}) {
  const tokenRes = await fetch("/api/token");
  if (!tokenRes.ok) throw new Error("Please sign in first");
  const { token } = await tokenRes.json();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}
