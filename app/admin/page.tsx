import AdminPanel from "../../components/AdminPanel";
import Link from "next/link";
import "../globals.css";

export default function AdminPage() {
  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 className="gradient-text">Admin Dashboard</h1>
        <Link href="/" className="btn-secondary">
          &larr; Back to Home
        </Link>
      </div>
      <AdminPanel />
    </div>
  );
}
