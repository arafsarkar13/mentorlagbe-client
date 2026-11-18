import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { auth } from "@/lib/auth";

// Gives the logged-in user a short-lived JWT to call the Express server.
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = jwt.sign(
    {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return Response.json({ token });
}
