import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Codeplayground",
  description: "Codeplayground",
};

const DummyUserProvider = ({ children }) => {
  const user = { name: 'testuser@example.com', email: 'testuser@example.com' };
  return (
    <UserProvider user={user}>
      {children}
    </UserProvider>
  );
};

export default function RootLayout({ children }) {
  const skipAuth = process.env.SKIP_AUTH === 'true';

  return (
    <html lang="en">
      {skipAuth ? (
        <DummyUserProvider>
          <body className={inter.className}>{children}<Toaster /></body>
        </DummyUserProvider>
      ) : (
        <UserProvider>
          <body className={inter.className}>{children}<Toaster /></body>
        </UserProvider>
      )}
    </html>
  );
}
