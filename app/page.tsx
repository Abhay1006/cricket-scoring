import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <div className="container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <h1 className="gradient-text" style={{ fontSize: "4rem", marginBottom: "1rem" }}>
        Cricket Scoring Pro
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", maxWidth: "600px", marginBottom: "2rem" }}>
        A dynamic, real-time cricket scoring dashboard built for modern devices. Experience unparalleled performance and aesthetics.
      </p>
      <Link href="/admin" className="btn-primary">
        Launch Admin Panel
      </Link>
    </div>
  );
}
