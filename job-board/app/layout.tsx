
// import type { Metadata } from 'next';
// import { GeistSans, GeistMono } from 'next/font/google';
// import './globals.css';
// import ClientWrapper from './components/ClientWrapper';

// const geistSans = GeistSans({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = GeistMono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

// export const metadata: Metadata = {
//   title: 'Job Board',
//   description: 'A responsive job board for candidates, recruiters, and admins',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactCqomponent;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <ClientWrapper>{children}</ClientWrapper>
//       </body>
//     </html>
//   );
// }


import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ClientWrapper from './components/ClientWrapper';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Job Board',
  description: 'A responsive job board for candidates, recruiters, and admins',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Fixed typo: ReactCqomponent -> ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}