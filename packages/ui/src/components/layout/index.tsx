import Container from "../container";
import { Footer } from "../footer";
import { Header, HeaderProps } from "../header";
import { WinrWeb3Modals } from "../modals";
import { Sidebar, SidebarProps } from "../sidebar";

interface LayoutProps {
  sidebar: SidebarProps;
  children: React.ReactNode;
  header: HeaderProps;
}

export const Layout = ({ children, sidebar, header }: LayoutProps) => {
  return (
    <div className="wr-relative wr-flex wr-justify-between wr-overflow-hidden">
      <Sidebar {...sidebar} />
      <main className="no-scrollbar wr-h-[calc(100dvh_-_64px)] wr-max-w-full wr-flex-1 wr-overflow-x-hidden wr-overflow-y-scroll wr-p-6 max-md:wr-p-4 lg:h-[100dvh] lg:wr-pt-0">
        <Header {...header} />
        <Container size="large">
          {children}
          <Footer />
        </Container>
      </main>
    </div>
  );
};
