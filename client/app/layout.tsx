import './globals.css';
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-neutral-50 text-neutral-900">
        <Providers>
          <div className="max-w-6xl mx-auto p-4">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

