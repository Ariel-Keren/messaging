import { ReactNode } from "react";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Messaging App",
  description: "Messaging App",
};

interface Props {
  children: ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => (
  <html lang="en">
    <body className={`${poppins.className} bg-gray-900`}>{children}</body>
  </html>
);

export default RootLayout;
