"use client";

import { Header } from "./Header";

type Props = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export function AppShell({ sidebar, children }: Props) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
      <Header />
      <div
        className="flex flex-col lg:flex-row py-6 px-6 lg:pl-10 lg:pr-[126px]"
        style={{ gap: "20px" }}
      >
        {/* Sidebar: desktop only — 240px so grid starts at 40+240+19=299px matching Figma */}
        <aside
          className="hidden lg:block shrink-0 self-start"
          style={{ width: "240px" }}
        >
          {sidebar}
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
