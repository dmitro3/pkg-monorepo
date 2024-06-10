"use client";

import {
  Layout,
  SidebarAccordions,
  SidebarItem,
  accordionSections,
  sections,
} from "@winrlabs/ui";
import { config } from "./wagmi";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout
      header={{
        chat: {
          show: false,
        },
        wagmiConfig: config,
      }}
      sidebar={{
        sidebarFooter: <></>,
        sidebarItems: (
          <>
            <SidebarAccordions
              defaultValues={sections}
              sections={accordionSections}
            />
            <SidebarItem href="/settings">test</SidebarItem>
          </>
        ),
      }}
    >
      {children}
    </Layout>
  );
};
