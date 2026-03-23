import "@/global.css";

import { Header, SideNavigationBar } from "@/components/dom/shad-nav";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

import { StyleNoSelect } from "../NoSelect";
import { IS_DOM } from "expo/dom";

export function ShadLayoutFull({
  children,
  select,
}: {
  children: React.ReactNode;
  select?: boolean;
}) {
  return (
    <>
      {!select && <StyleNoSelect />}
      <TooltipProvider>
        <div className="flex min-h-screen w-full flex-col pb-10">
          {/* <SideNavigationBar /> */}
          {!IS_DOM && <SideNavigationBar />}
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            {/* TODO: Migrate to native. */}
            {!IS_DOM && <Header />}

            {children}
          </div>
        </div>
      </TooltipProvider>
    </>
  );
}

export default function ShadLayout({
  children,
  select,
}: {
  children: React.ReactNode;
  select?: boolean;
}) {
  if (process.env.EXPO_OS === "web" && !IS_DOM) {
    // In standard web, use a partial layout since the shared elements are in the Layout Route.
    return <>{children}</>;
  }

  return (
    // Add a subtle fade-in animation as DOM components don't load immediately which can look jarring on mobile.
    <div className="animate-fade-in max-w-screen overflow-hidden">
      <ShadLayoutFull select={select}>{children}</ShadLayoutFull>
    </div>
  );
}
