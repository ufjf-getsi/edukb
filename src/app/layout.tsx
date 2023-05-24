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
            <Link href="/materiais/cadastro">Cadastro</Link>
            <Link href="/materiais">Materiais</Link>
            <Link href="/materiais/autores">Por autor</Link>
            <Link href="/materiais/areas">Por área</Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}