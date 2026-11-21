import PaymentVerifier from "@/components/PaymentVerifier";

export const metadata = { title: "Payment Successful | MentorLagbe" };

export default async function PaymentSuccessPage({ searchParams }) {
  const params = await searchParams;

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4">
      <div className="glass w-full p-10">
        <PaymentVerifier sessionId={params.session_id} />
      </div>
    </main>
  );
}
