"use dom";

import "@/global.css";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import data from "@/data/data.json";
import { IS_DOM } from "expo/dom";
import { useGlobalButtonHaptics } from "../global-button-haptics";

export default function DashboardRoute({
  onButtonClick,
}: {
  notify: () => void;
  onButtonClick: (size: number) => Promise<void>;
} & Props) {
  useGlobalButtonHaptics(onButtonClick);

  return (
    // Fade-in on DOM webview to smooth out the webview load.
    <main className={`flex flex-1 flex-col${IS_DOM ? " animate-fade-in" : ""}`}>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </main>
  );
}

type Props = {
  ref?: import("react").RefObject<
    import("react-native-webview").WebView | null
  >;
  dom?: import("expo/dom").DOMProps;
};
