// One badge for every status in the app (approval, application)
const styles = {
  pending: "badge-warning",
  approved: "badge-success",
  accepted: "badge-success",
  rejected: "badge-error",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`badge px-3 capitalize ${styles[status] || "badge-ghost"}`}>{status}</span>
  );
}
