import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Science of Human Body | 3D Gym & Anatomy Academy',
  description:
    'Interactive 3D human anatomy explorer and scientific gym exercise platform. Learn biomechanics, proper form, and structured chapter modules from top fitness educators.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
