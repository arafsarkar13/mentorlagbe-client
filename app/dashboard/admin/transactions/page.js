import { requireRole } from "@/lib/session";
import { serverApiFetch } from "@/lib/serverApi";
import { formatUSD } from "@/lib/publicApi";

export default async function AdminTransactionsPage() {
  const user = await requireRole("admin");
  const data = await serverApiFetch("/api/admin/transactions", user);
  const transactions = data?.transactions || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="mt-1 text-base-content/70">Pro plan payments recorded from Stripe.</p>
      </div>

      {transactions.length === 0 ? (
        <div className="glass p-10 text-center">No payments yet.</div>
      ) : (
        <div className="glass overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((payment) => (
                <tr key={payment._id}>
                  <td className="min-w-48">
                    <p className="font-semibold">{payment.userName}</p>
                    <p className="text-xs text-base-content/60">{payment.userEmail}</p>
                  </td>
                  <td className="capitalize">{payment.userRole}</td>
                  <td className="whitespace-nowrap">{payment.planName}</td>
                  <td className="font-semibold text-primary">{formatUSD(payment.amount)}</td>
                  <td className="font-mono text-xs">{payment.transactionId}</td>
                  <td className="whitespace-nowrap">
                    {new Date(payment.paidAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
