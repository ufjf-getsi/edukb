import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: 'Home',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/materias">Materias</Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}