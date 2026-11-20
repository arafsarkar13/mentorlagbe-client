import jwt from "jsonwebtoken";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Calls a protected Express route from a server component.
// It creates a short JWT for the logged-in user and sends it as a Bearer token.
export async function serverApiFetch(path, user) {
  try {
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );
    const res = await fetch(`${API_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}
