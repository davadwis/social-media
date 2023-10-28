import Head from "next/head";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";

function Layout({ children, metaTitle, metaDescription }) {
  return (
    <>
      <Head>
        <title>{`Lettra - ${metaTitle}`}</title>
        <meta
          name="description"
          content={metaDescription || "lettra connects everyone"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex flex-row">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </>
  );
}
export default Layout;
