import type { Metadata } from 'next';
import './globals.css';
import Nav from './components/Nav';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Merry Events | Event Planner at Kottayam Kerala',
  description:
    'Merry Events crafts weddings and celebrations with seamless execution, stunning design, and heartfelt experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="top-bar h-1.5 w-full" />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
