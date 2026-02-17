import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import Layout from "@/components/layout";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "@/context/ModalContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "----",
  description: "----",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            className:
              "bg-white text-gray-900 shadow-xl rounded-xl px-4 py-3 font-medium flex items-center space-x-2",
            success: {
              className:
                "bg-white text-gray-900 shadow-xl rounded-xl px-4 py-3 font-medium flex items-center space-x-2",
            },
            error: {
              className:
                "bg-white text-gray-900 shadow-xl rounded-xl px-4 py-3 font-medium flex items-center space-x-2",
            },
            loading: {
              className:
                "bg-white text-gray-900 shadow-xl rounded-xl px-4 py-3 font-medium flex items-center space-x-2",
            },
            iconTheme: {
              primary: "#064266",
              secondary: "#ffffff",
            },
          }}
        />
        <ModalProvider>
          <Layout>
            {children}
          </Layout>
        </ModalProvider>
      </body>
    </html>
  );
}
