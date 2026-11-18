import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Reuse one MongoDB connection (important in dev and on Vercel)
const globalForMongo = globalThis;
if (!globalForMongo._mongoClient) {
  globalForMongo._mongoClient = new MongoClient(
    process.env.MONGODB_URI || "mongodb://localhost:27017"
  );
}
const client = globalForMongo._mongoClient;
const db = client.db(process.env.DB_NAME || "mentorlagbe");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  user: {
    modelName: "users", // store users in the "users" collection
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "student", input: true },
      phone: { type: "string", required: false },
      bio: { type: "string", required: false },
      plan: { type: "string", required: false, defaultValue: "free", input: false },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Only 'student' or 'tutor' can be chosen at sign up. Never 'admin'.
          const role = user.role === "tutor" ? "tutor" : "student";
          return { data: { ...user, role, plan: "free" } };
        },
      },
    },
  },
});
