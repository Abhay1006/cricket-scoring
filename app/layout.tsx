import "./globals.css";

export const metadata = {
  title: "Cricket Scoring Pro",
  description: "Modern, dynamic cricket scoring dashboard.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}