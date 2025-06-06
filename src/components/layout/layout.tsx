import type { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-page">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
