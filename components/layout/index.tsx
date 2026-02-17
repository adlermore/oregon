import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { getMe } from "@/lib/getMe";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession(authOptions);
  const user = session ? await getMe() : null;

  return (
    <div className='relative flex flex-col min-h-screen'>
      <Header user={user} />
      <main className="flex-1 pb-10 bg-[#F2F2F2]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;