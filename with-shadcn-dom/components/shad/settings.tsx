"use dom";

import ShadLayout from "./shad-layout";
import StoryWrapper from "../mdx/mdx-route";
import { useGlobalButtonHaptics } from "../global-button-haptics";

export default function SettingsRoute({
  onButtonClick,
}: {
  dom?: import("expo/dom").DOMProps;
  onButtonClick: (size: number) => Promise<void>;
}) {
  useGlobalButtonHaptics(onButtonClick);

  return (
    <>
      <ShadLayout select>
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 max-w-[100vw] overflow-hidden">
          <div className="mx-auto max-w-[59rem] flex-1 auto-rows-max gap-4">
            <StoryWrapper />
          </div>
        </main>
      </ShadLayout>
    </>
  );
}
