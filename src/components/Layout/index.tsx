import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface ILayoutProps {
  children: ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <AppShell header={<Header />} footer={<Footer />}>
      {children}
    </AppShell>
  );
}

export default Layout;
