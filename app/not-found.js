import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4">
      <div className="glass w-full p-10 text-center">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="mt-3 text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-base-content/70">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link href="/" className="btn btn-primary mt-6">Back to Home</Link>
      </div>
    </main>
  );
}
